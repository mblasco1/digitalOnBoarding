//import libs
import React from "react";
import { withStyles, Typography } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import { ReactComponent as TimLogo } from "../../images/timWhite.svg";

const styles = theme => ({
	background: {
		minHeight: 1240,
		width: '100%',
		background: 'linear-gradient(180deg, #004D9F 0%, #0EC8C8 100%)',
		display: 'flex',
		flexFlow: 'column',
		paddingTop: 100,
		alignItems: 'center'
	},
	fab: {
		height: '248px',
		width: '248px',
	},
	logo: {
		color: 'white'
	}
});

const Welcome = (props) => {
	const { classes } = props;

	const start = () => {
		props.history.push('/onBoarding/phonenumber');
	}

	return (
		<div className={classes.background}>
			<Typography variant="h6" component="h1">Willkommen</Typography>
            <Typography variant="subtitle2" component="p">Mit drei einfachen Schritten Ihr Konto einrichten!</Typography>
            
			<Fab onClick={start} aria-label="arrow" className={classes.fab}>
				<TimLogo className={classes.logo} />
            </Fab>
            <br></br>
            <div>Version: 1.0.1.24 </div>
		</div>
	);

}
export default withStyles(styles)(Welcome);