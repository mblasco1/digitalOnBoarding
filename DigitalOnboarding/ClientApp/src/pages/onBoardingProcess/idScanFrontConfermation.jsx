//import libs
import React, { useEffect, useRef } from "react";
import { withStyles } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import ArrowIcon from "@material-ui/icons/ArrowForward";

//import resources
import { ReactComponent as ScanIcon } from "../../images/idScanIcon.svg";

//import components
import TitleSection from "./components/_titleSection";
import { onBoardingObject, onBoardingUtilities } from "../../resources/onBoardingObject";


const styles = theme => ({
	actionSection: {
		marginLeft: 210,
		justifyContent: 'center',
		display: 'flex',
		flexDirection: 'column',
	}
});

const IdScanFrontConfermation = (props) => {
	const { classes, setStep } = props;
	const canvasContainer = useRef(null);

	useEffect(() => {
		setStep(2);

		var imgObject = new Image();
		imgObject.src = props.location.state.idPhotoFront;
		const ctx = canvasContainer.current.getContext("2d");

		imgObject.onload = () => {
			//replace with microblink object as soon as they support swiss ID's
			//slice image to card - drawImage( image, source_x, source_y, w, h, dest_x, dest_y, w, h );
			ctx.drawImage(imgObject, 115, 105, 420, 260, 0, 0, 480, 360);
			canvasContainer.current.toBlob(getCardImage, 'image/jpeg');
		}

	}, []);

	const getCardImage = (blob) => {

		blobToDataURL(blob).then((dataUrl) => {
			onBoardingUtilities.copyFromObject(onBoardingObject, props.location.state);
			onBoardingObject.idPhotoFrontMinimized = dataUrl;
		});

	}

	const nextStep = () => {

		if (onBoardingObject.idPhotoFrontMinimized !== null) {
			//not needed anymore, remove unnecessary load
			onBoardingObject.idPhotoFront = null;
			props.history.push('/onboarding/idscanback', onBoardingObject);
		}
		//props.history.push("/onBoarding/idscanback", props.location.state);
	}

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
			<TitleSection title="ID Vorderseite" Icon={ScanIcon} subtitle="Die Vorderseite wurde erfolgreich gescannt" />
			<div className={classes.actionSection}>
				<div>
					<canvas ref={canvasContainer} classes={classes.mirrored} width={480} height={360} />
				</div>
				<div>
					<Fab onClick={nextStep} aria-label="arrow" className={classes.fab}>
						<ArrowIcon color='primary' />
					</Fab>
				</div>
			</div>
		</React.Fragment>
	);
}
export default withStyles(styles)(IdScanFrontConfermation);