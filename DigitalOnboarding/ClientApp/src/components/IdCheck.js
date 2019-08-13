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
            </microblink-ui-web>
        );
    }
}