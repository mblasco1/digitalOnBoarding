//import * as Microblink from 'microblink/dist/microblink.js';
import React, { Component } from 'react';


export class IdCheck extends Component {
    displayName = IdCheck.name

    constructor(props) {
        super(props);
        if (window.microblinkInitialized) {
            return; // there seems to be no way to remove listeners from microblink
        }
        window.microblinkInitialized = true;
        window.Microblink.SDK.SetEndpoint('/api/microblink');
        window.Microblink.SDK.SetRecognizers(['MRTD']);

        let me = this;

        function blobToDataURL(blob) {
            return new Promise((fulfill, reject) => {
                let reader = new FileReader();
                reader.onerror = reject;
                reader.onload = (e) => fulfill(reader.result);
                reader.readAsDataURL(blob);
            });
        }

        window.Microblink.SDK.RegisterListener({
            onScanSuccess: (data) => {
                console.log('Data from Microblink API is', data);
                blobToDataURL(data.sourceBlob).then((dataUrl) => {
                    me.props.onImageUpload(dataUrl, "id");
                    //this.props.history.push('/livenessCheck');
                });
            },
            onScanError: (error) => {
                console.error('Error from Microblink API is', error);

                // Display generic alert
                if (error.summary) {
                    alert(error.summary);
                }
            }
        });
    }

    render() {
        return (
			<microblink-ui-web tabs autoscroll>
				<template className={localization json}>
							{
								"buttons": {
								"browse": "Browse",
							"cameraLocal": "Use web camera",
							"cameraRemote": "Use remote phone camera",
							"tryAgain": "TRY AGAIN",
							"takePhoto": "TAKE A PHOTO",
							"copy": "Copy to clipboard",
							"confirm": "CONFIRM",
							"retake": "RETAKE"
						},
					"labels": {
								"dragDrop": "Drag and Drop\ndocument here OR",
								"nativeCamera": "Choose image from \ndevice or camera app:",
							"cameraActivate": "Activate your camera to capture the ID document:",
							"errorMsg": "We're sorry, but something went wrong. Please try again.",
							"notFoundErrorMsg": "No camera was found on your device.",
							"notAllowedErrorMsg": "You have denied camera access permission.",
								"permissionMsg": "Enable camera please",
						"table": {
								"keys": "Data field from the ID",
							"values": "Value"
						},
						"uploading" : "Uploading",
						"processing" : "Processing",
						"analyzing" : "Analyzing",
						"extracting" : "Extracting data",
						"almostDone" : "Almost done",
						"openLinkAtSmartphone": "Please open exchange link in the browser at smartphone.",
						"generatingExchangeLink": "Generating exchange link...",
						"exchangeLinkTitle": "Exchange link is"
					},
					"tabs": {
								"retake": "RETAKE",
							"results": "RESULTS",
							"image": "IMAGE",
							"json": "JSON"
						}
					}
				</template>
            </microblink-ui-web>
        );
    }
}