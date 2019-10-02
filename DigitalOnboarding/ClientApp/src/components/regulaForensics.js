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

const eVisualFieldType = Object.freeze({
    0: 'Document Class Code',
    1: 'Issuing State Code',
    2: 'Document Number',
    3: 'Date of Expiry',
    4: 'Date of Issue',
    5: 'Date of Birth',
    6: 'Place of Birth',
    7: 'Personal Number',
    8: 'Surname',
    9: 'Given Names',
    10: 'Mothers Name',
    11: 'Nationality',
    12: 'Sex',
    13: 'Height',
    14: 'Weight',
    15: 'Eyes Color',
    16: 'Hair Color',
    17: 'Address',
    18: 'Donor',
    19: 'Social Security Number',
    20: 'DL Class',
    21: 'DL Endorsed',
    22: 'DL Restriction Code',
    23: 'DL Under 21 Date',
    24: 'Authority',
    25: 'Surname And Given Names',
    26: 'Nationality Code',
    27: 'Passport Number',
    28: 'Invitation Number',
    29: 'Visa ID',
    30: 'Visa Class',
    31: 'Visa SubClass',
    32: 'MRZ String1',
    33: 'MRZ String2',
    34: 'MRZ String3',
    35: 'MRZ Type',
    36: 'MRZ Name',
    37: 'Document Class Name',
    38: 'Issuing State Name',
    39: 'Place of Issue',
    40: 'Document Number Checksum',
    41: 'Date of Birth Checksum',
    42: 'Date of Expiry Checksum',
    43: 'Personal Number Checksum',
    44: 'FinalChecksum',
    45: 'Passport Number Checksum',
    46: 'Invitation Number Checksum',
    47: 'Visa ID Checksum',
    48: 'Surname And Given Names Checksum',
    49: 'Visa Valid Until Checksum',
    50: 'Other',
    51: 'MRZ Strings',
    52: 'Name Suffix',
    53: 'Name Prefix',
    54: 'Date of Issue Checksum',
    55: 'Date of Issue CheckDigit',
    56: 'Document Series',
    57: 'RegCert RegNumber',
    58: 'RegCert CarModel',
    59: 'RegCert CarColor',
    60: 'RegCert BodyNumber',
    61: 'RegCert CarType',
    62: 'RegCert MaxWeight',
    63: 'Reg Cert Weight',
    64: 'Address Area',
    65: 'Address State',
    66: 'Address Building',
    67: 'Address House',
    68: 'Address Flat',
    69: 'Place of Registration',
    70: 'Date of Registration',
    71: 'Resident From',
    72: 'Resident Until',
    73: 'Authority Code',
    74: 'Place of Birth Area',
    75: 'Place of Birth StateCode',
    76: 'Address Street',
    77: 'Address City',
    78: 'Address Jurisdiction Code',
    79: 'Address Postal Code',
    80: 'Document Number CheckDigit',
    81: 'Date of Birth CheckDigit',
    82: 'Date of Expiry CheckDigit',
    83: 'Personal Number CheckDigit',
    84: 'FinalCheckDigit',
    85: 'Passport Number CheckDigit',
    86: 'Invitation Number CheckDigit',
    87: 'Visa ID CheckDigit',
    88: 'Surname And Given Names CheckDigit',
    89: 'Visa Valid Until CheckDigit',
    90: 'Permit DL Class',
    91: 'Permit Date of Expiry',
    92: 'Permit Identifier',
    93: 'Permit Date of Issue',
    94: 'Permit Restriction Code',
    95: 'Permit Endorsed',
    96: 'Issue Timestamp',
    97: 'Number of Duplicates',
    98: 'Medical Indicator Codes',
    99: 'Non Resident Indicator',
    100: 'Visa Type',
    101: 'Visa Valid From',
    102: 'Visa Valid Until',
    103: 'Duration of Stay',
    104: 'Number of Entries',
    105: 'Day',
    106: 'Month',
    107: 'Year',
    108: 'Unique Customer Identifier',
    109: 'Commercial Vehicle Codes',
    110: 'AKA Date of Birth',
    111: 'AKA Social Security Number',
    112: 'AKA Surname',
    113: 'AKA Given Names',
    114: 'AKA Name Suffix',
    115: 'AKA Name Prefix',
    116: 'Mailing Address Street',
    117: 'Mailing Address City',
    118: 'Mailing Address Jurisdiction Code',
    119: 'Mailing Address Postal Code',
    120: 'Audit Information',
    121: 'Inventory Number',
    122: 'Race Ethnicity',
    123: 'Jurisdiction Vehicle Class',
    124: 'Jurisdiction Endorsement Code',
    125: 'Jurisdiction Restriction Code',
    126: 'Family Name',
    127: 'Given Names RUS',
    128: 'Visa ID RUS',
    129: 'Fathers Name',
    130: 'Fathers Name RUS',
    131: 'Surname And Given Names RUS',
    132: 'Place Of Birth RUS',
    133: 'Authority RUS',
    134: 'Issuing State Code Numeric',
    135: 'Nationality Code Numeric',
    136: 'Engine Power',
    137: 'Engine Volume',
    138: 'Chassis Number',
    139: 'Engine Number',
    140: 'Engine Model',
    141: 'Vehicle Category',
    142: 'Identity Card Number',
    143: 'Control No',
    144: 'Parrent s Given Names',
    145: 'Second Surname',
    146: 'Middle Name',
    147: 'RegCert VIN',
    148: 'RegCert VIN CheckDigit',
    149: 'RegCert VIN Checksum',
    150: 'Line1 CheckDigit',
    151: 'Line2 CheckDigit',
    152: 'Line3 CheckDigit',
    153: 'Line1 Checksum',
    154: 'Line2 Checksum',
    155: 'Line3 Checksum',
    156: 'RegCert RegNumber CheckDigit',
    157: 'RegCert RegNumber Checksum',
    158: 'RegCert Vehicle ITS Code',
    159: 'Card Access Number',
    160: 'Marital Status',
    161: 'Company Name',
    162: 'Special Notes',
    163: 'Surname of Spose',
    164: 'Tracking Number',
    165: 'Booklet Number',
    166: 'Children',
    167: 'Copy',
    168: 'Serial Number',
    169: 'Dossier Number',
    170: 'AKA Surname And Given Names',
    171: 'Territorial Validity',
    172: 'MRZ Strings With Correct CheckSums',
    173: 'DL CDL Restriction Code',
    174: 'DL Under 18 Date',
    175: 'DL Record Created',
    176: 'DL Duplicate Date',
    177: 'DL Iss Type',
    178: 'Military Book Number',
    179: 'Destination',
    180: 'Blood Group',
    181: 'Sequence Number',
    182: 'RegCert BodyType',
    183: 'RegCert CarMark',
    184: 'Transaction Number',
    185: 'Age',
    186: 'Folio Number',
    187: 'Voter Key',
    188: 'Address Municipality',
    189: 'Address Location',
    190: 'Section',
    191: 'OCR Number',
    192: 'Federal Elections',
    193: 'Reference Number',
    194: 'Optional Data Checksum',
    195: 'Optional Data CheckDigit',
    196: 'Visa Number',
    197: 'Visa Number Checksum',
    198: 'Visa Number CheckDigit',
    199: 'Voter',
    200: 'Previous Type',
    220: 'Field From MRZ',
    221: 'Current Date',
    251: 'Status Date of Expiry',
    252: 'Bancnote Number',
    253: 'CSC Code',
    254: 'Artistic Name',
    255: 'Academic Title',
    256: 'Address Country',
    257: 'Address Zipcode',
    258: 'eID Residence Permit1',
    259: 'eID Residence Permit2',
    260: 'eID PlaceOfBirth Street',
    261: 'eID PlaceOfBirth City',
    262: 'eID PlaceOfBirth State',
    263: 'eID PlaceOfBirth Country',
    264: 'eID PlaceOfBirth Zipcode',
    265: 'CDL Class',
    266: 'DL Under 19 Date',
    267: 'Weight pounds',
    268: 'Limited Duration Document Indicator',
    269: 'Endorsement Expiration Date',
    270: 'Revision Date',
    271: 'Compliance Type',
    272: 'Family name truncation',
    273: 'First name truncation',
    274: 'Middle name truncation',
    275: 'Exam Date',
    276: 'Organization',
    277: 'Department',
    278: 'Pay Grade',
    279: 'Rank',
    280: 'Benefits Number',
    281: 'Sponsor Service',
    282: 'Sponsor Status',
    283: 'Sponsor',
    284: 'Relationship',
    285: 'USCIS',
    286: 'Category',
    287: 'Conditions',
    288: 'Identifier',
    289: 'Configuration',
    290: 'Discretionary data',
    291: 'Line1 Optional Data',
    292: 'Line2 Optional Data',
    293: 'Line3 Optional Data',
    294: 'EQV Code',
    295: 'ALT Code',
    296: 'Binary Code',
    297: 'Pseudo Code',
    298: 'Fee',
    299: 'Stamp Number',
    300: 'SBH SecurityOptions',
    301: 'SBH IntegrityOptions',
    302: 'Date of Creation',
    303: 'Validity Period',
    304: 'Patron Header Version',
    305: 'BDB Type',
    306: 'Biometric Type',
    307: 'Biometric Subtype',
    308: 'Biometric ProductID',
    309: 'Biometric Format Owner',
    310: 'Biometric Format Type',
    311: 'Phone',
    312: 'Profession',
    313: 'Title',
    314: 'Personal Summary',
    315: 'Other Valid ID',
    316: 'Custody Info',
    317: 'Other Name',
    318: 'Observations',
    319: 'Tax',
    320: 'Date of Personalization',
    321: 'Personalization SN',
    322: 'Date of Record',
    323: 'PersonToNotify Date of Record',
    324: 'PersonToNotify Name',
    325: 'PersonToNotify Phone',
    326: 'PersonToNotify Address',
    327: 'DS Certificate Issuer',
    328: 'DS Certificate Subject',
    329: 'DS Certificate ValidFrom',
    330: 'DS Certificate ValidTo',
    331: 'VRC DataObject Entry',
    332: 'Type Approval Number',
    333: 'Administrative Number',
    334: 'Document Discriminator',
    335: 'Data Discriminator',
    336: 'ISO Issuer ID Number',
    340: 'GNIB Number',
    341: 'Dept Number',
    342: 'Telex Code',
    343: 'Allergies',
    344: 'Sp Code',
    345: 'Court Code',
    346: 'Cty',
    347: 'Sponsor SSN',
    348: 'DoD Number',
    349: 'MC Novice Date',
    350: 'DUF Number',
    351: 'AGY',
    352: 'PNR Code',
    353: 'From Airport Code',
    354: 'To Airport Code',
    355: 'Flight Number',
    356: 'Date of Flight',
    357: 'Seat Number',
    358: 'Date of Issue Boarding Pass',
    359: 'CCW Until',
    360: 'Reference Number Checksum',
    361: 'Reference Number CheckDigit',
    362: 'Room Number',
    363: 'Religion',
    364: 'RemainderTerm',
    365: 'Electronic Ticket Indicator',
    366: 'Compartment Code',
    367: 'CheckIn Sequence Number',
    368: 'Airline Designator of boarding pass issuer',
    369: 'Airline Numeric Code',
    370: 'Ticket Number',
    371: 'Frequent Flyer Airline Designator',
    372: 'Frequent Flyer Number',
    373: 'Free Baggage Allowance',
    374: 'PDF417Codec',
    375: 'Identity Card Number Checksum',
    376: 'Identity Card Number CheckDigit',
    377: 'Veteran',
    378: 'DLClassCode A1 From',
    379: 'DLClassCode A1 To',
    380: 'DLClassCode A1 Notes',
    381: 'DLClassCode A From',
    382: 'DLClassCode A To',
    383: 'DLClassCode A Notes',
    384: 'DLClassCode B From',
    385: 'DLClassCode B To',
    386: 'DLClassCode B Notes',
    387: 'DLClassCode C1 From',
    388: 'DLClassCode C1 To',
    389: 'DLClassCode C1 Notes',
    390: 'DLClassCode C From',
    391: 'DLClassCode C To',
    392: 'DLClassCode C Notes',
    393: 'DLClassCode D1 From',
    394: 'DLClassCode D1 To',
    395: 'DLClassCode D1 Notes',
    396: 'DLClassCode D From',
    397: 'DLClassCode D To',
    398: 'DLClassCode D Notes',
    399: 'DLClassCode BE From',
    400: 'DLClassCode BE To',
    401: 'DLClassCode BE Notes',
    402: 'DLClassCode C1E From',
    403: 'DLClassCode C1E To',
    404: 'DLClassCode C1EvNotes',
    405: 'DLClassCode CE From',
    406: 'DLClassCode CE To',
    407: 'DLClassCode CE Notes',
    408: 'DLClassCode D1E From',
    409: 'DLClassCode D1E To',
    410: 'DLClassCode D1E Notes',
    411: 'DLClassCode DE From',
    412: 'DLClassCode DE To',
    413: 'DLClassCode DE Notes',
    414: 'DLClassCode M From',
    415: 'DLClassCode M To',
    416: 'DLClassCode M Notes',
    417: 'DLClassCode L From',
    418: 'DLClassCode L To',
    419: 'DLClassCode L Notes',
    420: 'DLClassCode T From',
    421: 'DLClassCode T To',
    422: 'DLClassCode T Notes',
    423: 'DLClassCode AM From',
    424: 'DLClassCode AM To',
    425: 'DLClassCode AM Notes',
    426: 'DLClassCode A2 From',
    427: 'DLClassCode A2 To',
    428: 'DLClassCode A2 Notes',
    429: 'DLClassCode B1 From',
    430: 'DLClassCode B1 To',
    431: 'DLClassCode B1 Notes',
    432: 'Surname at Birth',
    433: 'Civil Status',
    434: 'Number of Seats',
    435: 'Number of Standing Places',
    436: 'Max Speed',
    437: 'Fuel Type',
    438: 'EC Environmental Type',
    439: 'Power Weight Ratio',
    440: 'Max Mass of Trailer Braked',
    441: 'Max Mass of Trailer Unbraked',
    442: 'Transmission Type',
    443: 'Trailer Hitch',
    444: 'Accompanied by',
    445: 'Police District',
    446: 'First Issue Date',
    447: 'Payload Capacity',
    448: 'Number of Axels',
    449: 'Permissible Axle Load',
    450: 'Precinct',
    451: 'Invited by',
    452: 'Purpose of Entry',
    453: 'Skin Color',
    454: 'Complexion',
    455: 'Airport From',
    456: 'Airport To',
    457: 'Airline Name',
    458: 'Airline Name Frequent Flyer',
    459: 'License Number',
    460: 'In Tanks',
    461: 'Exept In Tanks',
    462: 'Fast Track',
    463: 'Owner',
    464: 'MRZ Strings ICAO RFID',
    465: 'Number of Card Issuance',
    466: 'Number of Card Issuance Checksum',
    467: 'Number of Card Issuance CheckDigit',
    468: 'Century Date of Birth',
    469: 'DLClassCode A3 From',
    470: 'DLClassCode A3 To',
    471: 'DLClassCode A3 Notes',
    472: 'DLClassCode C2 From',
    473: 'DLClassCode C2 To',
    474: 'DLClassCode C2 Notes',
    475: 'DLClassCode B2 From',
    476: 'DLClassCode B2 To',
    477: 'DLClassCode B2 Notes',
    478: 'DLClassCode D2 From',
    479: 'DLClassCode D2 To',
    480: 'DLClassCode D2 Notes',
    481: 'DLClassCode B2E From',
    482: 'DLClassCode B2E To',
    483: 'DLClassCode B2E Notes',
    484: 'DLClassCode G From',
    485: 'DLClassCode G To',
    486: 'DLClassCode G Notes',
    487: 'DLClassCode J From',
    488: 'DLClassCode J To',
    489: 'DLClassCode J Notes',
    490: 'DLClassCode LC From',
    491: 'DLClassCode LC To',
    492: 'DLClassCode LC Notes',
    493: 'Bank Card Number',
    494: 'Bank Card Valid Thru',
    495: 'Tax Number',
    496: 'Health Number',
    497: 'Grandfather Name',
    498: 'Selectee Indicator',
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

    static get eVisualFieldType() {
        return eVisualFieldType;
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

        return result;
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

    getParsedOCRLexicalAnalyzeData(dataOCR) {
        let dataList = new Array();
        for (let i = 0; i < dataOCR[0].ListVerifiedFields.pFieldMaps.length; i++) {
            let success = false;
            let type = "";
            let value = "";

            try {
                type = dataOCR[0].ListVerifiedFields.pFieldMaps[i].FieldType;
                value = dataOCR[0].ListVerifiedFields.pFieldMaps[i].Field_Visual;
                success = true;
            } catch (e) {
                console.log("Error in reading data of ID Front (OCRLexicalAnalyze)");
                console.log(e);
            }

            if (success) {
                //Add data
                for (var k in RegulaForensics.eVisualFieldType) {
                    if (k == type) {
                        type = RegulaForensics.eVisualFieldType[k];
                        break;
                    }
                };
                dataList.push({ type, value });
            }
        }

        return dataList;
    }





}


