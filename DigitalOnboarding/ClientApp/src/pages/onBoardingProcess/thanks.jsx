//import libs
import React, { useEffect } from "react";
import { withStyles, Typography, Icon} from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import ArrowIcon from "@material-ui/icons/ArrowForward";


//import resources
import { ReactComponent as PictoIdent } from "../../images/Picto_Ident.svg";
import onBoardingObject from "../../resources/onBoardingObject";
import { flexbox } from "@material-ui/system";


const styles = theme => ({

    sideSection: {
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        marginLeft: '170px'
    },

    actionSection: {
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
    },

    imgSection: {
        height: '100%',
        marginTop: '60px'
    }
});

const Thanks = (props) => {
    const { classes, Icon } = props;

    console.log(props);

    useEffect(() => {
        props.setStep(4);
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
                    <PictoIdent />
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