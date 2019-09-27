import React, { Component } from 'react';

const apiURL = 'https://api.regulaforensics.com/webapi';

const eRPRM_ResultType = Object.freeze({
    Empty: 0,
    RawImage: 1,
    FileImage: 2,
    MRZ_OCR_Extended: 3,
    BarCodes: 5,
    Graphics: 6,
    MRZ_TestQuality: 7,
    DocumentTypesCandidates: 8,
    ChosenDocumentTypeCandidate: 9,
    DocumentsInfoList: 10,
    OCRLexicalAnalyze: 15,
    RawUncroppedImage: 16,
    Visual_OCR_Extended: 17,
    BarCodes_TextData: 18,
    BarCodes_ImageData: 19,
    Authenticity: 20,
    EOSImage: 23,
    Bayer: 24,
    MagneticStripe: 25,
    MagneticStripe_TextData: 26,
    FieldFileImage: 27,
    Custom: 100
});

const eRPRM_Lights = Object.freeze({
    OFF: 0x00000000,
    OVI: 0x00000001,
    White_Top: 0x00000002,
    White_Side: 0x00000004,
    White_Front: 0x00800000,
    IR_Top: 0x00000008,
    IR_Side: 0x00000010,
    IR_Front: 0x01000000,
    IR_870: 0x01000000,
    White_Gray: 0x02000000,
    OVD: 0x04000000,
    UV: 0x00000080,
    IR_Luminescence: 0x000000100,
    AXIAL_White_Left: 0x00000400,
    AXIAL_White_Right: 0x00000800,
    AXIAL_White_Front: 0x00000200,
    IR_Bottom: 0x00001000,
    White_Bottom: 0x00002000,
    IR_700: 0x00001000,
    IR_940: 0x00002000,
    White_Full: 0x00800006, //White_Top + White_Side
    IR_Full: 0x00800018, //IR_Top + IR_Side
    AXIAL_White_Full: 0x00000C00, // AXIAL_White_Left + AXIAL_White_Right
    RAW_Data: 0x80000000,
    RAW_Data_GRBG: 0x90000000,
    RAW_Data_GBGR: 0xA0000000,
    RAW_Data_RGGB: 0xB0000000,
    RAW_Data_BGGR: 0xC0000000,
    TOP_L: 0x00004000,
    TOP_R: 0x00008000,
    BOTTOM_L: 0x00020000,
    BOTTOM_R: 0x00040000,
    LEFT_T: 0x00080000,
    LEFT_B: 0x00100000,
    RIGHT_T: 0x00200000,
    RIGHT_B: 0x00400000,
    RAW_Data_GRBG: 0x90000000,
    RAW_Data_GBRG: 0xA0000000,
    RAW_Data_RGGB: 0xB0000000,
    RAW_Data_BGGR: 0xC0000000,
    Transmitted: 0x00000020,
    Transmitted_IR: 0x00000040,
    AntiStokes: 0x00010000,
    TOP_L: 0x00004000,
    TOP_R: 0x00008000,
    BOTTOM_L: 0x00020000,
    BOTTOM_R: 0x00040000,
    LEFT_T: 0x00080000,
    LEFT_B: 0x00100000,
    RIGHT_T: 0x00200000,
    RIGHT_B: 0x00400000,
    TOP: 0x0000C000, //TOP_L + TOP_R
    BOTTOM: 0x00060000, //BOTTOM_L + BOTTOM_R
    TOP_LEFT: 0x00084000, //TOP_L + LEFT_T
    TOP_RIGHT: 0x00208000, //TOP_R + RIGHT_T
    BOTTOM_LEFT: 0x00120000, //BOTTOM_L + LEFT_B
    BOTTOM_RIGHT: 0x00440000, //BOTTOM_R + RIGHT_B
    LEFT: 0x00180000, //LEFT_T + LEFT_B
    RIGHT: 0x00600000, //RIGHT_T + RIGHT_B
    FULL_MATRIX: 0x007EC000, //TOP + BOTTOM + LEFT + RIGHT
});

const eRPRM_GetImage_Modes = Object.freeze({
    Empty: 0x00000000,
    GetUncroppedImages: 0x00000001,
    ReceiveAllScannedImages: 0x00000002,
    OCR_Visual_Graphics: 0x00000004,
    GetImages: 0x00000008,
    LocateDocument: 0x00000010,
    DocumentType: 0x00000020,
    OCR_MRZ: 0x00000040,
    OCR_Visual_Text: 0x00000080,
    OCR_Visual: 0x00000084, //OCR_Visual_Graphics + OCR_Visual_Text
    OCR_BarCodes: 0x00000100,
    Authenticity: 0x00000200,
    OCR_TestMRZQuality: 0x00000400,
    RAW_Data: 0x00000800,
    RAW_Data_Only: 0x00001000,
    NoColorCompensation: 0x00002000,
    NoDistortionCompensation: 0x00004000,
    Reserved7: 0x00008000,
    Reserved8: 0x00010000,
    Reserved9: 0x00020000,
    Reserved10: 0x00040000,
    Reserved11: 0x00080000,
    Reserved12: 0x00100000,
    Reserved13: 0x00200000,
    Reserved14: 0x00400000,
    Reserved15: 0x00800000,
    Reserved16: 0x01000000,
    Reserved17: 0x02000000,
    Reserved18: 0x04000000,
    Reserved19: 0x08000000,
    Custom1: 0x10000000,
    Custom2: 0x20000000,
    Custom3: 0x40000000,
    Custom4: 0x80000000
});

const eRPRM_Authenticity = Object.freeze({
    None: 0x00000000,
    UV_Luminescence: 0x00000001,
    IR_B900: 0x00000002,
    Image_Pattern: 0x00000004,
    Axial_Protection: 0x00000008,
    UV_Fibers: 0x00000010,
    IR_Visibility: 0x00000020,
    OCRSecurityText: 0x00000040,
    IPI: 0x00000080,
    IR_Photo: 0x00000100,
    Photo_Embed_Type: 0x00000200,
    OVI: 0x00000400,
    IR_Luminescence: 0x00000800,
    Holograms: 0x00001000,
    Photo_Area: 0x00002000,
    UV_Background: 0x00004000,
    Portrait_Comparison: 0x00008000,
    BarcodeFormatCheck: 0x000010000,
    UV: 0x000000015 //UV_Luminescence + Image_Pattern + UV_Fibers
});

const TransactionStatus = Object.freeze({
    Unknown: 0,
    Submitted: 1,
    InProgress: 2,
    Completed: 3,
    Error: 4
});

export class RegulaForensics extends Component {

    constructor() {
        super();
    }

    static get apiURL() {
        return apiURL;
    }

    static get eRPRM_ResultType() {
        return eRPRM_ResultType;
    }

    static get eRPRM_Lights() {
        return eRPRM_Lights;
    }

    static get eRPRM_GetImage_Modes() {
        return eRPRM_GetImage_Modes;
    }

    static get eRPRM_Authenticity() {
        return eRPRM_Authenticity;
    }

    static get TransactionStatus() {
        return TransactionStatus;
    }

    //return xToken
    async authenticate() {

        let response = await fetch(apiURL + '/Authentication/Authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                //TODO: Wo userId und Password speichern?
                userId: 'TestUser',
                Password: 'Regul@SdkTest'
            })
        });
        let xToken = "";
        for (var pair of response.headers.entries()) {
            if (pair[0] == 'x-token') {
                xToken = pair[1];
            }
        }

        return xToken;
    }

    //return transactionID
    async submitTransaction(xToken, idPhotoFront, imgFormat) {

        let capabilities = eRPRM_GetImage_Modes.OCR_Visual_Graphics + eRPRM_GetImage_Modes.GetImages + eRPRM_GetImage_Modes.LocateDocument + eRPRM_GetImage_Modes.DocumentType + eRPRM_GetImage_Modes.OCR_MRZ + eRPRM_GetImage_Modes.OCR_Visual_Text;
        let requestURL = apiURL + '/Transaction2/SubmitTransaction?capabilities='.concat(capabilities, '&authenticity=', eRPRM_Authenticity.None)

        //SubmitTransaction
        let response = await fetch(requestURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Token': xToken
            },
            body: '[' + JSON.stringify({
                Base64ImageString: idPhotoFront,
                Format: imgFormat,
                LightIndex: eRPRM_Lights.White_Full,
                PageIndex: 0
            }) + ']'
        });

        let transactionId = await response.json()
        return transactionId;
    }

    //return Status of Transaction -->watch const TransactionStatus
    async getTransactionStatus(transactionId, xToken) {
        let requestURL = apiURL + '/Transaction2/GetTransactionStatus?transactionId='.concat(transactionId)

        //SubmitTransaction
        let response = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Token': xToken
            }
        });
        let result = await response.json()
        return result.Status;
    }

    //return a list of data or null
    async getTransactionResultJson(transactionId, resultType, xToken) {
        var requestURL = apiURL + '/Transaction2/GetTransactionResultJson?transactionId='.concat(transactionId, '&resultType=', resultType)

        //SubmitTransaction
        let response = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Token': xToken
            },
        });

        let result = await response.json();
        //ATTENTION, if nothing was found, the result is zero
        if (result != null) {
            let idData = result[0].ListVerifiedFields.pFieldMaps;

            return idData
        } else {
            return null;
        }
    }

    //return image in Base64ImageString-Format
    async getImages(transactionId, xToken) {
        let requestURL = apiURL + '/Transaction2/GetImages?transactionId='.concat(transactionId)

        let response = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Token': xToken
            },
        });
        let result = await response.json()

        if (result != null) {
            let image = result[0].Base64ImageString;

            return image
        } else {
            return null;
        }
    }

}


