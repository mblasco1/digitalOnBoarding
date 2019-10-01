//import libs
import React, { useEffect, useRef } from "react";
import { withStyles } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import ArrowIcon from "@material-ui/icons/ArrowForward";

//import resources
import { ReactComponent as ScanIcon } from "../../images/idScanIcon.svg";

//import components
import TitleSection from "./components/_titleSection";
import { onBoardingObject, onBoardingUtilities } from "../../resources/onBoardingObject";


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

    canvasSize: {
        width: 480,
        height: 360,
        [theme.breakpoints.down(800)]: {
            width: 320,
            height: 200,
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
    const canvasContainer = useRef(null);

    useEffect(() => {
        setStep(2);

        var imgObject = new Image();
        imgObject.src = props.location.state.idPhotoFront;
        imgObject.onload = () => {
            canvasContainer.current.toBlob(getCardImage, 'image/jpeg');
        }

    }, []);

    const getCardImage = (blob) => {
        blobToDataURL(blob).then((dataUrl) => {
            onBoardingUtilities.copyFromObject(onBoardingObject, props.location.state);
            onBoardingObject.idPhotoFrontMinimized = dataUrl;
        });
    }

    const nextStep = () => {
        if (onBoardingObject.idPhotoFrontMinimized !== null) {
            //not needed anymore, remove unnecessary load
            onBoardingObject.idPhotoFront = null;
            props.history.push('/onboarding/idscanback', onBoardingObject);
        }
    }

    const blobToDataURL = (blob) => {
        return new Promise((fulfill, reject) => {
            let reader = new FileReader();
            reader.onerror = reject;
            reader.onload = (e) => fulfill(reader.result);
            reader.readAsDataURL(blob);
        });
    }

    const Picture = ({ data, selectedClass }) => <img src={"data:image/jpeg; base64," + data} className={selectedClass} />

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