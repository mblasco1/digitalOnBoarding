//import libs
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const styles = {
  grow: {
    flexGrow: 1,
	},
	appBar: {
		bottom: 0,
		top: 'auto'
	},
};

const Footer = (props) => {
    const { classes } = props;

	return (
		<AppBar position="fixed" color="primary" className={classes.appBar}>
			<Toolbar>
				This is a footer
			</Toolbar>
		</AppBar>
  );
}
export default withStyles(styles)(Footer);
