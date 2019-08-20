//import libs
import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import Fab from "@material-ui/core/Fab";
import ArrowIcon from "@material-ui/icons/ArrowForward";
import Select from "@material-ui/core/Select";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grow from '@material-ui/core/Grow';
import SuccessIcon from '@material-ui/icons/Done';
import FailedIcon from '@material-ui/icons/Clear';

//import resources
import { ReactComponent as IdentityIcon } from "../../images/picto_identity.svg";
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
	textFieldName: {
		width: 320	
	},
	textFieldStreet: {
		width: 220,
		marginRight: 24
	},
	textFieldStreetnumber: {
		width: 76
	},
	textFieldZip: {
		width: 98,
		marginRight: 24
	},
	textFieldCity: {
		width: 98
	},
	textFieldEmail: {
		width: 220
	},
	textFieldNationality: {
		width: 220
	},
	nationSelect: {
		width: 220
	},
	progress: {
		margin: '30px 0px 0px 30px',
		width: '30px !important',
		height: '30px !important'
	},
	failedIcon: {
		color: 'red',
		marginTop: 40,
		marginLeft: 15
	},
	successIcon: {
		color: 'green',
		marginTop: 40,
		marginLeft: 15
	}
});

const PhoneNumber = (props) => {
	const { classes } = props;

	console.log(props);
	console.log(onBoardingObject);

	const addressValidationEnum = Object.freeze({ "NotPossible": 0, "Pending": 1, "Success": 2, "Failed": 3 });

	//ToDo: refactor validation to a generic validation class
	const [identificationValidation, setIdentificationValidation] = useState({
		'name': { 'value': '', 'isValid': false, 'type': 'required', 'message': '', 'messageRequired': 'Bitte Name eingeben', 'touched': false  },
		'street': { 'value': '', 'isValid': false, 'type': 'required', 'message': '', 'messageRequired': 'Bitte Strasse eingeben', 'touched': false },
		'streetnumber': { 'value': '', 'isValid': false, 'type': 'required', 'message': '', 'messageRequired': 'Bitte Hausnummer eingeben', 'touched': false },
		'zip': { 'value': '', 'isValid': false, 'type': 'required, length', 'length': 4, 'message': '', 'messageRequired': 'Bitte Postleitzahl eingeben', 'messageLength': 'Postleitzahl muss 4 Zeichen haben', 'touched': false },
		'city': { 'value': '', 'isValid': false, 'type': 'required', 'message': '', 'messageRequired': 'Bitte Stadt eingeben', 'touched': false },
		'email': { 'value': '', 'isValid': false, 'type': 'required, regex', 'regexExpression': '^[^@]+@[^@]+\.[^@]+$',  'message': 'Bitte Email eingeben', 'messageRequired': 'Bitte Email eingeben', 'messageRegex': 'Email-Adresse ist ungültig', 'touched': false }
	});
	const [nationality, setNationality] = useState('Schweiz');
	const [adressValidationState, setAddressValidationState] = useState(addressValidationEnum.NotPossible);


	useEffect(() => {
		props.setStep(1);
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
			}

			//validation error found and loop needs to be exited, this ensures one validation message at the time
			return !object.isValid
		});

		object.touched = true;
	}

	const handleChangeSelect = (evt) => {
		setNationality(evt.target.value);
	}

	const handleChange = (evt) => {
		//copy, mutate, replace state
		let copiedIdentificationObject = { ...identificationValidation };

		let objectToValidate = copiedIdentificationObject[evt.target.id];
		objectToValidate.value = evt.target.value;
		validateObject(objectToValidate);		

		setIdentificationValidation(copiedIdentificationObject);

		tryValidateAddress();
	}

	var validateAddress = async function () {
		console.log('address is ready to be validated');

		let formData = new FormData();
		formData.append('name', identificationValidation.name.value);
		formData.append('street', identificationValidation.street.value);
		formData.append('houseNumber', identificationValidation.streetnumber.value);
		formData.append('postalCode', identificationValidation.zip.value);
		formData.append('city', identificationValidation.city.value);

		let response = await fetch('/api/address/verify', {
			method: 'POST',
			body: formData
		});

		let result = await response.json();

		console.log(result);
		setAddressValidationState(result.isValid ? addressValidationEnum.Success : addressValidationEnum.Failed);
	}

	var tryValidateAddress = async function() {
		let canBeValidated =
			identificationValidation.name.isValid &&
			identificationValidation.street.isValid &&
			identificationValidation.streetnumber.isValid &&
			identificationValidation.zip.isValid &&
			identificationValidation.city.isValid;

		if (canBeValidated) {
			setAddressValidationState(addressValidationEnum.Pending);
			validateAddress();
		}

	}

	const onlyFourDigits = (evt) => {
		if (evt.target.value.length > 4) {
			evt.target.value = evt.target.value.substring(0, 4);
		}
	}

	const onlyNumbers = (evt) => {
		const keyCode = evt.keyCode || evt.which;
		if (!((keyCode >= 48 && keyCode <= 57) || (keyCode >= 96 && keyCode <= 105))) {
			evt.preventDefault();
		}
	}

	

	const nextStep = () => {
		//copy, mutate, replace state
		let copiedIdentificationObject = { ...identificationValidation };

		//if has errors, redirection should not happen
		let errorCount = 0;

		//validate everything, in case some fancy stuff happened underway
		for (var key in identificationValidation) {
			let objectToValidate = copiedIdentificationObject[key];
			validateObject(objectToValidate);

			if (!objectToValidate.isValid)
				errorCount++;
		}

		setIdentificationValidation(copiedIdentificationObject);

		if (errorCount === 0 && adressValidationState === addressValidationEnum.Success) {
			//retrieve from location.state, add values, pass object		
			onBoardingObject.phoneNumber = props.location.state.phoneNumber;
			onBoardingObject.name = identificationValidation.name.value;
			onBoardingObject.street = identificationValidation.street.value;
			onBoardingObject.streetnumber = identificationValidation.streetnumber.value;
			onBoardingObject.zip = identificationValidation.zip.value;
			onBoardingObject.city = identificationValidation.city.value;
			onBoardingObject.email = identificationValidation.email.value;
			onBoardingObject.nationality = nationality;

			props.history.push("/onBoarding/idscanfront", onBoardingObject);
		}
	}

	return (
		<React.Fragment>
			<TitleSection title="Identifikation" Icon={IdentityIcon} subtitle="Bitte Ihre persönlichen Daten eingeben" />
			<div className={classes.actionSection}>

				<TextField id="name"
					label="Name"
					error={!identificationValidation.name.isValid && identificationValidation.name.touched}
					helperText={!identificationValidation.name.isValid && identificationValidation.name.touched ? identificationValidation.name.message : ""}
					onBlur={handleChange}
					className={classes.textFieldName}
					margin="normal"
				/>
				<div>
					<TextField id="street"
						label="Strasse"
						error={!identificationValidation.street.isValid && identificationValidation.street.touched}
						helperText={!identificationValidation.street.isValid && identificationValidation.street.touched ? identificationValidation.street.message : ""}
						onBlur={handleChange}
						className={classes.textFieldStreet}
						margin="normal"
					/>
					<TextField id="streetnumber"
						label="Hausnummer"
						error={!identificationValidation.streetnumber.isValid && identificationValidation.streetnumber.touched}
						helperText={!identificationValidation.streetnumber.isValid && identificationValidation.streetnumber.touched ? identificationValidation.streetnumber.message : ""}
						onBlur={handleChange}
						className={classes.textFieldStreetnumber}
						margin="normal" />
				</div>
				<div>
					<TextField id="zip"
						onKeyDown={onlyNumbers}
						onKeyUp={onlyFourDigits}
						error={!identificationValidation.zip.isValid && identificationValidation.zip.touched}
						helperText={!identificationValidation.zip.isValid && identificationValidation.zip.touched ? identificationValidation.zip.message : ""}
						onBlur={handleChange}
						label="Postleitzahl"
						className={classes.textFieldZip}
						margin="normal" />

					<TextField id="city"
						label="Stadt"
						error={!identificationValidation.city.isValid && identificationValidation.city.touched}
						helperText={!identificationValidation.city.isValid && identificationValidation.city.touched ? identificationValidation.city.message : ""}
						onBlur={handleChange}
						className={classes.textFieldCity}
						margin="normal" />

					{adressValidationState === addressValidationEnum.Pending && (
						<Grow in={adressValidationState === addressValidationEnum.Pending}>
							<CircularProgress className={classes.progress} title="Adresse wird validiert..." />
						</Grow>
					)}
					{adressValidationState === addressValidationEnum.Failed && (
						<Grow in={adressValidationState === addressValidationEnum.Failed} style={{ transformOrigin: '0 0 0' }} {...(adressValidationState === addressValidationEnum.Failed ? { timeout: 1000 } : {})}>
							<FailedIcon className={classes.failedIcon} />
						</Grow>
					)}
					{adressValidationState === addressValidationEnum.Success && (
						<Grow in={adressValidationState === addressValidationEnum.Success} style={{ transformOrigin: '0 0 0' }} {...(adressValidationState === addressValidationEnum.Success ? { timeout: 1000 } : {})}>
							<SuccessIcon className={classes.successIcon} />
						</Grow>
					)}
				</div>
				<div>
					<TextField id="email"
						type="email"
						error={!identificationValidation.email.isValid && identificationValidation.email.touched}
						helperText={!identificationValidation.email.isValid && identificationValidation.email.touched ? identificationValidation.email.message : ""}
						onBlur={handleChange}
						label="Email"
						className={classes.textFieldEmail}
						margin="normal" />
				</div>
				<div>
					<FormControl>
					<InputLabel htmlFor="nationality">Nationalität</InputLabel>
						<Select value={nationality} onChange={handleChangeSelect} className={classes.nationSelect} inputProps={{ name: 'nationality', id: 'nationality', }}>
							<MenuItem value="Schweiz">Schweiz</MenuItem>
							<MenuItem value="Deutschland">Deutschland</MenuItem>
						</Select>
					</FormControl>
				</div>
				
				<Fab onClick={nextStep} aria-label="arrow" className={classes.fab}>
					<ArrowIcon color='primary' />
				</Fab>
			</div>
		</React.Fragment>
	);
}
export default withStyles(styles)(PhoneNumber);