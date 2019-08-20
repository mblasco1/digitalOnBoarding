//import libs
import React from "react";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
	background: {
		backgroundColor: 'red'
	}
});

const Welcome = (props) => {
	const { classes } = props;

	console.log(props);

	return (
		<div className={classes.background}>
			Willkommen zum DigitalOnBoarding Prozess, yeeeeeeh!!!
		</div>
	);

}
export default withStyles(styles)(Welcome);