//import libs
import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import ArrowIcon from "@material-ui/icons/ArrowForward";

//import resources
import { ReactComponent as PictoSignatur } from "../../images/Picto_Signatur.svg";
import { ReactComponent as CloudDownload } from "../../images/cloud-download-95.svg";

//import components
import TitleSection from "./components/_titleSection";


const styles = theme => ({
    actionSection: {
        marginTop: 50,
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '165px',
        [theme.breakpoints.down(800)]: {
            marginLeft: 0,
            marginTop: 10,
        }
    },

    sideSection: {
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center'
    },

    rectangleStyle: {
        height: '226px',
        width: '152px',
        borderRadius: '4px',
        backgroundColor: '#FFFFFF',
        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.1)',

        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexFlow: 'column',
        marginLeft: '165px',
        [theme.breakpoints.down(800)]: {
            marginLeft: 0,
            marginTop: 10,
        }

    },
});

const SignContract = (props) => {
    const { classes } = props;

    useEffect(() => {
        props.setStep(4);
    }, []);

    const nextStep = () => {
        //props.history.push("/onBoarding/???", onBoardingObject);
    }

    return (
        <React.Fragment>
            <div className={classes.sideSection} >
                <TitleSection title="Vertrag unterschreiben" Icon={PictoSignatur} subtitle="Du hast dich erfolgreich identifiziert" />

                <div className={classes.rectangleStyle}>
                    <CloudDownload />
                    <p> Basisvertrag </p>
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
export default withStyles(styles)(SignContract);