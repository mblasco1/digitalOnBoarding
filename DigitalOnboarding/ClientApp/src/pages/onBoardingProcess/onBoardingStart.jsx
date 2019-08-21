﻿//import libs
import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { withStyles } from "@material-ui/core";

import withStepper from "./components/_withStepper";

//import components
import Phonenumber from "./phonenumber";
import Identification from "./identification";
import IdScanFront from "./idScanFront";
import IdScanFrontConfermation from "./idScanFrontConfermation";
import IdScanBack from "./idScanBack";
import IdScanBackConfermation from "./idScanBackConfermation";
import Thanks from "./thanks";

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

	useEffect(() => {
		window.onpopstate = (e) => {
			console.log('back button clicked');
			console.log(props);
		}

	});
	return (
		<Switch>
			{/* if path not found welcome page will be displayed  */}
			<Route path="/onBoarding/phonenumber" render={routeProps => (<Phonenumber {...routeProps} goToNextStep={props.nextStep} setStep={props.setStep} />)} />
			<Route path="/onBoarding/identification" render={routeProps => (<Identification {...routeProps} goToNextStep={props.nextStep} setStep={props.setStep} />)} />
			<Route path="/onBoarding/idscanfront" render={routeProps => (<IdScanFront {...routeProps} goToNextStep={props.nextStep} setStep={props.setStep} />)} />
			<Route path="/onBoarding/idscanfrontconfermation" render={routeProps => (<IdScanFrontConfermation {...routeProps} goToNextStep={props.nextStep} setStep={props.setStep} />)} />
			<Route path="/onBoarding/idscanback" render={routeProps => (<IdScanBack {...routeProps} goToNextStep={props.nextStep} setStep={props.setStep} />)} />
            <Route path="/onBoarding/idscanbackconfermation" render={routeProps => (<IdScanBackConfermation {...routeProps} goToNextStep={props.nextStep} setStep={props.setStep} />)} />
            <Route path="/onBoarding/thanks" render={routeProps => (<Thanks {...routeProps} goToNextStep={props.nextStep} setStep={props.setStep} />)} />
		</Switch>
	);

}
export default withStepper(withStyles(styles)(OnBoardingStart));