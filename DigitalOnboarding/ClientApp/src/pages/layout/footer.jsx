//import libs
import React from 'react';
import { withStyles } from "@material-ui/core";

const styles = {
	footer: {
		position: 'fixed',
		left: 0,
		bottom: 0,
		height: 44,
		width: '100%',
		backgroundColor: 'white',
		'z-index': -1
	},

};

const Footer = (props) => {
    const { classes } = props;

	return (
		<div>
			
		</div>
  );
}
export default withStyles(styles)(Footer);
