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

        let regulaForensics = new RegulaForensics();
        let xToken = await regulaForensics.authenticate();
        //TODO: Check Authentication...
        let transactionId = await regulaForensics.submitTransaction(xToken, idPhotoFront, '.jpeg');
        let status = RegulaForensics.TransactionStatus.Unknown;

        while (status != RegulaForensics.TransactionStatus.Completed) {
            status = await regulaForensics.getTransactionStatus(transactionId, xToken);
            if (status == RegulaForensics.TransactionStatus.Error) {
                break;
            }
        }

        if (status == RegulaForensics.TransactionStatus.Error) {
            //TODO: Error displayed
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

            }
            catch (e) {
                console.log("Error in parsing data of ID Front (Graphics)");
                console.log(e);
            }

            try {
                //GET Data from IdCard Front
                let dataOCR = await regulaForensics.getTransactionResultJson(transactionId, RegulaForensics.eRPRM_ResultType.OCRLexicalAnalyze, xToken);
                onBoardingObject.idPhotoFrontDataObject = regulaForensics.getParsedOCRLexicalAnalyzeData(dataOCR);

                console.log("jiipiiiii");
                console.log(onBoardingObject.idPhotoFrontDataObject);
            }
            catch (e) {
                console.log("Error in parsing data of ID Front (OCRLexicalAnalyze)");
                console.log(e);
            }
            //TODO: Check or Repead step if id is not OK
        }
    }

    const body = function GetBodyElement() {
        if (onBoardingObject.isFileUploaderUsed) {
            return <UploadButton id='uploadButton' parentCallback={callbackFunction} />;
        } else {
            console.log("isFileUploaderUsed");
            console.log(onBoardingObject.isFileUploaderUsed);
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