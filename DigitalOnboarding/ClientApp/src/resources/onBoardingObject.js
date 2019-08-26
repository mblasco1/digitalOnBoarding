const onBoardingObject = {
	'phoneNumber': '',
	'name': '',
	'street': '',
	'streetnumber': '',
	'zip': '',
	'city': '',
	'email': '',
	'nationality': '',
	'idPhotoFront': '',
	'idPhotoFrontMinimized': '',
	'idPhotoFrontMicroblinkObject': null,
	'idPhotoBack': '',
	'idPhotoBackMicroblinkObject': null,
	'livenessDetectionFirstPicture': '',
	'livenessDetectionSecondPicture': '',
	'bioIdLivenessObject': null
}

const onBoardingUtilities = {
	//allows "stateless storing" bound with props.location.state (react router), care...it can handle only onBoardingObject
	'copyFromObject': function (copyTo, copyFrom) {
	
		var type = typeof copyFrom;
		if (type === 'object' && !!copyFrom && !!copyTo) {

			copyTo.phoneNumber = copyFrom.phoneNumber;
			copyTo.name = copyFrom.name;
			copyTo.street = copyFrom.street;
			copyTo.streetnumber = copyFrom.streetnumber;
			copyTo.zip = copyFrom.zip;
			copyTo.city = copyFrom.city;
			copyTo.email = copyFrom.email;
			copyTo.idPhotoFrontMinimized = copyFrom.idPhotoFrontMinimized;
			copyTo.nationality = copyFrom.nationality;
			copyTo.idPhotoFront = copyFrom.idPhotoFront;
			copyTo.idPhotoFrontMicroblinkObject = copyFrom.idPhotoFrontMicroblinkObject;
			copyTo.idPhotoBack = copyFrom.idPhotoBack;
			copyTo.idPhotoBackMicroblinkObject = copyFrom.idPhotoBackMicroblinkObject;
			copyTo.livenessDetectionFirstPicture = copyFrom.livenessDetectionFirstPicture;
			copyTo.livenessDetectionSecondPicture = copyFrom.livenessDetectionSecondPicture;
			copyTo.bioIdLivenessObject = copyFrom.bioIdLivenessObject;

			return copyTo;
		}
		return null;
	}
}

export { onBoardingObject, onBoardingUtilities  }
