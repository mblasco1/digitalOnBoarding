//import * as Microblink from 'microblink/dist/microblink.js';
import React, { Component } from 'react';


export class IdCheck extends Component {
    displayName = IdCheck.name

    constructor(props) {
        super(props);
        //Microblink.SDK.SetRecognizers(['MRTD', 'USDL']);
        window.Microblink.SDK.SetUserId('test-user-id@microblink.com');
        window.Microblink.SDK.SetRecognizers(['MRTD']);
        window.Microblink.SDK.SetAuthorization('Bearer MDY0YWNlMGNiN2IzNGUwZTk4YWVmMDVhZDEyOGJjY2E6Mzk5NzNkNDUtYjg4MS00OWE1LTlhMTItYmEzYTRkNmYzY2Fj');

        window.Microblink.SDK.RegisterListener({
            onScanSuccess: (data) => {
                console.log('Data from Microblink API is', data);
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
            <microblink-ui-web  autoscroll>
            </microblink-ui-web>
        );
    }
}