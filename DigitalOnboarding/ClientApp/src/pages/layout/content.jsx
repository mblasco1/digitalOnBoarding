//import libs
import React from "react";
import { Route, Switch } from "react-router-dom";
import { withStyles } from "@material-ui/core";

//import components
import NoMatch from "../noMatch";
import OnBoardingStart from "../onBoardingProcess/onBoardingStart";
import WelcomeOnBoarding from "../onBoardingProcess/welcome";

const styles = theme => ({
	layout: {
	},
	topBarWhite: {
		width: '100%',
		height: 84,
		backgroundColor: 'white',
		position: 'absolute',
		'z-index': -1
	}
});
const Content = (props) => {
	const { classes } = props;

	return (
		<main className={classes.layout}>
			<div className={classes.topBarWhite}></div>
			<Switch>
				{/* currently it goes directly into the process, change routing here if app extends*/}
				<Route path="/onBoarding/*" component={OnBoardingStart} />
				<Route path="/" component={WelcomeOnBoarding} />
				<Route component={NoMatch} />
			</Switch>			
		</main>
	);
}
export default withStyles(styles)(Content);
