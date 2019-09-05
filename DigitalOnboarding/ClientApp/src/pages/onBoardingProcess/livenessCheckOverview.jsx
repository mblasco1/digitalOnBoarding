//import libs
import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import ArrowIcon from "@material-ui/icons/ArrowForward";
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { amber, green } from '@material-ui/core/colors';

//import resources
import { ReactComponent as PictoIdent } from "../../images/Picto_Ident.svg";
import { onBoardingObject } from "../../resources/onBoardingObject";

//import components
import TitleSection from "./components/_titleSection";

const styles = theme => ({

    actionSection: {
        marginLeft: 210,
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',

        [theme.breakpoints.down(800)]: {
            marginLeft: 0,
            justifyContent: 'center',
            alignItems: 'center',
        }
    },
    pictureCollection: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    picture: {
        margin: '5px 10px'
    },

    pictureStyle: {
        [theme.breakpoints.down(800)]: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: 340,
        }
    },



    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
});

const LivenessCheckOverview = (props) => {
    const { classes } = props;
    const [successOpen, setSuccessOpen] = useState(false);
    const [failedOpen, setFailedOpen] = useState(false);

    useEffect(() => {
        props.setStep(3);

        async function executeFakeDetection() {
            //get images
            let idPhoto = props.location.state.idPhotoFrontMinimized;
            let liveimage1 = props.location.state.livenessDetectionFirstPicture;
            let liveimage2 = props.location.state.livenessDetectionSecondPicture;

            if (idPhoto && liveimage1 && liveimage2) {
                let result = await fetch('/api/bioid/photoverify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        idphoto: idPhoto,
                        liveimage1: liveimage1,
                        liveimage2: liveimage2,
                        accuracy: 1
                    })
                });

                let response = await result.json()
                console.log("photoverify:", response);

                showSuccessSnack();
            }
        }
        executeFakeDetection();
    }, []);

    const nextStep = () => {
        props.history.push("/onBoarding/thanks", props.location.state);
    }

    const showSuccessSnack = () => { setSuccessOpen(true); }
    const hideSuccessSnack = () => { setSuccessOpen(false); }
    const showFailedSnack = () => { setFailedOpen(true); }
    const hideFailedSnack = () => { setFailedOpen(false); }

    const Picture = ({ data }) => <img className={classes.picture} src={data} height="200" />

    return (
        <React.Fragment>
            <TitleSection title="Selfie & Liveness Check" Icon={PictoIdent} subtitle="" />

            <div className={classes.actionSection}>
                <div className={classes.pictureCollection}>
                    {props.location.state !== undefined ?
                        <div className={classes.pictureStyle}>
                            <Picture data={props.location.state.livenessDetectionFirstPicture} />
                            <Picture data={props.location.state.livenessDetectionSecondPicture} />
                            <Picture data={props.location.state.idPhotoFrontMinimized} />
                        </div>
                        :
                        <div>Ups, da ist was schiefgelaufen....Bitte Liveness Check nochmals durchführen</div>
                    }
                </div>
                <Fab onClick={nextStep} aria-label="arrow" className={classes.fab}>
                    <ArrowIcon color='primary' />
                </Fab>
            </div>

            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={successOpen} autoHideDuration={3000} onClose={hideSuccessSnack}>
                <SnackbarContent className={classes.success} onClose={hideSuccessSnack} message="Liveness Check war erfolgreich!" />
            </Snackbar>

            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={failedOpen} autoHideDuration={3000} onClose={hideFailedSnack}>
                <SnackbarContent className={classes.error} onClose={hideFailedSnack} message="Liveness Check ergab keine übereinstimmung!" />
            </Snackbar>

        </React.Fragment>
    );
}
export default withStyles(styles)(LivenessCheckOverview);