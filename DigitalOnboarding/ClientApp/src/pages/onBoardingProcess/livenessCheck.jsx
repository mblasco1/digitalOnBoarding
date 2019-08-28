//import libs
import React, { useEffect, useRef, useState } from "react";
import { withStyles } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import ArrowIcon from "@material-ui/icons/ArrowForward";
import $ from 'jquery';

//import resources
import { ReactComponent as LivenessIcon } from "../../images/livenessIcon.svg";
import { onBoardingObject, onBoardingUtilities } from "../../resources/onBoardingObject";
import useInterval from "../../resources/useInterval";

//import components
import TitleSection from "./components/_titleSection";


const styles = theme => ({
	actionSection: {
		marginTop: 50,
		alignItems: 'center',
		display: 'flex',
		flexDirection: 'column'
	},
	pictureContainer: {
		display: 'none'
	}
});


const LivenessCheck = (props) => {
	const { classes } = props;
	const canvasContainer = useRef(null);
	const img1Container = useRef(null);
	const img2Container = useRef(null);
	const [capturing, setCapturing] = useState(false);
	const [isRunning, setIsRunning] = useState(false);

	const maxHeight = 480;
	const motionAreaHeight = 160;
	// The motion threshold is set by the server and 
	// depends on whether the client is a mobile device or not. 
	const motionThreshold = 20;
	var template = null;
	var autoCapture = false;
	var autoCaptureTimer, captureTimer;
	var video = document.createElement('video');
	video.setAttribute('playsinline', '');

	var token = null;
	var apiurl = null;
	var  task = null;
	var  trait = null;
	var  executions = null;
	var  recordings = null;
	var  challengeResponse = null;
	var challenges = null;
	var processInterval = null;
	var sendEvent = null;
	//var returnURL = '/';
	//var state = response.state;

	var hdCamera = null;

	var motioncanvas = document.createElement('canvas');

	console.log(props);

	useEffect(() => {
		props.setStep(3);

		async function getBioIdConfig() {
			const res = await fetch('/api/bioid/token');
			const response = await res.json();
			token = response.token;
			//var returnURL = '/';
			//var state = response.state;
			apiurl = response.apiUrl;
			task = response.task;
			trait = response.trait;
			executions = response.maxTries;
			recordings = response.recordings;
			challengeResponse = response.challengeResponse;
			challenges = JSON.parse(response.challengesJson);
			//maxHeight = 640;
			console.log(response);
		}

		getBioIdConfig();

		navigator.mediaDevices.enumerateDevices().then(gotDevices).then(startVideo);

		//temporarily search for specifi HD cam and select it
		function gotDevices(deviceInfos) {
			for (let i = 0; i !== deviceInfos.length; ++i) {
				const deviceInfo = deviceInfos[i];
				if (deviceInfo.label.indexOf('HD Pro Webcam') !== -1) {
					console.log(deviceInfo);
					hdCamera = deviceInfo;
				}
			}
		}

		//startVideo(video, initCanvases);
		


	}, []);

	useInterval(() => {


	}, isRunning ? 100 : null);

	function startVideo() {

		let constraints = { audio: false, video: { facingMode: "user"  } };

		if (hdCamera !== null) {
			constraints = {
				video: {
					deviceId: { exact: hdCamera.deviceId },
					facingMode: "user"
				},
				audio: false
			}
		}

		console.log(hdCamera);
		navigator.mediaDevices.getUserMedia(constraints)
			.then(function (mediaStream) {
				console.log('Media stream created:', mediaStream.getVideoTracks()[0]);
				video.srcObject = mediaStream;
				video.onloadedmetadata = function (e) {
					console.log('Playing live media stream');
					video.play();
					if (canvasContainer.current !== null) {
						canvasContainer.current.selectedStream = mediaStream;
						canvasContainer.current.stop = function stopStream() {
							canvasContainer.current.selectedStream.getTracks()[0].stop();
						}
						if (initCanvases) { initCanvases(); }
					}
				};
			})
			.catch(function (err) {
				console.log('getUserMedia() error: ', err);
				alert(err.name + ': ' + err.message);
			});
	}

	const initCanvases = () => {
		// we prefer 3 : 4 face image resolution
		let aspectratio = video.videoWidth / video.videoHeight < 3 / 4 ? video.videoWidth / video.videoHeight : 3 / 4;
		canvasContainer.current.height = video.videoHeight > maxHeight ? maxHeight : video.videoHeight;
		canvasContainer.current.width = canvasContainer.current.height * aspectratio;
		motioncanvas.height = motionAreaHeight;
		motioncanvas.width = motioncanvas.height * aspectratio;
		// mirror live preview
		let copy = canvasContainer.current.getContext('2d');
		copy.translate(canvasContainer.current.width, 0);
		copy.scale(-1, 1);
		// set an interval-timer to grab about 20 frames per second
		processInterval = setInterval(processFrame, 100);
	}

	const processFrame = () => {
		if (canvasContainer.current !== null && canvasContainer.current !== undefined) {
			let x = 0, y = 0, w = canvasContainer.current.width, h = canvasContainer.current.height, aspectratio = w / h;
			let cutoff = video.videoWidth - (video.videoHeight * aspectratio);
			let copy = canvasContainer.current.getContext('2d');
			copy.drawImage(video, cutoff / 2, 0, video.videoWidth - cutoff, video.videoHeight, 0, 0, canvasContainer.current.width, canvasContainer.current.height);

			//console.log(capturing);
			//console.log(bla);

			if (capturing || 1 === 1) {
				//console.log('iscapturing');
				// scale current image into the motion canvas
				let motionctx = motioncanvas.getContext('2d');
				motionctx.drawImage(canvasContainer.current, canvasContainer.current.width / 8, canvasContainer.current.height / 8, canvasContainer.current.width - canvasContainer.current.width / 4, canvasContainer.current.height - canvasContainer.current.height / 4, 0, 0, motioncanvas.width, motioncanvas.height);
				let currentImageData = motionctx.getImageData(0, 0, motioncanvas.width, motioncanvas.height);

				if (template) {
					let movement = motionDetection(currentImageData, template);
					// trigger if movementPercentage is above threshold (default: when 20% of maximum movement is exceeded)
					if (movement > motionThreshold) {
						//console.log('i was here too');
						setCapturing(false);
						template = null;
						img2Container.current.src = canvasContainer.current.toDataURL();
						console.log('captured second image');
						//$(image2).show();
						sendEvent = setTimeout(sendImages);
					}
				} else {
					// use as template
					template = createTemplate(currentImageData);
					// capture the current image
					img1Container.current.src = canvasContainer.current.toDataURL();
					console.log('captured first image');
					//$(image1).show();
				}
			}
		}

	}

	function sendImages() {
		//$('#progress').css('width', '0%').attr('aria-valuenow', 0);
		//$('#progressDialog').modal('show');
		console.log(apiurl);
		var formData = new FormData();
		formData.append('image1', img1Container.current.src);
		formData.append('image2', img2Container.current.src);
		formData.append('accuracy', 1);
		$.ajax({
			url: apiurl + 'upload?tag=any&trait=' + trait,
			type: 'POST',
			contentType: false,
			processData: false,
			data: formData,
			headers: { 'Authorization': 'Bearer ' + token },
			xhr: function () {
				let jqxhr = $.ajaxSettings.xhr();
				if (jqxhr.upload) {
					jqxhr.upload.addEventListener('load', function (e) {
						console.log('uploaded');
						//$('#progress').css('width', '100%').attr('aria-valuenow', 100);
					}, false);
				}
				return jqxhr;
			}
		}).done(function (data, textStatus, jqXHR) {
			console.log('upload succeeded');
			console.log(data);
			if (data.Accepted && data.Warnings[0] !== "NoFaceFound") {

				if (img1Container.current != null) {

					canvasContainer.current.stop();
					clearTimeout(sendEvent);
					clearInterval(processInterval);

					onBoardingUtilities.copyFromObject(onBoardingObject, props.location.state);

					onBoardingObject.BioIdLivenssObject = data;
					onBoardingObject.livenessDetectionFirstPicture = img1Container.current.src;
					onBoardingObject.livenessDetectionSecondPicture = img2Container.current.src;

					props.history.push('/onboarding/livenesscheckoverview', onBoardingObject);
				}
			}
			//$('#result').html(data);
		}).fail(function (jqXHR, textStatus, errorThrown) {
			//console.log('upload failed:', textStatus, errorThrown, jqXHR.responseText);
		}).always(function () {
			//$('#progressDialog').modal('hide');
			//$('#capture').prop('disabled', false);
			//$('html, body').animate({ scrollTop: $(document).height() }, 'slow');
		});
	}

	// template for cross-correlation
	function createTemplate(imageData) {
		// cut out the template:
		// we use a small width, quarter-size image around the center as template
		var template = {
			centerX: imageData.width / 2,
			centerY: imageData.height / 2,
			width: imageData.width / 4,
			height: imageData.height / 4 + imageData.height / 8
		};
		template.xPos = template.centerX - template.width / 2;
		template.yPos = template.centerY - template.height / 2;
		template.buffer = new Uint8ClampedArray(template.width * template.height);

		let counter = 0;
		let p = imageData.data;
		for (var y = template.yPos; y < template.yPos + template.height; y++) {
			// we use only the green plane here
			let bufferIndex = (y * imageData.width * 4) + template.xPos * 4 + 1;
			for (var x = template.xPos; x < template.xPos + template.width; x++) {
				let templatepixel = p[bufferIndex];
				template.buffer[counter++] = templatepixel;
				// we use only the green plane here
				bufferIndex += 4;
			}
		}
		console.log('Created new cross-correlation template', template);
		return template;
	}

	// motion detection by a normalized cross-correlation
	function motionDetection(imageData, template) {
		// this is the major computing step: Perform a normalized cross-correlation between the template of the first image and each incoming image
		// this algorithm is basically called "Template Matching" - we use the normalized cross correlation to be independent of lighting changes
		// we calculate the correlation of template and image over the whole image area
		let bestHitX = 0,
			bestHitY = 0,
			maxCorr = 0,
			searchWidth = imageData.width / 4,
			searchHeight = imageData.height / 4,
			p = imageData.data;

		for (var y = template.centerY - searchHeight; y <= template.centerY + searchHeight - template.height; y++) {
			for (var x = template.centerX - searchWidth; x <= template.centerX + searchWidth - template.width; x++) {
				let nominator = 0,
					denominator = 0,
					templateIndex = 0;

				// Calculate the normalized cross-correlation coefficient for this position
				for (var ty = 0; ty < template.height; ty++) {
					// we use only the green plane here
					let bufferIndex = x * 4 + 1 + (y + ty) * imageData.width * 4;
					for (var tx = 0; tx < template.width; tx++) {
						var imagepixel = p[bufferIndex];
						nominator += template.buffer[templateIndex++] * imagepixel;
						denominator += imagepixel * imagepixel;
						// we use only the green plane here
						bufferIndex += 4;
					}
				}

				// The NCC coefficient is then (watch out for division-by-zero errors for pure black images):
				let ncc = 0.0;
				if (denominator > 0) {
					ncc = nominator * nominator / denominator;
				}
				// Is it higher than what we had before?
				if (ncc > maxCorr) {
					maxCorr = ncc;
					bestHitX = x;
					bestHitY = y;
				}
			}
		}
		// now the most similar position of the template is (bestHitX, bestHitY). Calculate the difference from the origin:
		let distX = bestHitX - template.xPos,
			distY = bestHitY - template.yPos,
			movementDiff = Math.sqrt(distX * distX + distY * distY);
		// the maximum movement possible is a complete shift into one of the corners, i.e:
		let maxDistX = searchWidth - template.width / 2,
			maxDistY = searchHeight - template.height / 2,
			maximumMovement = Math.sqrt(maxDistX * maxDistX + maxDistY * maxDistY);

		// the percentage of the detected movement is therefore:
		let movementPercentage = movementDiff / maximumMovement * 100;
		if (movementPercentage > 100) {
			movementPercentage = 100;
		}
		//console.log('Calculated movement: ', movementPercentage);
		return movementPercentage;
	}

	return (
		<React.Fragment>
			<TitleSection title="Selfie & Liveness Check" Icon={LivenessIcon} subtitle="Drehe bitte dein Gesicht zwischen beiden Aufnahmen" />
			<div className={classes.actionSection}>
				<canvas ref={canvasContainer} width={360} height={480} />
			</div>
			<img id="img1" className={classes.pictureContainer} ref={img1Container} />
			<img id="img2" className={classes.pictureContainer} ref={img2Container} />
		</React.Fragment>
	);
}
export default withStyles(styles)(LivenessCheck);