//import libs
import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core";

//import resources
import { ReactComponent as ScanIcon } from "../../images/idScanIcon.svg";
import { onBoardingObject, onBoardingUtilities } from "../../resources/onBoardingObject";

//import components
import TitleSection from "./components/_titleSection";

import { RegulaForensics } from "../../components/RegulaForensics";
import VideoScreenshot from "./components/videoScreenshot";
import UploadButton from "./components/uploadButton";

const styles = (theme) => ({

});

const IdScanFront = (props) => {
    const { classes, setStep } = props;

    useEffect(() => {
        setStep(2);
    }, []);

    var callbackFunction = async function chooseImageFile(imgValue) {
        console.log("Daten callbackFunction");
        console.log(imgValue);
        await tryValidateIdScanFront(imgValue);
        props.history.push('/onboarding/idscanfrontconfermation', onBoardingObject);
    };

    var tryValidateIdScanFront = async function (idPhotoFront) {

        let reulaForensics = new RegulaForensics();
        let xToken = await reulaForensics.authenticate();
        //TODO: Check Authentication...
        let transactionId = await reulaForensics.submitTransaction(xToken, idPhotoFront, '.jpeg');
        let status = RegulaForensics.TransactionStatus.Unknown;

        while (status != RegulaForensics.TransactionStatus.Completed) {
            status = await reulaForensics.getTransactionStatus(transactionId, xToken);
            if (status == RegulaForensics.TransactionStatus.Error) {
                break;
            }
        }

        if (status == RegulaForensics.TransactionStatus.Error) {
            //TODO: Error displayed
        } else {
            let img = await reulaForensics.getImages(transactionId, xToken);
            onBoardingUtilities.copyFromObject(onBoardingObject, props.location.state);
            onBoardingObject.idPhotoFront = img;

            //continue with image processing
            //TODO: if we need data, parse them
            //let data = await reulaForensics.getTransactionResultJson(transactionId, RegulaForensics.eRPRM_ResultType.MRZ_OCR_Extended, xToken);
            //console.log("data: " + data);
        }
    }

    const body = function GetBodyElement() {
        if (onBoardingObject.isFileUploaderUsed) {
            return <UploadButton id='uploadButton' parentCallback={callbackFunction} />;
        } else {
            return <VideoScreenshot id='videoScreenshot' parentCallback={callbackFunction} />;
        }
    }

    return (
        <React.Fragment>
            <TitleSection title="ID Vorderseite" Icon={ScanIcon} subtitle="Bitte die Vorderseite Ihrer ID scannen" />
            {body()}
        </React.Fragment>
    );
}
export default withStyles(styles)(IdScanFront);