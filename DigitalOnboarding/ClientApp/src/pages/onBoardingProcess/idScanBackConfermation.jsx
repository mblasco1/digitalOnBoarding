//import libs
import React, { useEffect, useRef } from "react";
import { withStyles } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import ArrowIcon from "@material-ui/icons/ArrowForward";

//import resources
import { ReactComponent as ScanIcon } from "../../images/idScanIcon.svg";

//import components
import TitleSection from "./components/_titleSection";


const styles = () => ({
	actionSection: {
		marginLeft: 210,
		justifyContent: 'center',
		display: 'flex',
		flexDirection: 'column',
	}
});

const IdScanBackConfermation = (props) => {
	const { classes, setStep } = props;
	const canvasContainer = useRef(null);

	useEffect(() => {
		setStep(2);

		var imgObject = new Image();
		imgObject.src = props.location.state.idPhotoBack;
		const ctx = canvasContainer.current.getContext("2d");

		imgObject.onload = () => {
			//slice image - drawImage( image, source_x, source_y, w, h, dest_x, dest_y, w, h );
			//replace with microblink object as soon as they support swiss ID's
			//ctx.drawImage(imgObject, 75, 50, 850, 650, 0, 0, 575, 350);
			ctx.drawImage(imgObject, 340, 180, 600, 400, 0, 0, 640, 480);
			//ctx.drawImage(imgObject, 0, 0);
		}

	}, []);

	const nextStep = () => {
		//props.location.state contains the whole onBoarding object
		props.history.push("/onBoarding/livenessCheck", props.location.state);
	}

	return (
		<React.Fragment>
			<TitleSection title="ID Rückseite" Icon={ScanIcon} subtitle="Die Rückseite wurde erfolgreich gescannt" />
			<div className={classes.actionSection}>
				<div>
					<canvas ref={canvasContainer} width={640} height={480} />
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
export default withStyles(styles)(IdScanBackConfermation);