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
		'--mb-widget-font-family':'Roboto',
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

const IdScanFront = (props) => {
	const { classes } = props;

	console.log(props);

	useEffect(() => {
		props.setStep(2);

		if (window.microblinkInitialized) {
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
					if (props.location.pathname.indexOf('idscanfront') !== -1) {
						console.log('we are at scan front');
						console.log(props.location.pathname);
						onBoardingObject.idPhotoFront = dataUrl;
						onBoardingObject.idPhotoFrontMicroblinkObject = data;
						props.history.push('/onboarding/idscanfrontconfermation', onBoardingObject);
					} else if (props.location.pathname.indexOf('idscanback') !== -1) {
						console.log('we are at scan back');
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


		//can be refactored and splitted betweend biodid and microblink views
	var onImageUpload = async function(dataUrl, type) {
		if (this.idphoto && this.liveimage1 && this.liveimage2) {
			this.uploaded = true;
			let result = await fetch('/api/bioid/photoverify', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					idphoto: this.idphoto,
					liveimage1: this.liveimage1,
					liveimage2: this.liveimage2,
					accuracy: 1
				})
			});


			let response = await result.json()
			console.log("photoverify:", response);
			window.alert(result.status + ": " + JSON.stringify(response));
		}
	}
	}

	return (
		<React.Fragment>
			<TitleSection title="ID Vorderseite" Icon={ScanIcon} subtitle="Bitte die Vorderseite Ihrer ID scannen" />
			<div className={classes.actionSection}>
					<microblink-ui-web class={classes.microblinkContainer} tabs autoscroll>
						<img slot="loader-image" class="hide-until-component-is-loaded" src="https://microblink.com/bundles/microblinkmicroblink/images/loading-animation-on-blue.gif" />
						<span slot="labels.openLinkAtSmartphone" class="hide-until-component-is-loaded"  >Please open <b>exchange link</b> at the smartphone with <b>QR</b> reader.</span>
					</microblink-ui-web>
			</div>
		</React.Fragment>
	);
}
export default withStyles(styles)(IdScanFront);