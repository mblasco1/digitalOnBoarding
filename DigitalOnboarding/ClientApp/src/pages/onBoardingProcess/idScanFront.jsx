//import libs
import React, { useState, useEffect, useRef } from "react";
import { withStyles } from "@material-ui/core";

//import resources
import { ReactComponent as ScanIcon } from "../../images/idScanIcon.svg";
import useInterval from "../../resources/useInterval";
import { onBoardingObject, onBoardingUtilities } from "../../resources/onBoardingObject";

//import components
import TitleSection from "./components/_titleSection";


const styles = (theme) => ({
	actionSection: {
		marginTop: 50,
		height: 450,
		position: 'relative'
	},
	videoElement: {
		transform: 'rotateY(180deg)',
		'-webkit-transform': 'rotateY(180deg)', /* Safari and Chrome */
		'-moz-transform': 'rotateY(180deg)', /* Firefox */
		position: 'absolute',
		'z-index': -1
	}
});

const IdScanFront = (props) => {
	const { classes, setStep } = props;
	const canvasContainer = useRef(null);
	const videoContainer = useRef(null);
	const [timer, setTimer] = useState(10);
	const [isRunning, setIsRunning] = useState(false);

	useInterval(() => {
		var canvasContext = canvasContainer.current.getContext('2d');
		canvasContext.clearRect(275, 180, 75, 75);
		if (timer > 0) {
			setTimer(timer - 1);
			canvasContext.font = "60px Roboto";
			canvasContext.fillStyle = "black";
			canvasContext.textAlign = "center";
			canvasContext.fillText(timer, 312, 250); 
		} else {
			//make screenshot
			canvasContext.drawImage(videoContainer.current, 0, 0, 640, 480);
			canvasContainer.current.toBlob(redirectToConfirmationPage, 'image/jpeg');
		}
	}, isRunning ? 1000 : null);

	const redirectToConfirmationPage = (blob) => {
		
		blobToDataURL(blob).then((dataUrl) => {

			setIsRunning(false);
			videoContainer.current.stop();

			onBoardingUtilities.copyFromObject(onBoardingObject, props.location.state);
			onBoardingObject.idPhotoFront = dataUrl;

			props.history.push('/onboarding/idscanfrontconfermation', onBoardingObject);
		});

	}

	useEffect(() => {
		setStep(2);

		// Get access to the camera
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			// Not adding `{ audio: true }` since we only want video now
			navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
				videoContainer.current.srcObject = stream;
				videoContainer.current.selectedStream = stream;
				videoContainer.current.oncanplay = function playStream() {
					videoContainer.current.play();
					setIsRunning(true);

					var canvasContext = canvasContainer.current.getContext('2d');
					canvasContext.setLineDash([8]);
					canvasContext.lineWidth = 4;
					canvasContext.strokeRect(100, 100, 430, 265);
				};

				videoContainer.current.stop = function unmountStream() {
					videoContainer.current.selectedStream.getTracks()[0].stop();
				};
			});
		}

	}, []);

	const blobToDataURL = (blob) => {
		return new Promise((fulfill, reject) => {
			let reader = new FileReader();
			reader.onerror = reject;
			reader.onload = (e) => fulfill(reader.result);
			reader.readAsDataURL(blob);
		});
	}

	return (
		<React.Fragment>
			<TitleSection title="ID Vorderseite" Icon={ScanIcon} subtitle="Bitte die Vorderseite Ihrer ID scannen" />
			<div className={classes.actionSection}>
				<video ref={videoContainer} className={classes.videoElement} id="video" width="640" height="480" autoPlay></video>
				<canvas ref={canvasContainer} width="640" height="480" />
			</div>
		</React.Fragment>
	);
}
export default withStyles(styles)(IdScanFront);