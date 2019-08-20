//import libs
import React, { useEffect } from "react";
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

	console.log(props);

	useEffect(() => {
		props.setStep(2);
	}, []);

	const nextStep = () => {
		props.history.push("/onBoarding/idscanbackconfermation", onBoardingObject);
	}

	return (
		<React.Fragment>
			<TitleSection title="ID Rückseite" Icon={ScanIcon} subtitle="Die Rückseite wurde erfolgreich gescannt" />
			<div className={classes.actionSection}>

				<Fab onClick={nextStep} aria-label="arrow" className={classes.fab}>
					<ArrowIcon color='primary' />
				</Fab>
			</div>
		</React.Fragment>
	);
}
export default withStyles(styles)(IdScanBackConfermation);