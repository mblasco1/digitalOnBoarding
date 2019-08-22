//import libs
import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core";

//import resources
import { ReactComponent as ScanIcon } from "../../images/idScanIcon.svg";
import onBoardingObject from "../../resources/onBoardingObject";

//import components
import TitleSection from "./components/_titleSection";


const styles = theme => ({
	actionSection: {
		marginTop: 50,
		height: 450
	},
	microblinkContainer: {
		'--mb-widget-font-family': 'Roboto',
		'--mb-hem': '16px',
		'--mb-btn-font-color': 'white',
		'--mb-btn-background-color': '#002650',
		'--mb-btn-background-color-hover': '#8EC8C7',
		'--mb-btn-flip-image-color': 'white',
		'--mb-btn-cancel-color': 'white',
		'--mb-dropzone-hover-color': 'rgba(72, 178, 232, .25)',
		'--mb-loader-font-color': 'black',
		'--mb-loader-background-color': 'rgb(250,250,250)',
		'--mb-counter-background-color': 'rgb(0,0,0,0.7)',
		'--mb-counter-font-color': 'white',
		'--mb-json-color-key': 'black',
		'--mb-json-color-string': '#48b2e8',
		'--mb-json-color-boolean': '#26a4e4',
		'--mb-json-color-number': 'black',
		'--mb-json-color-null': '#26a4e4',
		'--mb-dialog-font-color': 'white',
		'--mb-dialog-background-color': 'black'
	}
});

const IdScanBack = (props) => {
	const { classes } = props;

	console.log(props);

	useEffect(() => {
		props.setStep(2);

		if (window.microblinkInitialized) {
			console.log('is already registered');
			return; // there seems to be no way to remove listeners from microblink
		}

		window.microblinkInitialized = true;
		window.Microblink.SDK.SetEndpoint('/api/microblink');
		window.Microblink.SDK.SetRecognizers(['MRTD']);

		window.Microblink.SDK.RegisterListener({
			onScanSuccess: (data) => {
				blobToDataURL(data.sourceBlob).then((dataUrl) => {
					onBoardingObject.phoneNumber = props.location.state.phoneNumber;
					onBoardingObject.name = props.location.state.name;
					onBoardingObject.street = props.location.state.street;
					onBoardingObject.streetnumber = props.location.state.streetnumber;
					onBoardingObject.city = props.location.state.city;
					onBoardingObject.zip = props.location.state.zip;
					onBoardingObject.email = props.location.state.email;
					onBoardingObject.nationality = props.location.state.nationality;

					//since we cant unregister from the events and we use it two places....
					if (props.location.state.idPhotoFrontMicroblinkObject === null) {
						onBoardingObject.idPhotoFront = dataUrl;
						onBoardingObject.idPhotoFrontMicroblinkObject = data;
						props.history.push('/onboarding/idscanfrontconfermation', onBoardingObject);
					} else {
						onBoardingObject.idPhotoFront = props.location.state.idPhotoFront;
						onBoardingObject.idPhotoFrontMicroblinkObject = props.location.state.idPhotoFrontMicroblinkObject;
						onBoardingObject.idPhotoBack = dataUrl;
						onBoardingObject.idPhotoBackMicroblinkObject = data;
						props.history.push('/onboarding/idscanbackconfermation', onBoardingObject);
					}


				});
			},
			onScanError: (error) => {
				console.error('Error from Microblink API is', error);

				// Display push notfication error
				if (error.summary) {
					alert(error.summary);
				}
			}
		});

	}, []);

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
			<TitleSection title="ID Rückseite" Icon={ScanIcon} subtitle="Bitte die Rückseite Ihrer ID scannen" />
			<div className={classes.actionSection}>
				<microblink-ui-web class={classes.microblinkContainer} tabs autoscroll>
					<img slot="loader-image" class="hide-until-component-is-loaded" src="https://microblink.com/bundles/microblinkmicroblink/images/loading-animation-on-blue.gif" />
					<span slot="labels.openLinkAtSmartphone" class="hide-until-component-is-loaded"  >Please open <b>exchange link</b> at the smartphone with <b>QR</b> reader.</span>
				</microblink-ui-web>
			</div>
		</React.Fragment>
	);
}
export default withStyles(styles)(IdScanBack);