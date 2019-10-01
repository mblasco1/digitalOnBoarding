//import libs
import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core";

//import resources
import { ReactComponent as ScanIcon } from "../../images/idScanIcon.svg";
import { onBoardingObject, onBoardingUtilities } from "../../resources/onBoardingObject";

//import components
import TitleSection from "./components/_titleSection";

const styles = (theme) => ({

    navigationButtons: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },

    button: {
        border: 'none',
        color: 'white',
        padding: '15px 32px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline - block',
        fontSize: '16px',
        width: 250,
        marginTop: 20,

        backgroundImage: 'linear-gradient(180deg, #004D9F 0%, #0EC8C8 100%)',
        boxShadow: '0 0 16px 0 rgba(255, 255, 255, 0.2)'
    },
});

const IdScanFront = (props) => {
    const { classes, setStep } = props;

    useEffect(() => {
        setStep(2);
    }, []);

    const useFileUploaderFunction = () => {
        chooseOpperation(true);
    }

    const useVideoScreenShotFunction = () => {
        chooseOpperation(false);
    }

    function chooseOpperation(isFileUploaderUsed) {
        onBoardingUtilities.copyFromObject(onBoardingObject, props.location.state);
        onBoardingObject.isFileUploaderUsed = isFileUploaderUsed;
        props.history.push('/onboarding/idscanfront', onBoardingObject);
    }

    return (
        <React.Fragment>
            <TitleSection title="ID Vorderseite" Icon={ScanIcon} subtitle="Bitte die Vorderseite Ihrer ID scannen" />
            <div id="navigationWhatToUse" className={classes.navigationButtons}>
                <button className={classes.button} onClick={useFileUploaderFunction}>Upload ID Card</button>
                <button className={classes.button} onClick={useVideoScreenShotFunction}>Use Webcam for ID Card</button>
            </div>
        </React.Fragment>
    );

}
export default withStyles(styles)(IdScanFront);