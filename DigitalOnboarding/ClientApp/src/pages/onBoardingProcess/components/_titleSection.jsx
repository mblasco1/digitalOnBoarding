//import libs
import React from "react";
import { withStyles, Typography } from "@material-ui/core";

const styles = theme => ({
	textSection: {
		marginLeft: 40,
		justifyContent: 'center',
		height: 170,
		display: 'flex',
		flexDirection: 'column',
		width: '100%'
	},
	titleSection: {
		height: 170,
		display: 'flex',
		width: '100%'
    },
    icon: {
        [theme.breakpoints.down(800)]: {
            display: 'none'
        },
    }
});

const TitleSection = (props) => {
	const { classes, Icon } = props;

	return (
		<div className={classes.titleSection}>
			<div className={classes.icon}>
				<Icon />
			</div>
			<div className={classes.textSection}>
				<Typography variant="h1" component="h1">{props.title}</Typography>
				<Typography variant="subtitle1" component="p">{props.subtitle}</Typography>
			</div>
		</div>
	);

}
export default withStyles(styles)(TitleSection);