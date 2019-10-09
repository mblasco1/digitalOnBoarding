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

const styles = (theme) => ({
    error: {
        backgroundColor: theme.palette.error.dark,
    },
});

const IdScanFront = (props) => {
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
            props.history.push('/onboarding/idscanfrontconfermation', onBoardingObject);
        } else {
            //try again
            showFailedSnack();
            props.history.push('/onboarding/idscanfront', onBoardingObject);
        }
    };

    var tryValidateIdScanFront = async function (idPhotoFront) {
        let regulaForensics = new RegulaForensics();
        let xToken = await regulaForensics.authenticate();
        if (xToken == null) {
            console.error("xToken is empty or null");
            return false;
        }

        //TODO: Check Authentication...
        let transactionId = await regulaForensics.submitTransaction(xToken, idPhotoFront, '.jpeg');
        if (transactionId) { //Check value is NOT: null, undefined NaN, empty string, 0 or false
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
            //TODO: Error displayed
            console.error("state of transaction ends in a error");
            return false;
        } else {
            let img = await regulaForensics.getImages(transactionId, xToken);
            onBoardingUtilities.copyFromObject(onBoardingObject, props.location.state);
            onBoardingObject.idPhotoFront = img;

            //continue with data processing
            try {
                //GET Portrait and Signature of IdCard Front
                let dataGraphics = await regulaForensics.getTransactionResultJson(transactionId, RegulaForensics.eRPRM_ResultType.Graphics, xToken);
                //Parse Graphics Data to get Images
                for (let i = 0; i < dataGraphics[0].DocGraphicsInfo.pArrayFields.length; i++) {
                    var graphic = dataGraphics[0].DocGraphicsInfo.pArrayFields[i];
                    if (graphic.FieldName == "Portrait") {
                        onBoardingObject.idPhotoFrontPortrait = graphic.image.image;
                    }
                    if (graphic.FieldName == "Signature") {
                        onBoardingObject.idPhotoFrontSignature = graphic.image.image;
                    }
                }

                if (onBoardingObject.idPhotoFrontPortrait == '') {
                    console.error("No Portrait or Signature found");
                    return false;
                }
            }
            catch (e) {
                console.error("Error in parsing data of ID Front (Graphics)");
                console.error(e);
                return false;
            }

            try {
                //GET Data from IdCard Front
                let dataOCR = await regulaForensics.getTransactionResultJson(transactionId, RegulaForensics.eRPRM_ResultType.OCRLexicalAnalyze, xToken);
                let parsedData = regulaForensics.getParsedOCRLexicalAnalyzeData(dataOCR);
                if (parsedData == null) {
                    console.error("Cant read any data on IdCard Front");
                    return false;
                }
                onBoardingObject.idPhotoFrontDataObjectOCR = parsedData;
            }
            catch (e) {
                console.error("Error in parsing data of ID Front (OCRLexicalAnalyze)");
                console.error(e);
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
                <TitleSection title="ID Vorderseite" Icon={ScanIcon} subtitle="Bitte die Vorderseite Ihrer ID scannen" />
                {body()}
                <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={failedOpen} autoHideDuration={3000} onClose={hideFailedSnack}>
                    <SnackbarContent className={classes.error} onClose={hideFailedSnack} message={'ID Karte wurde nicht erkannt, versuchen Sie es erneut!'} />
                </Snackbar>
            </LoadingOverlay>
        </React.Fragment>
    );
}
export default withStyles(styles)(IdScanFront);