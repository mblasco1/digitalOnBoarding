//import libs
import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import ArrowIcon from "@material-ui/icons/ArrowForward";

//import resources
import { ReactComponent as ScanIcon } from "../../images/idScanIcon.svg";

//import components
import TitleSection from "./components/_titleSection";
import { onBoardingObject } from "../../resources/onBoardingObject";

const styles = theme => ({
    actionSection: {
        marginLeft: 210,
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.down(800)]: {
            marginLeft: 0,
        }
    },
    confirm: {
        [theme.breakpoints.down(800)]: {
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }
    },

    imgSection: {
        [theme.breakpoints.down(800)]: {
            display: 'flex',
            justifyContent: 'center',
        }
    },

    imgIDStyle: {
        width: 480,
        height: 360,
        [theme.breakpoints.down(800)]: {
            width: 320,
            height: 200,
        }
    },
});

const IdScanFrontConfermation = (props) => {
    const { classes, setStep } = props;

    useEffect(() => {
        setStep(2);
    }, []);

    const nextStep = () => {
        if (onBoardingObject.idPhotoFrontPortrait !== null) {
            if (window.screen.width <= 800) {
                //wenn smartphone is used, direct fileupload
                onBoardingObject.isFileUploaderUsed = true;
                props.history.push('/onboarding/idScanBack', onBoardingObject);
            } else {
                props.history.push('/onboarding/idScanBackOverview', onBoardingObject);
            }
        }
    }

    const Picture = ({ data, selectedClass }) => <img src={"data:image/jpeg;base64," + data} className={selectedClass} />

    return (
        <React.Fragment>
            <TitleSection title="ID Vorderseite" Icon={ScanIcon} subtitle="Die Vorderseite wurde erfolgreich gescannt" />
            <div className={classes.actionSection}>
                <div className={classes.imgSection}>
                    <Picture data={props.location.state.idPhotoFront} selectedClass={classes.imgIDStyle} />
                </div>
                <div className={classes.confirm}>
                    <Fab onClick={nextStep} aria-label="arrow" className={classes.fab}>
                        <ArrowIcon color='primary' />
                    </Fab>
                </div>
            </div>
        </React.Fragment>
    );
}
export default withStyles(styles)(IdScanFrontConfermation);