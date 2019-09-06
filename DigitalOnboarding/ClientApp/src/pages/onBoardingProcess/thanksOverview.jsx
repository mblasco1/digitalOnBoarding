//import libs
import React, { useEffect, useRef } from "react";
import { withStyles, Typography } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import ArrowIcon from "@material-ui/icons/ArrowForward";
import SuccessIcon from '@material-ui/icons/CheckCircle';

//import resources
import { onBoardingObject } from "../../resources/onBoardingObject";

const styles = theme => ({

    rectangleStyle: {
        height: '223px',
        width: '616px',
        border: '1px solid #C8C8C8',
        borderRadius: '4px',

        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',

        [theme.breakpoints.down(800)]: {
            height: 180,
            width: 320,
        }
    },

    rectangleStyleIDCards: {
        [theme.breakpoints.down(800)]: {
            flexFlow: 'column',
        }
    },


    rectangleSpaceHolder: {
        height: '18px'
    },

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
        [theme.breakpoints.down(800)]: {
            marginTop: -20,
        }
    },

    dataSection: {
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row'
    },

    dataSpaceHolder: {
        marginTop: '60px',
        [theme.breakpoints.down(800)]: {
            marginTop: 0,
        }
    },

    infoBox: {
        marginLeft: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        [theme.breakpoints.down(800)]: {
            display: 'none',
        }
    },

    cardInfoTextStyle: {
        height: '18px',
        width: '169px',
        color: '#000000',
        fontFamily: 'Roboto',
        fontSize: '12px',
        lineHeight: '18px'
    },

    pictureInfo: {
        width: '169px',
        display: 'flex',
        flexWrap: 'wrap',
    },

    successIcon: {
        color: 'green',
    },

    PictureTextStyle: {
        width: '140px',
        top: '50%',
        margin: '2px 2px'
    },

    imgIDStyle: {
        maxWidth: '280px',
        maxHeight: '180px',

        display: 'inline-block',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',

        [theme.breakpoints.down(800)]: {
            marginTop: 5,
            maxWidth: 180,
            maxHeight: 80,
        }
    },

    imgStyle: {
        maxWidth: '140px',
        maxHeight: '170px',

        display: 'inline-block',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',

        borderRadius: '50%',

        [theme.breakpoints.down(800)]: {
            maxHeight: 90,
        }
    }

});

const Thanks = (props) => {
    const { classes } = props;
    const canvasContainer = useRef(null);

    useEffect(() => {
        props.setStep(4);


        var imgObject = new Image();
        imgObject.src = props.location.state.idPhotoBack;
        const ctx = canvasContainer.current.getContext("2d");
        imgObject.onload = () => {
            ctx.drawImage(imgObject, 360, 190, 1300, 1250, 0, 0, 640, 480);
        }


    }, []);

    const nextStep = () => {
        props.history.push("/onBoarding/signContract", props.location.state);
    }

    const Picture = ({ data, selectedClass }) => <img src={data} className={selectedClass} />

    return (
        <React.Fragment>
            <div className={classes.sideSection} >
                <Typography variant="h1" component="h1">Danke, {props.location.state.name}!</Typography>
                <Typography variant="subtitle1" component="p">Mit 3 einfachen Schritten Ihr Konto einrichten</Typography>

                <div className={classes.dataSpaceHolder} />

                <div className={classes.dataSection}>
                    <div className={[classes.rectangleStyle, classes.rectangleStyleIDCards].join(' ')}>
                        <Picture data={props.location.state.idPhotoFrontMinimized} selectedClass={classes.imgIDStyle} />
                        <canvas ref={canvasContainer} className={classes.imgIDStyle} />
                    </div>
                    <div className={classes.infoBox}>
                        <div className={classes.cardInfoTextStyle} >
                            <p> {onBoardingObject.Data} </p>
                        </div>
                    </div>
                </div>

                <div className={classes.rectangleSpaceHolder} />

                <div className={classes.dataSection}>

                    <div className={classes.rectangleStyle}>
                        <img className={classes.imgStyle} src={props.location.state.idPhotoFrontIdPicture} alt="Picture ID (coming soon)" />
                        <img className={classes.imgStyle} src={props.location.state.livenessDetectionFirstPicture} alt="Picture Selfie 1" />
                        <img className={classes.imgStyle} src={props.location.state.livenessDetectionSecondPicture} alt="Picture Selfie 2" />
                    </div>

                    <div className={classes.infoBox}>
                        <div className={classes.pictureInfo}>
                            <SuccessIcon className={classes.successIcon} />
                            <p className={classes.PictureTextStyle}> Vorderseite</p>
                            <SuccessIcon className={classes.successIcon} />
                            <p className={classes.PictureTextStyle}> MRZ Check</p>
                            <SuccessIcon className={classes.successIcon} />
                            <p className={classes.PictureTextStyle}> Namenscheck</p>
                            <SuccessIcon className={classes.successIcon} />
                            <p className={classes.PictureTextStyle}> Rückseite</p>
                        </div>
                    </div>
                </div >

                <div className={classes.actionSection}>
                    <Fab onClick={nextStep} aria-label="arrow" className={classes.fab}>
                        <ArrowIcon color='primary' />
                    </Fab>
                </div>
            </div >
        </React.Fragment >
    );
}
export default withStyles(styles)(Thanks);