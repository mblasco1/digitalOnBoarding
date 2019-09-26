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
    const [timer, setTimer] = useState(1);
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

            tryValidateIdScanFront(dataUrl);

            console.log("run over await");
            //props.history.push('/onboarding/idscanfrontconfermation', onBoardingObject);
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

    const regulaForensicsURL = 'https://api.regulaforensics.com/webapi';
    var tryValidateIdScanFront = async function (idPhotoFront) {
        const TRANSACTIONSTATUS_COMPLETED = 3;
        const TRANSACTIONSTATUS_ERROR = 4;

        await authenticate();
        await submitTransaction(idPhotoFront);

        let status = await getTransactionStatus();
        while (status != TRANSACTIONSTATUS_COMPLETED) {
            //TODO Sleep einbauen?...
            status = await getTransactionStatus();
            if (status == TRANSACTIONSTATUS_ERROR) {
                break;
            }
        }
        if (status == TRANSACTIONSTATUS_ERROR) {
            //TODO: Error displayed
        } else {
            await getImages();

            //continue with image processing
            console.log("lets start to read results");
            const RESULT_TYPE_MRZ_OCR_EXTENDED = 15;
            await getTransactionResultJson(RESULT_TYPE_MRZ_OCR_EXTENDED);
        }
    }

    let xToken = "";
    //regulaForensics
    var authenticate = async function () {
        let response = await fetch(regulaForensicsURL + '/Authentication/Authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: 'TestUser',
                Password: 'Regul@SdkTest'
            })
        });

        for (var pair of response.headers.entries()) {
            if (pair[0] == 'x-token') {
                xToken = pair[1];
            }
        }

        console.log("get x-token");
        console.log(xToken);

    }

    let transactionId = "";
    var submitTransaction = async function (idPhotoFront) {
        console.log("sendIdScanFront");

        //capabilities
        const OCR_MRZ = 0x00000040;
        const OCR_Visual_Text = 0x00000080;

        var capabilities = 252;
        //Authenticity
        const RPRM_Authenticity_None = 0;

        //LightIndex
        const RPRM_Light_White_Full = 6;

        var requestURL = regulaForensicsURL + '/Transaction2/SubmitTransaction?capabilities='.concat(capabilities, '&authenticity=', RPRM_Authenticity_None)

        //SubmitTransaction
        let response = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Token': xToken
            },
            body:'[' + JSON.stringify({
                Base64ImageString: idPhotoFront,
                Format: '.jpeg',
                LightIndex: RPRM_Light_White_Full,
                PageIndex: 0

            }) + ']'
        });

        transactionId = await response.json()
    }

    var getTransactionStatus = async function () {
        var requestURL = regulaForensicsURL + '/Transaction2/GetTransactionStatus?transactionId='.concat(transactionId)

        //SubmitTransaction
        let response = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Token': xToken
            }
        });
        let result = await response.json()
        return result.Status;

        /*
         * 0 = Unknown
         * 1 = Submitted
         * 2 = InProgress
         * 3 = Completed
         * 4 = Error
         */
    }

    var getTransactionResultJson = async function (resultType) {
        var requestURL = regulaForensicsURL + '/Transaction2/GetTransactionResultJson?transactionId='.concat(transactionId, '&resultType=', resultType)

        //SubmitTransaction
        let response = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Token': xToken
            },
        });
        console.log('getTransactionResultJson');
        console.log(response);

        
        let result = await response.json();
        console.log('result');
        console.log(result);
        //ACHTUNG, wenn nichts gefunden wurde ist result null
        if (result != null) {
            console.log(result[0].ListVerifiedFields.pFieldMaps)
            //TODO: Daten die erhalten werden in onBoardingObject speichern
        }

        debugger;
    }

    var getImages = async function () {
        var requestURL = regulaForensicsURL + '/Transaction2/GetImages?transactionId='.concat(transactionId)

        //SubmitTransaction
        let response = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Token': xToken
            },
        });
        let result = await response.json()
        //console.log(result);
        //TODO: Prüfen ob ein Bild vorhanden ist (ansonsten ist result null)
        onBoardingObject.idPhotoFront = result[0].Base64ImageString;
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