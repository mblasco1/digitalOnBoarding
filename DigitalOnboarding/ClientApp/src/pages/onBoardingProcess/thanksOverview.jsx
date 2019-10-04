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
        minHeight: '223px',
        width: '616px',
        border: '1px solid #C8C8C8',
        borderRadius: '4px',

        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',

        [theme.breakpoints.down(800)]: {
            minHeight: 180,
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
    },

    imgStyleNormal: {
        maxWidth: '140px',
        maxHeight: '170px',

        display: 'inline-block',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',

        [theme.breakpoints.down(800)]: {
            maxHeight: 90,
        }
    },

    dataObjectSection: {
        display: 'flex',
        flexDirection: 'column',
    },

    idDataSection: {
        display: 'flex',
        flexDirection: 'column',
        width: '596px',
        marginBottom: 10,

        [theme.breakpoints.down(800)]: {
            width: 300,
        }
    },

    collapsible: {
        backgroundColor: '#777',
        color: 'white',
        cursor: 'pointer',
        padding: 18,
        width: '596px',
        border: 'none',
        textAlign: 'center',
        outline: 'none',
        fontSize: 15,
        marginTop: 10,

        [theme.breakpoints.down(800)]: {
            width: 300,
        }
    },

    content: {
        padding: '0 18px',
        display: 'none',
        overflow: 'hidden',
        backgroundColor: '#f1f1f1',
    },

    tableStyle: {
        borderCollapse: 'collapse',
        border: 'solid 1px',
        tableLayout: 'fixed',
        width: '100%',

        '& th': {
            border: 'solid 1px',
            minWidth: '200px',
            backgroundColor: '#cccccc',
        },

        '& td': {
            border: 'solid 1px',
            minWidth: '200px',
            wordBreak: 'break-all',
        }

    },

});

const Thanks = (props) => {
    const { classes } = props;
    const canvasContainer = useRef(null);

    useEffect(() => {
        props.setStep(4);
    }, []);

    const nextStep = () => {
        props.history.push("/onBoarding/signContract", props.location.state);
    }

    const collapsibleIDFrontData = () => {
        var content = document.getElementById("idPhotoFrontDataSection");
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    }

    const collapsibleIDBackData = () => {
        var content = document.getElementById("idPhotoBackDataSection");
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    }

    const Picture = ({ data, selectedClass }) => <img src={"data:image/jpeg; base64," + data} className={selectedClass} />

    return (
        <React.Fragment>
            <div className={classes.sideSection} >
                <Typography variant="h1" component="h1">Danke, {props.location.state.name}!</Typography>
                <Typography variant="subtitle1" component="p">Mit 3 einfachen Schritten Ihr Konto einrichten</Typography>


                <div className={classes.dataSpaceHolder} />

                <div className={classes.dataSection}>
                    <div className={[classes.rectangleStyle, classes.rectangleStyleIDCards].join(' ')}>
                        <Picture data={props.location.state.idPhotoFront} selectedClass={classes.imgIDStyle} />
                        <Picture data={props.location.state.idPhotoBack} selectedClass={classes.imgIDStyle} />
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
                        <Picture data={props.location.state.idPhotoFrontPortrait} selectedClass={classes.imgStyle} alt="Picture ID" />
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

                <div className={classes.rectangleSpaceHolder} />

                <div className={classes.dataSection}>
                    <div className={classes.rectangleStyle}>
                        <div className={classes.idDataSection}>
                            <button type="button" className={classes.collapsible} onClick={collapsibleIDFrontData}>Open ID Front Data</button>
                            <div className={classes.content} id="idPhotoFrontDataSection">
                                <p>OCR Lexical Analyze:</p>
                                <table className={classes.tableStyle}>
                                    <thead>
                                        <tr>
                                            <th>Field Type</th>
                                            <th>Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td> Portrait </td>
                                            <td> <Picture data={props.location.state.idPhotoFrontPortrait} selectedClass={classes.imgStyleNormal} alt="Picture ID" /></td>
                                        </tr>
                                        <tr>
                                            <td> Signature </td>
                                            <td> <Picture data={props.location.state.idPhotoFrontSignature} selectedClass={classes.imgStyleNormal} alt="Picture Signature" /></td>
                                        </tr>
                                        {props.location.state.idPhotoFrontDataObjectOCR.map(data => (
                                            <tr>
                                                <td key={data.type}>{data.type}</td>
                                                <td key={data.value}>{data.value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <button className={classes.collapsible} onClick={collapsibleIDBackData}>Open ID Back Data</button>
                            <div className={classes.content} id="idPhotoBackDataSection">
                                <p>OCR Lexical Analyze:</p>
                                <table className={classes.tableStyle}>
                                    <thead>
                                        <tr>
                                            <th>Field Type</th>
                                            <th>Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.location.state.idPhotoBackDataObjectOCR.map(data => (
                                            <tr className={classes.tdStyle}>
                                                <td key={data.type}>{data.type}</td>
                                                <td key={data.value}><div>{data.value}</div></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <p>MRZ OCR Extended:</p>
                                <table className={classes.tableStyle}>
                                    <thead>
                                        <tr>
                                            <th>Field Type</th>
                                            <th>Value</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {props.location.state.idPhotoBackDataObjectMRZ.map(data => (
                                            <tr className={classes.tdStyle}>
                                                <td key={data.type}>{data.type}</td>
                                                <td key={data.value}><div>{data.value}</div></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className={classes.infoBox}>
                        <div className={classes.pictureInfo}>
                        </div>
                    </div>

                </div>
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