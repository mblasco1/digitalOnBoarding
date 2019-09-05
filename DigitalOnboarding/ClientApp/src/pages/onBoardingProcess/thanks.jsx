//import libs
import React, { useEffect } from "react";
import { withStyles, Typography } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import ArrowIcon from "@material-ui/icons/ArrowForward";


//import resources
import { ReactComponent as PictoIdent } from "../../images/Picto_Ident.svg";
import { onBoardingObject, onBoardingUtilities } from "../../resources/onBoardingObject";

const styles = theme => ({

    sideSection: {
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        marginLeft: '170px',
        [theme.breakpoints.down(800)]: {
            marginLeft: 0,
        }
    },

    actionSection: {
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
    },

    imgSection: {
        height: '100%',
        marginTop: '60px',
        [theme.breakpoints.down(800)]: {
            marginTop: 20,
        }
    },

    svgStyle: {
        [theme.breakpoints.down(800)]: {
            width: 200,
        }
    }

});

const Thanks = (props) => {
    const { classes } = props;

    useEffect(() => {
        props.setStep(4);
        onBoardingUtilities.copyFromObject(onBoardingObject, props.location.state);
    }, []);

    const nextStep = () => {
        props.history.push("/onBoarding/thanksOverview", onBoardingObject);
    }

    return (
        <React.Fragment>
            <div className={classes.sideSection} >
                <Typography variant="h1" component="h1">Danke, {onBoardingObject.name}!</Typography>
                <Typography variant="subtitle1" component="p">Mit 3 einfachen Schritten Ihr Konto einrichten</Typography>

                <div className={classes.imgSection}>
                    <PictoIdent className={classes.svgStyle} />
                </div>

                <div className={classes.actionSection}>
                    <Fab onClick={nextStep} aria-label="arrow" className={classes.fab}>
                        <ArrowIcon color='primary' />
                    </Fab>
                </div>
            </div>
        </React.Fragment>
    );
}
export default withStyles(styles)(Thanks);