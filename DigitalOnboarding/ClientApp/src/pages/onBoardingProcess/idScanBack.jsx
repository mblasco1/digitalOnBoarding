//import libs
import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import LoadingOverlay from 'react-loading-overlay';

import { RegulaForensics } from "../../components/RegulaForensics";

//import resources
import { ReactComponent as ScanIcon } from "../../images/idScanIcon.svg";
import { onBoardingObject, onBoardingUtilities } from "../../resources/onBoardingObject";

//import components
import TitleSection from "./components/_titleSection";
import VideoScreenshot from "./components/videoScreenshot";
import UploadButton from "./components/uploadButton";

const styles = theme => ({
    error: {
        backgroundColor: theme.palette.error.dark,
    },
});

const IdScanBack = (props) => {
    const { classes, setStep } = props;
    const [failedOpen, setFailedOpen] = useState(false);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        setStep(2);
    }, []);

    var callbackFunction = async function chooseImageFile(imgValue) {

        showIsActive();
        var validateSuccessful = await tryValidateIdScanFront(imgValue);
        hideIsActive();

        if (validateSuccessful) {
            props.history.push('/onboarding/idscanbackconfermation', onBoardingObject);
        } else {
            //try again
            showFailedSnack();
            props.history.push('/onboarding/idscanback', onBoardingObject);
        }
    };

    var tryValidateIdScanFront = async function (idPhotoFront) {

        
        let regulaForensics = new RegulaForensics();
        let xToken = await regulaForensics.authenticate();
        if (xToken == null) {
            console.error("xToken is empty or null");
            return false;
        }

        let transactionId = await regulaForensics.submitTransaction(xToken, idPhotoFront, '.jpeg');
        if (transactionId == "") {
            console.error("TransactionID is empty or null");
            return false;
        }

        let status = RegulaForensics.TransactionStatus.Unknown;
        while (status != RegulaForensics.TransactionStatus.Completed) {
            status = await regulaForensics.getTransactionStatus(transactionId, xToken);
            if (status == RegulaForensics.TransactionStatus.Error) {
                break;
            }
        }

        if (status == RegulaForensics.TransactionStatus.Error) {
            console.error("state of transaction ends in a error");
            return false;
        } else {
            let img = await regulaForensics.getImages(transactionId, xToken);
            onBoardingUtilities.copyFromObject(onBoardingObject, props.location.state);
            onBoardingObject.idPhotoBack = img;

            try {
                //GET Data from IdCard Front
                let dataOCR = await regulaForensics.getTransactionResultJson(transactionId, RegulaForensics.eRPRM_ResultType.OCRLexicalAnalyze, xToken);
                let parsedDataOCR = regulaForensics.getParsedOCRLexicalAnalyzeData(dataOCR)
                debugger;
                onBoardingObject.idPhotoBackDataObjectOCR = parsedDataOCR;

                if (parsedDataOCR == null) {
                    console.error("Cant read any data OCR on IdCard Back");
                    debugger;
                }

                let dataMRZ = await regulaForensics.getTransactionResultJson(transactionId, RegulaForensics.eRPRM_ResultType.MRZ_OCR_Extended, xToken);
                let parsedDataMRZ = regulaForensics.getParsedMRZOCRExtendedData(dataMRZ);
                onBoardingObject.idPhotoBackDataObjectMRZ = parsedDataMRZ;

                if (parsedDataMRZ == null) {
                    console.error("Cant read any data MRZ on IdCard Back");
                    return false;
                }
            }
            catch (e) {
                debugger;
                console.log("Error in parsing data of ID Back (OCRLexicalAnalyze)");
                console.log(e);
                return false;
            }
        }

        
        return true;
    }

    const body = function GetBodyElement() {
        if (!onBoardingObject.isFileUploaderUsed) {
            return <VideoScreenshot id='videoScreenshot' parentCallback={callbackFunction} />;
        } else {
            return <UploadButton id='uploadButton' parentCallback={callbackFunction} />;
        }
    }

    const showFailedSnack = () => { setFailedOpen(true); }
    const hideFailedSnack = () => { setFailedOpen(false); }

    const showIsActive = () => { setIsActive(true); }
    const hideIsActive = () => { setIsActive(false); }

    return (
        <React.Fragment>
            <LoadingOverlay
                active={isActive}
                spinner
                text='Reading data...'
            >
                <TitleSection title="ID Rückseite" Icon={ScanIcon} subtitle="Bitte die Rückseite Ihrer ID scannen" />
                {body()}
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={failedOpen} autoHideDuration={3000} onClose={hideFailedSnack}>
                    <SnackbarContent className={classes.error} onClose={hideFailedSnack} message={'ID Karte wurde nicht erkannt, versuchen Sie es erneut!'} />
                </Snackbar>
            </LoadingOverlay>
        </React.Fragment>
    );
}
export default withStyles(styles)(IdScanBack);