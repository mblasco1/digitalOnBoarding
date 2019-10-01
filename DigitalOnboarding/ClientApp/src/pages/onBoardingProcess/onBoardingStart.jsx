//import libs
import React, { } from "react";
import { Route, Switch } from "react-router-dom";
import { withStyles } from "@material-ui/core";

import withStepper from "./components/_withStepper";

//import components
import Phonenumber from "./phonenumber";
import Identification from "./identification";
import IdScanFrontOverview from "./idScanFrontOverview";
import IdScanFront from "./idScanFront";
import IdScanFrontConfermation from "./idScanFrontConfermation";
import IdScanBack from "./idScanBack";
import IdScanBackConfermation from "./idScanBackConfermation";
import LivenessCheck from './livenessCheck';
import LivenessCheckOverview from './livenessCheckOverview';
import Thanks from "./thanks";
import ThanksOverview from "./thanksOverview";
import SignContract from "./signContract";

const styles = theme => ({
	layout: {
		width: 1280,
		marginLeft: theme.spacing(12),
		[theme.breakpoints.down(1280 + theme.spacing(12))]: {
			width: 'auto',
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	mainLogo: {
		marginTop: 28,
		position: 'absolute',
		[theme.breakpoints.down(1280 + theme.spacing(12))]: {
			display: 'none'
		},
	}
});

const OnBoardingStart = (props) => {

	return (
		<Switch>
			{/* if path not found welcome page will be displayed  */}
			<Route path="/onBoarding/phonenumber" render={routeProps => (<Phonenumber {...routeProps} showSuccessSnack={props.showSuccessSnack} goToNextStep={props.nextStep} setStep={props.setStep} />)} />
			<Route path="/onBoarding/identification" render={routeProps => (<Identification {...routeProps} showSuccessSnack={props.showSuccessSnack} goToNextStep={props.nextStep} setStep={props.setStep} />)} />
            <Route path="/onBoarding/idscanfrontOverview" render={routeProps => (<IdScanFrontOverview {...routeProps} showSuccessSnack={props.showSuccessSnack} goToNextStep={props.nextStep} setStep={props.setStep} />)} />
            <Route path="/onBoarding/idscanfront" render={routeProps => (<IdScanFront {...routeProps} showSuccessSnack={props.showSuccessSnack} goToNextStep={props.nextStep} setStep={props.setStep} />)} />
			<Route path="/onBoarding/idscanfrontconfermation" render={routeProps => (<IdScanFrontConfermation showSuccessSnack={props.showSuccessSnack} {...routeProps} goToNextStep={props.nextStep} setStep={props.setStep} />)} />
			<Route path="/onBoarding/idscanback" render={routeProps => (<IdScanBack {...routeProps} showSuccessSnack={props.showSuccessSnack} goToNextStep={props.nextStep} setStep={props.setStep} />)} />
			<Route path="/onBoarding/idscanbackconfermation" render={routeProps => (<IdScanBackConfermation showSuccessSnack={props.showSuccessSnack} {...routeProps} goToNextStep={props.nextStep} setStep={props.setStep} />)} />
			<Route path="/onBoarding/livenessCheck" render={routeProps => (<LivenessCheck {...routeProps} showSuccessSnack={props.showSuccessSnack} goToNextStep={props.nextStep} setStep={props.setStep} />)} />
			<Route path="/onBoarding/livenessCheckOverview" render={routeProps => (<LivenessCheckOverview {...routeProps} showSuccessSnack={props.showSuccessSnack} goToNextStep={props.nextStep} setStep={props.setStep} />)} />
			<Route path="/onBoarding/thanks" render={routeProps => (<Thanks {...routeProps} goToNextStep={props.nextStep} showSuccessSnack={props.showSuccessSnack} setStep={props.setStep} />)} />
			<Route path="/onBoarding/thanksOverview" render={routeProps => (<ThanksOverview {...routeProps} showSuccessSnack={props.showSuccessSnack} goToNextStep={props.nextStep} setStep={props.setStep} />)} />
			<Route path="/onBoarding/signContract" render={routeProps => (<SignContract {...routeProps} showSuccessSnack={props.showSuccessSnack} goToNextStep={props.nextStep} setStep={props.setStep} />)} />
		</Switch>
	);

}
export default withStepper(withStyles(styles)(OnBoardingStart));