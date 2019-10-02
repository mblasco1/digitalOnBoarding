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
    'idPhotoFrontPortrait': '',
    'idPhotoFrontSignature': '',
    'idPhotoFrontDataObject': null,

	'idPhotoBack': '',
    'idPhotoBackDataObject': null,

	'livenessDetectionFirstPicture': '',
    'livenessDetectionSecondPicture': '',

    'bioIdLivenessObject': null,
    'isFileUploaderUsed': null,
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
            copyTo.nationality = copyFrom.nationality;

            copyTo.idPhotoFront = copyFrom.idPhotoFront;
            copyTo.idPhotoFrontPortrait = copyFrom.idPhotoFrontPortrait;
            copyTo.idPhotoFrontSignature = copyFrom.idPhotoFrontSignature;
            copyTo.idPhotoFrontDataObject = copyFrom.idPhotoFrontDataObject;

			copyTo.idPhotoBack = copyFrom.idPhotoBack;
            copyTo.idPhotoBackDataObject = copyFrom.idPhotoBackDataObject;

			copyTo.livenessDetectionFirstPicture = copyFrom.livenessDetectionFirstPicture;
            copyTo.livenessDetectionSecondPicture = copyFrom.livenessDetectionSecondPicture;

            copyTo.bioIdLivenessObject = copyFrom.bioIdLivenessObject;
            copyTo.isFileUploaderUsed = copyFrom.isFileUploaderUsed;

			return copyTo;
		}
		return null;
	}
}

export { onBoardingObject, onBoardingUtilities  }
