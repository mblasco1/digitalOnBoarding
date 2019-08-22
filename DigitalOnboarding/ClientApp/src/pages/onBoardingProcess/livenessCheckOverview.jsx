//import libs
import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core";

//import resources
import { ReactComponent as PictoIdent } from "../../images/Picto_Ident.svg";
import onBoardingObject from "../../resources/onBoardingObject";

//import components
import TitleSection from "./components/_titleSection";

const styles = theme => ({

    actionSection: {
        marginTop: 50,
        height: 450
    },
});

const LivenessCheckOverview = (props) => {
    const { classes } = props;

    console.log(props);

    useEffect(() => {
        props.setStep(3);
    }, []);

    const nextStep = () => {
        props.history.push("/onBoarding/thanks", onBoardingObject);
    }

    return (
        <React.Fragment>
            <TitleSection title="Selfie & Liveness Check" Icon={PictoIdent} subtitle="Ihr Bild wird geprüft..." />
            <div className={classes.actionSection}>
                <img src="" alt="Picture 1"/>
                <img src="" alt="picture 2"/>
                <img src={onBoardingObject.idPhotoFrontMicroblinkObject} alt="Picture ID"/>
            </div>

        </React.Fragment>
    );
}
export default withStyles(styles)(LivenessCheckOverview);