//import libs
import React from "react";
import { Route, Switch } from "react-router-dom";
import { withStyles } from "@material-ui/core";

//import components
import NoMatch from "../noMatch";
import OnBoardingStart from "../onBoardingProcess/onBoardingStart";

const styles = theme => ({
	layout: {
	}
});
const Content = (props) => {
	const { classes } = props;

	return (
		<main className={classes.layout}>
			<Switch>
				{/* currently it goes directly into the process, change routing here if app extends*/}
				<Route path="/" component={OnBoardingStart} />
				<Route component={NoMatch} />
			</Switch>			
		</main>
	);
}
export default withStyles(styles)(Content);
