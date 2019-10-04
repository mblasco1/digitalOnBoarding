import React, { useState, useEffect, useRef } from "react";
import { withStyles } from '@material-ui/core/styles';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as tf from '@tensorflow/tfjs';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

const styles = theme => ({
    actionSection: {
        marginTop: 50,
        height: 450,
        position: 'relative',
        [theme.breakpoints.down(800)]: {
            marginTop: 0,
            display: 'flex',
            justifyContent: 'center',
            height: 250,
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

    recognitionRectangle: {
        top: '0',
        left: '0',
    },

    info: {
        backgroundColor: '#1E90FF',
    },

});

function VideoScreenshot(props) {
    const { classes } = props;
    const [infoOpen, setInfoOpen] = useState(false);

    const videoContainer = useRef(null);
    var videoIsStreaming = false;
    var webCamPromise = null;

    const makeScreenshot = () => {
            videoIsStreaming = false; //macht sonst mehrere da er schneller ist als das video schliessen
            var canvasContext = document.getElementById("recognition").getContext('2d');
            canvasContext.drawImage(videoContainer.current, 0, 0, 640, 480);
            document.getElementById("recognition").toBlob(redirectToConfirmationPage, 'image/jpeg');
    }

    const redirectToConfirmationPage = (blob) => {

        blobToDataURL(blob).then(async (dataUrl) => {
            videoIsStreaming = false;
            videoContainer.current.stop();
            //callback with dataUrl
            props.parentCallback(dataUrl);
        });
    }

    const blobToDataURL = (blob) => {
        return new Promise((fulfill, reject) => {
            let reader = new FileReader();
            reader.onerror = reject;
            reader.onload = (e) => fulfill(reader.result);
            reader.readAsDataURL(blob);
        });
    }

    useEffect(() => {

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
            webCamPromise = navigator.mediaDevices.enumerateDevices().then((data) => {
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
                        videoIsStreaming = true;
                    };

                    videoContainer.current.stop = function unmountStream() {
                        videoContainer.current.selectedStream.getTracks()[0].stop();
                    };

                    return new Promise((resolve, reject) => {
                        videoContainer.current.onloadedmetadata = () => {
                            resolve();
                        };
                    });
                })
            })

            videoContainer.current.addEventListener('loadeddata', (event) => {
                var modelPromise = cocoSsd.load();
                Promise.all([modelPromise, webCamPromise])
                    .then(values => {
                        detectFrame(document.getElementById("video"), values[0]);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            });

        }
    }, []);

    //============================================================================================================================================
    // tensorflow object detection
    // https://codesandbox.io/s/tensorflowjs-real-time-object-detection-bysze

    const detectFrame = (video, model) => {
        if (videoIsStreaming) {
            model.detect(video).then(predictions => {
                renderPredictions(predictions);
                requestAnimationFrame(() => {
                    detectFrame(video, model);
                });
            });
        }
    };

    const renderPredictions = predictions => {
        /*
        const ctx = document.getElementById("recognition").getContext("2d");
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        // Font options.
        const font = "16px sans-serif";
        ctx.font = font;
        ctx.textBaseline = "top";
        */
        predictions.forEach(prediction => {
            if (prediction.class == "book") {

                
                let x = prediction.bbox[0];
                let y = prediction.bbox[1];
                let width = prediction.bbox[2];
                let height = prediction.bbox[3];

                /*
                //da videoframe gespielt ist...
                x = videoContainer.current.width - (x + width);

                // Draw the bounding box.
                ctx.strokeStyle = "#ff0000";
                ctx.lineWidth = 4;
                ctx.strokeRect(x, y, width, height);
                // Draw the label background.
                ctx.fillStyle = "#ff0000";
                let textWidth = ctx.measureText(prediction.class).width;
                let textHeight = parseInt(font, 10); // base 10

                //Nur für Textanzeige (Hintergrund)
                //ctx.fillRect(x, y, textWidth + 26, textHeight + 4);
                */
                //Make Screenshot
                var vid = document.getElementById("video");
                const factorWidth = 0.6;
                const factorHeight = 0.50;
                if (width > (vid.videoWidth * factorWidth) && height > (vid.videoHeight * factorHeight) && prediction.score > 0.70) {
                    console.log("-------> Snpashot!");
                    makeScreenshot();
                } else {
                    showInfoSnack();
                }
            }
        });
        /* Nur für Textanzeige
        predictions.forEach(prediction => {
            if (prediction.class == "book") {
                let x = prediction.bbox[0];
                let y = prediction.bbox[1];
                let width = prediction.bbox[2];
                //da videoframe gespielt ist...
                x = videoContainer.current.width - (x + width);

                // Draw the text last to ensure it's on top.
                ctx.fillStyle = "#000000";
                ctx.fillText("ID Card", x, y);
            }
        });
        */
    };

    //============================================================================================================================================
    const showInfoSnack = () => { setInfoOpen(true); }
    const hideInfoSnack = () => { setInfoOpen(false); }

    return (
        <div className={classes.actionSection}>
            <video ref={videoContainer} className={[classes.videoElement]} id="video" autoPlay></video>
            <canvas className={classes.canvasElement} id="recognition" width="600" height="500" />
            
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={infoOpen} autoHideDuration={2000} onClose={hideInfoSnack}>
                <SnackbarContent className={classes.info} onClose={hideInfoSnack} message="Bitte die ID so nah wie möglich zu der Kamera halten." />
            </Snackbar>
        </div>
    );
}

export default withStyles(styles)(VideoScreenshot);