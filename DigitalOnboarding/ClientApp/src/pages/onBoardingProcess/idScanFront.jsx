//import libs
import React, { useState, useEffect, useRef } from "react";
import { withStyles } from "@material-ui/core";

//import resources
import { ReactComponent as ScanIcon } from "../../images/idScanIcon.svg";
import useInterval from "../../resources/useInterval";
import { onBoardingObject, onBoardingUtilities } from "../../resources/onBoardingObject";

//import components
import TitleSection from "./components/_titleSection";
import { string } from "prop-types";
import { RegulaForensics } from "../../components/regulaForensics";

const styles = (theme) => ({
    actionSection: {
        marginTop: 50,
        height: 450,
        position: 'relative',
        [theme.breakpoints.down(800)]: {
            marginTop: 0,
            display: 'flex',
            justifyContent: 'center',
        }
    },
    videoElement: {
        '-webkit-transform': 'rotateY(180deg)', /* Safari and Chrome */
        '-moz-transform': 'rotateY(180deg)', /* Firefox */
        position: 'absolute',
        'z-index': -1,
        [theme.breakpoints.down(800)]: {
            width: 400,
            height: 240,
            transform: 'rotate(90deg)',
            '-webkit-transform': 'rotateY(360deg)', /* Safari and Chrome */
            '-moz-transform': 'rotateY(360deg)', /* Firefox */
        }
    },
    canvasElement: {
        [theme.breakpoints.down(800)]: {
            width: 400,
            height: 240,
        }
    },
});


const IdScanFront = (props) => {
    const { classes, setStep } = props;
    const canvasContainer = useRef(null);
    const videoContainer = useRef(null);
    const [timer, setTimer] = useState(10);
    const [isRunning, setIsRunning] = useState(false);

    useInterval(() => {
        var canvasContext = canvasContainer.current.getContext('2d');
        canvasContext.clearRect(275, 180, 75, 75);
        if (timer > 0) {
            setTimer(timer - 1);
            canvasContext.font = "60px Roboto";
            canvasContext.fillStyle = "black";
            canvasContext.textAlign = "center";
            canvasContext.fillText(timer, 312, 250);
        } else {
            //make screenshot
            canvasContext.drawImage(videoContainer.current, 0, 0, 640, 480);
            canvasContainer.current.toBlob(redirectToConfirmationPage, 'image/jpeg');
        }
    }, isRunning ? 1000 : null);

    const redirectToConfirmationPage = (blob) => {

        blobToDataURL(blob).then(async (dataUrl) => {

            setIsRunning(false);
            videoContainer.current.stop();

            //onBoardingUtilities.copyFromObject(onBoardingObject, props.location.state);
            //onBoardingObject.idPhotoFront = dataUrl;
            console.log("test1");
            await tryValidateIdScanFront(dataUrl);
            console.log("test2");
            console.log(onBoardingObject.idPhotoFront);
            props.history.push('/onboarding/idscanfrontconfermation', onBoardingObject);
        });
    }

    useEffect(() => {
        setStep(2);

        window.addEventListener('orientationchange', function () {
            //need timeout otherwise child component renders before the parent 
            setTimeout(function () {
                var element = document.getElementById("video");
                if (element != null) {
                    element.scrollIntoViewIfNeeded();
                }
            }, 250);
        });


        // Get access to the camera
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // Not adding `{ audio: true }` since we only want video now
            var videoOptions = [];
            var constraint;
            /*
            * Example working with more cameras:
            * try out: https://simpl.info/getusermedia/sources/
            * code :   https://github.com/samdutton/simpl/blob/gh-pages/getusermedia/sources/js/main.js#L39
            * */
            navigator.mediaDevices.enumerateDevices().then((data) => {
                for (const deviceInfo of data) {
                    if (deviceInfo.kind === 'videoinput') {
                        videoOptions.push(deviceInfo.deviceId);

                        //display all videoinput devices
                        /*
                        var node = document.createElement("LI");
                        var textnode = document.createTextNode(deviceInfo.label);
                        node.appendChild(textnode);
                        document.getElementById("deviceInfos").appendChild(node);
                        */
                    }
                }

            }).then(() => {
                var cameraIndexToUse = videoOptions.length - 1; //if there is more than 1, the last one should be the back-camera --> [FRONT, BACK,....]
                const videoSource = videoOptions[cameraIndexToUse];
                constraint = { video: { deviceId: videoSource ? { exact: videoSource } : undefined } };

            }).then(() => {
                navigator.mediaDevices.getUserMedia(constraint).then(function (stream) {
                    videoContainer.current.width = 640;
                    videoContainer.current.height = 480;
                    videoContainer.current.srcObject = stream;
                    videoContainer.current.selectedStream = stream;


                    videoContainer.current.oncanplay = function playStream() {
                        videoContainer.current.play();
                        setIsRunning(true);

                        canvasContainer.current.width = 640;
                        canvasContainer.current.height = 480;

                        window.addEventListener('resize', resizeCanvas, false);
                        resizeCanvas();
                    };

                    videoContainer.current.stop = function unmountStream() {
                        videoContainer.current.selectedStream.getTracks()[0].stop();
                    };
                })

            });
        }
    }, []);

    function resizeCanvas() {
        if (canvasContainer.current != null) {
            var canvasContext = canvasContainer.current.getContext('2d');
            canvasContext.setLineDash([8]);
            canvasContext.lineWidth = 4;

            if (window.innerWidth < 800) {
                canvasContext.strokeRect(160, 100, 325, 265);
            } else {
                canvasContext.strokeRect(100, 100, 430, 265);
            }
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


    var tryValidateIdScanFront = async function (idPhotoFront) {

        let reulaForensics = new RegulaForensics();

        console.log("Start validation");
        let xToken = await reulaForensics.authenticate();
        console.log("xToken: " + xToken);
        //TODO: Check Authentication...
        let transactionId = await reulaForensics.submitTransaction(xToken, idPhotoFront, '.jpeg');
        console.log("transactionId: " + transactionId);
        let status = RegulaForensics.TransactionStatus.Unknown;

        while (status != RegulaForensics.TransactionStatus.Completed) {
            //TODO Sleep einbauen?...
            status = await reulaForensics.getTransactionStatus(transactionId, xToken);
            console.log("status: " + status);
            if (status == RegulaForensics.TransactionStatus.Error) {
                break;
            }
        }
        console.log("final status: " + status);
        if (status == RegulaForensics.TransactionStatus.Error) {
            //TODO: Error displayed
        } else {
            let img = await reulaForensics.getImages(transactionId, xToken);
            onBoardingUtilities.copyFromObject(onBoardingObject, props.location.state);
            onBoardingObject.idPhotoFront = img;

            console.log("img: " + img);
            idPhotoFront = img;
            //continue with image processing

            //TODO: if we need data, parse them
            //let data = await reulaForensics.getTransactionResultJson(transactionId, RegulaForensics.eRPRM_ResultType.MRZ_OCR_Extended, xToken);
            //console.log("data: " + data);

        }
    }

    return (
        <React.Fragment>
            <TitleSection title="ID Vorderseite" Icon={ScanIcon} subtitle="Bitte die Vorderseite Ihrer ID scannen" />
            <div className={classes.actionSection}>
                <video ref={videoContainer} className={[classes.videoElement]} id="video" autoPlay></video>
                <canvas ref={canvasContainer} className={classes.canvasElement} />
            </div>
            <div id="deviceInfos"></div>
        </React.Fragment>
    );
}
export default withStyles(styles)(IdScanFront);