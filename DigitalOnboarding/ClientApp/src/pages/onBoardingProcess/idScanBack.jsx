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

const styles = theme => ({
	actionSection: {
		marginTop: 50,
		height: 480,
        width: 640,
        [theme.breakpoints.down(800)]: {
            height: 280,
            width: 340,
        }
	},
	microblinkContainer: {
		'--mb-widget-font-family': 'Roboto',
		'--mb-hem': '16px',
		'--mb-btn-font-color': 'white',
		'--mb-btn-background-color': '#002650',
		'--mb-btn-background-color-hover': '#8EC8C7',
		'--mb-btn-flip-image-color': 'white',
		'--mb-btn-cancel-color': 'white',
		'--mb-dropzone-hover-color': 'rgba(72, 178, 232, .25)',
		'--mb-loader-font-color': 'black',
		'--mb-loader-background-color': 'rgb(250,250,250)',
		'--mb-counter-background-color': 'rgb(0,0,0,0.7)',
		'--mb-counter-font-color': 'white',
		'--mb-json-color-key': 'black',
		'--mb-json-color-string': '#48b2e8',
		'--mb-json-color-boolean': '#26a4e4',
		'--mb-json-color-number': 'black',
		'--mb-json-color-null': '#26a4e4',
		'--mb-dialog-font-color': 'white',
		'--mb-dialog-background-color': 'black'
	}
});

const IdScanBack = (props) => {
	const { classes, setStep } = props;

	useEffect(() => {
		setStep(2);
	}, []);

    var callbackFunction = async function chooseImageFile(imgValue) {
        console.log("Daten callbackFunction");
        console.log(imgValue);
        await tryValidateIdScanFront(imgValue);
        props.history.push('/onboarding/idscanbackconfermation', onBoardingObject);
    };
    
    var tryValidateIdScanFront = async function (idPhotoFront) {
        debugger;
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
            onBoardingObject.idPhotoBack = img;

            try {
                //GET Data from IdCard Front
                let dataOCR = await regulaForensics.getTransactionResultJson(transactionId, RegulaForensics.eRPRM_ResultType.OCRLexicalAnalyze, xToken);
                onBoardingObject.idPhotoBackDataObjectOCR = regulaForensics.getParsedOCRLexicalAnalyzeData(dataOCR);

                let dataMRZ = await regulaForensics.getTransactionResultJson(transactionId, RegulaForensics.eRPRM_ResultType.MRZ_OCR_Extended, xToken);
                onBoardingObject.idPhotoBackDataObjectMRZ = regulaForensics.getParsedMRZOCRExtendedData(dataMRZ);
            }
            catch (e) {
                console.log("Error in parsing data of ID Back (OCRLexicalAnalyze)");
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
			<TitleSection title="ID Rückseite" Icon={ScanIcon} subtitle="Bitte die Rückseite Ihrer ID scannen" />
            {body()}
		</React.Fragment>
	);
}
export default withStyles(styles)(IdScanBack);