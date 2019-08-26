//import libs
import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Fab from "@material-ui/core/Fab";
import ArrowIcon from "@material-ui/icons/ArrowForward";


//import resources
import { ReactComponent as PhoneIcon } from "../../images/phoneIcon.svg";
import { onBoardingObject } from "../../resources/onBoardingObject";

//import components
import TitleSection from "./components/_titleSection";


const styles = theme => ({
	actionSection: {
		marginLeft: 210,
		justifyContent: 'center',
		display: 'flex',
		flexDirection: 'column'
	},
	textFieldPhone: {
		width: 190
	}
});

const PhoneNumber = (props) => {
	const { classes, setStep } = props;

	//ToDo: refactor validation to a generic validation class
	const [phoneValidation, setPhoneValidation] = useState({
		'phone': { 'value': '', 'isValid': false, 'type': 'required, regex', 'minlength': 10, 'minlengthMessage': 'Telefonnummer ist ungültig', 'regexExpression': '^(\\+41|0041|0)\\s?(\\d{2})\\s?(\\d{3})\\s?(\\d{2})\\s?(\\d{2})$', 'message': '', 'messageRequired': 'Bitte Telefonnummer eingeben', 'messageRegex': 'Telefonnummer ist ungültig', 'touched': false }
	});

	useEffect(() => {
		setStep(0);
	}, []);

	const validateObject = (object) => {

		let requiredValidations = object.type.split(",");

		requiredValidations.some((type) => {
			switch (type.trim()) {
				case "required":
					object.message = object.messageRequired;
					object.isValid = object.value.length > 0;
					break;
				case "regex":
					let regexExpression = object.regexExpression;
					object.message = object.messageRegex;
					object.isValid = object.value.match(regexExpression);
					break;
				case "length":
					let desiredLength = object.length;
					object.message = object.messageLength;
					object.isValid = object.value.length === desiredLength;
					break;
				case "minlength":
					let minLength = object.minlength;
					object.message = object.minlengthMessage;
					object.isValid = object.value.length >= minLength;
					break;
			}

			//validation error found and loop needs to be exited, this ensures one validation message at the time
			return !object.isValid
		});

		object.touched = true;
	}

	const handleChange = (evt) => {
		//copy, mutate, replace state
		let copiedPhoneValidation = { ...phoneValidation };

		let objectToValidate = copiedPhoneValidation[evt.target.id];
		objectToValidate.value = evt.target.value;
		validateObject(objectToValidate);

		setPhoneValidation(copiedPhoneValidation);
	}

	const nextStep = () => {
		//copy, mutate, replace state
		let copiedPhoneValidation = { ...phoneValidation };

		//if has errors, redirection should not happen
		let errorCount = 0;

		//validate everything, in case some fancy stuff happened underway
		for (var key in phoneValidation) {
			let objectToValidate = copiedPhoneValidation[key];
			validateObject(objectToValidate);

			if (!objectToValidate.isValid) 
				errorCount++;
		}

		setPhoneValidation(copiedPhoneValidation);

		if (errorCount === 0) {
			//copy values and pass to next view
			onBoardingObject.phoneNumber = phoneValidation.phone.value;
			props.history.push("/onBoarding/identification", onBoardingObject);
		}
	}

	return (
		<React.Fragment>
			<TitleSection title="Los geht's!" Icon={PhoneIcon} subtitle="Bitte ihre Mobilenumber eingeben" />
			<div className={classes.actionSection}>

				<TextField id="phone"
					label="Mobilenummer"
					error={!phoneValidation.phone.isValid && phoneValidation.phone.touched}
					helperText={!phoneValidation.phone.isValid && phoneValidation.phone.touched ? phoneValidation.phone.message : ""}
					onBlur={handleChange}
					className={classes.textFieldPhone}
					margin="normal" />


				<Fab onClick={nextStep} aria-label="arrow" className={classes.fab}>
					<ArrowIcon color='primary' />
				</Fab>
			</div>
		</React.Fragment>
	);
}
export default withStyles(styles)(PhoneNumber);