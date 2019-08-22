//import libs
import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core";

//import resources
import { ReactComponent as PictoIdent } from "../../images/Picto_Ident.svg";
import onBoardingObject from "../../resources/onBoardingObject";

//import components
import TitleSection from "./components/_titleSection";

const styles = theme => ({

	actionSection: {
			marginLeft: 210,
			display: 'flex',
			flexDirection: 'column',
			flexWrap: 'wrap'
	},
	pictureCollection: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	picture: {
		margin: '5px 10px'
	}
});

const LivenessCheckOverview = (props) => {
    const { classes } = props;

    console.log(props);

    useEffect(() => {
		props.setStep(3);

		async function executeFakeDetection() {
			//get images
			let idPhoto = props.location.state.idPhotoFront;
			let liveimage1 = props.location.state.livenessDetectionFirstPicture;
			let liveimage2 = props.location.state.livenessDetectionSecondPicture;

			if (idPhoto && liveimage1 && liveimage2) {
				let result = await fetch('/api/bioid/photoverify', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						idphoto: idPhoto,
						liveimage1: liveimage1,
						liveimage2: liveimage2,
						accuracy: 1
					})
				});


				let response = await result.json()
				console.log("photoverify:", response);
				//window.alert(result.status + ": " + JSON.stringify(response));
			}
		}

		executeFakeDetection();

    }, []);

    const nextStep = () => {
        props.history.push("/onBoarding/thanks", onBoardingObject);
	}

	const Picture = ({ data }) => <img className={classes.picture} src={data} height="200" />

    return (
        <React.Fragment>
            <TitleSection title="Selfie & Liveness Check" Icon={PictoIdent} subtitle="Ihr Bild wird geprüft..." />
			<div className={classes.actionSection}>
				<div className={classes.pictureCollection}>
					<Picture data={props.location.state.livenessDetectionSecondPicture} />
					<Picture data={props.location.state.livenessDetectionFirstPicture} />
					<Picture data={props.location.state.idPhotoFront} />
				</div>
				
            </div>

        </React.Fragment>
    );
}
export default withStyles(styles)(LivenessCheckOverview);