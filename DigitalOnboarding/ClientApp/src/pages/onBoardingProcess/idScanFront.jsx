//import libs
import React, { useState, useEffect, useRef } from "react";
import { withStyles } from "@material-ui/core";

//import resources
import { ReactComponent as ScanIcon } from "../../images/idScanIcon.svg";
import useInterval from "../../resources/useInterval";
import { onBoardingObject, onBoardingUtilities } from "../../resources/onBoardingObject";

//import components
import TitleSection from "./components/_titleSection";

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
        transform: 'rotateY(180deg)',
        '-webkit-transform': 'rotateY(180deg)', /* Safari and Chrome */
        '-moz-transform': 'rotateY(180deg)', /* Firefox */
        position: 'absolute',
        'z-index': -1,
        [theme.breakpoints.down(800)]: {
            width: 400,
            height: 240,
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

        blobToDataURL(blob).then((dataUrl) => {

            setIsRunning(false);
            videoContainer.current.stop();

            onBoardingUtilities.copyFromObject(onBoardingObject, props.location.state);
            onBoardingObject.idPhotoFront = dataUrl;

            props.history.push('/onboarding/idscanfrontconfermation', onBoardingObject);
        });

    }

    function getStreamConstraint() {
        /*
         * Example working with more cameras:
         * try out: https://simpl.info/getusermedia/sources/
         * code :   https://github.com/samdutton/simpl/blob/gh-pages/getusermedia/sources/js/main.js#L39
         * */

        var videoOptions = [];
        navigator.mediaDevices.enumerateDevices().then((data) => {
            for (const deviceInfo of data) {
                if (deviceInfo.kind === 'videoinput') {
                    videoOptions.push(deviceInfo.deviceId);
                    console.log(deviceInfo.label);

                    //display all videoinput devices
                    
                    var node = document.createElement("LI");
                    var textnode = document.createTextNode(deviceInfo.label);  
                    node.appendChild(textnode); 
                    document.getElementById("deviceInfos").appendChild(node); 
                    
                }
            }
        })

        var cameraIndexToUse = videoOptions.length - 1; //if there is more than 1, the last one should be the back-camera --> [FRONT, BACK,....]
        const videoSource = videoOptions[cameraIndexToUse];

        var node = document.createElement("LI");
        var textnode = document.createTextNode(videoSource + 'is used');
        node.appendChild(textnode);
        document.getElementById("deviceInfos").appendChild(node); 

        const constraint = { video: { deviceId: videoSource ? { exact: videoSource } : undefined } };

        console.log(constraint);
        return constraint;
    }


    useEffect(() => {
        setStep(2);
        // Get access to the camera
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // Not adding `{ audio: true }` since we only want video now

            navigator.mediaDevices.getUserMedia(getStreamConstraint()).then(function (stream) {
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