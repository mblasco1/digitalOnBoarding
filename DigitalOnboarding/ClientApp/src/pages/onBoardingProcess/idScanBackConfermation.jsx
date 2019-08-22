//import libs
import React, { useEffect, useRef } from "react";
import { withStyles } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import ArrowIcon from "@material-ui/icons/ArrowForward";

//import resources
import { ReactComponent as ScanIcon } from "../../images/idScanIcon.svg";
import onBoardingObject from "../../resources/onBoardingObject";

//import components
import TitleSection from "./components/_titleSection";


const styles = theme => ({
	actionSection: {
		marginLeft: 210,
		justifyContent: 'center',
		display: 'flex',
		flexDirection: 'column'
	}
});

const IdScanBackConfermation = (props) => {
	const { classes } = props;
	const canvasContainer = useRef(null);

	console.log(props);

	useEffect(() => {
		props.setStep(2);

		var imgObject = new Image();
		imgObject.src = props.location.state.idPhotoBack;
		const canvas = canvasContainer;
		const ctx = canvas.current.getContext("2d");

		imgObject.onload = () => {
			//slice image - drawImage( image, source_x, source_y, w, h, dest_x, dest_y, w, h );
			//replace with microblink object as soon as they support swiss ID's
			ctx.drawImage(imgObject, 345, 190, 580, 355, 0, 0, 580, 355);
		}

	}, []);

	const nextStep = () => {
		props.history.push("/onBoarding/livenessCheck", props.location.state);
	}

	const Picture = ({ data }) => <img src={data} height="550" />



	return (
		<React.Fragment>
			<TitleSection title="ID Rückseite" Icon={ScanIcon} subtitle="Die Rückseite wurde erfolgreich gescannt" />
			<div className={classes.actionSection}>
				{/*<Picture data={props.location.state.idPhotoBack} /> */}
				<canvas ref={canvasContainer} width={600} height={360} />
				<Fab onClick={nextStep} aria-label="arrow" className={classes.fab}>
					<ArrowIcon color='primary' />
				</Fab>
			</div>
		</React.Fragment>
	);
}
export default withStyles(styles)(IdScanBackConfermation);