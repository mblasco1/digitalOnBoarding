import React, { Component } from 'react';
import $ from 'jquery';
import './BioID.css';


export class BioID extends Component {
    displayName = BioID.name

    async componentDidMount() {
        var res = await fetch('/api/bioid/token');
        var response = await res.json();
        var token = response.token;
        //var returnURL = '/';
        //var state = response.state;
        var apiurl = response.apiUrl;
        var task = response.task;
        var trait = response.trait;
        var executions = response.maxTries;
        var recordings = response.recordings;
        var challengeResponse = response.challengeResponse;
        var challenges = JSON.parse(response.challengesJson);
        var maxHeight = 320;
        // END OF CONFIGURATION


        // BWS capture jQuery plugin
        var bwsCapture = null;

        // counter for current execution
        var currentExecution = 0;

        // map for the compact upload
        var progressMap = new Map();

        // localized messages (english defaults, might get overloaded in initialize())
        var localizedData = {
            'titleEnrollment': 'Enrollment',
            'titleVerification': 'Verification',
            'titleIdentification': 'Identification',
            'titleLiveDetection': 'Liveness Detection',

            'buttonCancel.title': 'Abort and navigate back to caller',
            'buttonMirror.title': 'Mirror the display of the captured images',
            'buttonStart.title': 'Start the recording of images',
            'buttonContinue.title': 'Skip biometric process',
            'buttonContinue': 'Skip biometrics',
            'buttonMobileApp.title': 'Continue biometric process with BioID app',
            'buttonMobileApp': 'Start BioID app',

            'prompt': 'This web page requires the HTML5 Media Capture and Streams API (getUserMedia(), as supported by the actual versions of Opera, Firefox, Chrome and Edge).<br/>You also have to grant access to your camera.',
            'mobileapp': 'If you have installed the BioID App on your mobile device, you can use this app for enrollment or verification.',

            'uploadInfo': 'Uploading...',

            'capture-error': 'The user might have denied access to their camera.<br />Sorry, but without access to a camera, biometric face/periocular recognition is not possible!',
            'nogetUserMedia': 'Your browser does not support the HTML5 Media Capture and Streams API. You might want to use the BioID mobile App instead.',
            'permissionDenied': 'Permission Denied!',
            'webgl-error': 'WebGL is disabled or unavailable. If possible activate WebGL or use another browser.',

            'UserInstruction-3': '3 ...',
            'UserInstruction-2': '2 ...',
            'UserInstruction-1': '1 ...',
            'UserInstruction-FollowMe': 'Follow Me',
            'UserInstruction-NoMovement': 'Please move your head ...',

            'Perform-enrollment': 'Training ...',
            'Perform-verification': 'Verifying ...',
            'Perform-identification': 'Identifying ...',
            'Perform-livenessdetection': 'Processing ...',

            'NoFaceFound': 'No face found',
            'MultipleFacesFound': 'Upload failed: multiple faces were found',
            'LiveDetectionFailed': 'Live detection failed<br/>Retrying ...',
            'ChallengeResponseFailed': 'Challenge-Response failed!<br/>Follow the head ...',
            'NotRecognized': 'You have not been recognized!<br/>Retrying ...'
        };

        /* ----------------- Set button functionality ------------------------------------------*/

        initialize();

        // called from Start button and onStart to initiate a new recording
        function startRecording(countdown) {
            $('#uuistart').hide();
            var tags = challengeResponse && challenges.length > currentExecution && challenges[currentExecution].length > 0 ? challenges[currentExecution] : [];
            bwsCapture.startRecording(tags, countdown);
        }


        /* ---------------- Localization of strings ----------------------------------------------*/


        // localization of displayed strings
        function localize() {
            // loops through all HTML elements that must be localized.
            let resourceElements = $('[data-res]');
            for (let i = 0; i < resourceElements.length; i++) {
                let element = resourceElements[i];
                let resourceKey = $(element).attr('data-res');
                if (resourceKey) {
                    // Get all the resources that start with the key.
                    for (let key in localizedData) {
                        if (key.indexOf(resourceKey) === 0) {
                            let value = localizedData[key];
                            // Dot notation in resource key - assign the resource value to the elements property
                            if (key.indexOf('.') > -1) {
                                let attrKey = key.substring(key.indexOf('.') + 1);
                                $(element).attr(attrKey, value);
                            }
                            // No dot notation in resource key, assign the resource value to the element's innerHTML.
                            else if (key === resourceKey) {
                                $(element).html(value);
                            }
                        }
                    }
                }
            }
        }

        // localization and string formatting (additional arguments replace {0}, {1}, etc. in localizedData[key])
        function formatText(key) {
            var formatted = key;
            if (localizedData[key] !== undefined) {
                formatted = localizedData[key];
            }
            for (let i = 1; i < arguments.length; i++) {
                formatted = formatted.replace('{' + (i - 1) + '}', arguments[i]);
            }
            return formatted;
        }


        /* ----------------- Initialize BWS capture jQuery plugin --------------------------------*/


        // initialize - load content in specific language and initialize bws capture
        function initialize() {

            // try to get language info from the browser.
            let userLangAttribute = navigator.language || navigator.userLanguage || navigator.browserLanguage || 'en';
            userLangAttribute = 'en';
            let userLang = userLangAttribute.slice(0, 2);
            // let userLocation = userLangAttribute.slice(-2) || 'us';

            $.getJSON('/uui/language/' + userLang + '.json')
                .done(function (data) {
                    console.log('Loaded the language-specific resource successfully');
                    localizedData = data;
                }).fail(function (textStatus, error) {
                    console.log('Loading of language-specific resource failed with: ' + textStatus + ', ' + error);
                }).always(function () {
                    localize();
                    // init BWS capture jQuery plugin (see bws.capture.js)
                    bwsCapture = window.bws.initcapture(document.getElementById('uuicanvas'), token, {
                        apiurl: apiurl,
                        task: task,
                        trait: trait,
                        challengeResponse: challengeResponse,
                        recordings: recordings,
                        maxheight: maxHeight
                    });
                    try {
                        let head = new window.HeadGuide('uuihead', 'uuiwebapp', 'uuicanvas', task);
                        onStart(head);
                    } catch (e) {
                        console.log(e);
                        $('#uuierror').html(formatText('webgl-error'));
                    }
                });
        }



        /* ------------------ Start BWS capture jQuery plugin -----------------------------------*/
        let me = this;
        // startup code
        function onStart(headGuide) {
            bwsCapture.start(function () {
                $('#uuicanvas').show();
                captureStarted();
            }, function (error) {
                if (error !== undefined) {
                    // different browsers use different errors
                    if (error.code === 1 || error.name === 'PermissionDeniedError') {
                        // in the spec we find code == 1 and name == PermissionDeniedError for the permission denied error
                        $('#uuierror').html(formatText('capture-error', formatText('PermissionDenied')));
                    } else {
                        // otherwise try to print the error
                        $('#uuierror').html(formatText('capture-error', error));
                    }
                } else {
                    // no error info typically says that browser doesn't support getUserMedia
                    $('#uuierror').html(formatText('nogetUserMedia'));
                }
            }, function (error, retry) {
                // done
                stopRecording(headGuide);
                currentExecution++;
                    me.props.onRestart();
                if (error !== undefined && retry && currentExecution < executions) {
                    // if failed restart if retries are left, but wait a bit until the user has read the error message!
                    setTimeout(function () { startRecording(true); }, 1800);
                    console.log('Current Execution: ' + currentExecution);
                    
                } else {
                    // done: redirect to caller ...
                    /*let url = returnURL + '?access_token=' + token;
                    if (error !== undefined) {
                        url = url + '&error=' + error;
                    }
                    url = url + '&state=' + state;
                    window.location.replace(url);*/
                }
            }, function (status, message, dataURL) {
                let $msg;
                if (status === 'UploadProgress') {
                    // for single upload status
                    let id = message.id;
                    let modId = ((id - 1) % 4) + 1;
                    // for compact upload status
                    let progresscompact = 0;
                    progressMap.set(id, message.progress);
                    progressMap.forEach((value) => progresscompact += value);
                    progresscompact = Math.ceil(progresscompact / recordings);
                    if (progresscompact > 100) {
                        progresscompact = 100;
                    }

                    // css media query decision
                    if ($('#uuisingleupload').is(':visible')) {
                        $('#uuiprogress' + modId).show();
                        $('#uuiprogressbar' + modId).width(message.progress + '%');
                        // if the window size changed
                        $('#uuiprogresscompact').hide();
                    } else {
                        $('#uuiprogresscompact').show();
                        $('#uuiprogressbarcompact').width(progresscompact + '%');
                    }
                } else if (status === 'DisplayTag') {
                    headGuide.setCurrentTag(message);
                    $msg = $('#uuiinstruction');
                    $msg.html(formatText('UserInstruction-FollowMe'));
                    $msg.stop(true).fadeIn();
                } else {
                    // report a message on the screen
                    let msg = formatText(status);

                    // user instructions
                    if (status.indexOf('UserInstruction') > -1) {
                        $msg = $('#uuiinstruction');
                        if (status === 'UserInstruction-Start') {
                            let counter = recordings;
                            if (counter > 4) {
                                counter = 4;
                            }
                            for (let i = 1; i <= counter; i++) {
                                $('#uuiuploaded' + i).hide();
                                $('#uuiupload' + i).hide();
                                $('#uuiwait' + i).show();
                                $('#uuiimage' + i).show();
                                $('#uuiprogress' + i).hide();
                                $('#uuiprogressbar' + i).width(0);
                            }
                            progressMap.clear();
                            $('#uuiprogresscompact').hide();
                            $('#uuiprogressbarcompact').width(0);
                            headGuide.resetHeadDisplay();
                        } else {
                            $msg.html(msg);
                            $msg.stop(true).fadeIn();
                        }
                    }

                    // perform tasks
                    if (status.indexOf('Perform') > -1 || status.indexOf('Retry') > -1) {
                        // show message
                        $msg = $('#uuimessage');
                        $msg.html(msg);
                        $msg.stop(true).fadeIn().delay(1800).fadeOut();
                        // hide compact upload progress
                        $('#uuiprogresscompact').hide();
                    }

                    // results of uploading or perform task
                    if (status.indexOf('Failed') > -1 ||
                        status.indexOf('NotRecognized') > -1 ||
                        status.indexOf('NoFaceFound') > -1 ||
                        status.indexOf('MultiFacesFound') > - 1) {

                        // hide head and userinstruction
                        headGuide.hideHead();
                        $('#uuiinstruction').hide();
                        $('#uuicanvas').css('filter', 'blur(10px)');

                        // show message
                        $msg = $('#uuimessage');
                        $msg.html(msg);
                        $msg.stop(true).fadeIn().delay(1800).fadeOut();
                        setTimeout(function () { $('#uuicanvas').css('filter', ''); }, 1900);
                    }

                    // display some animations/images depending on the status
                    let uploaded = bwsCapture.getUploaded();
                    let recording = uploaded + bwsCapture.getUploading();
                    // use modulo calculation for images more than 4
                    let modRecording = ((recording - 1) % 4) + 1;
                    let modUploaded = ((uploaded - 1) % 4) + 1;

                    if (status === 'Uploading') {
                        // begin an upload - current image
                        $('#uuiwait' + modRecording).hide();
                        $('#uuiupload' + modRecording).show();
                        $('#uuiuploaded' + modRecording).hide();

                        // if uuiuploaded is not visible -> mobile view
                        if (recording >= recordings) {
                            headGuide.hideHead();
                            $('#uuiinstruction').hide();
                            $('#uuicanvas').css('filter', 'blur(10px)');

                            $msg = $('#uuimessage');
                            $msg.html(formatText('uploadInfo'));
                            $msg.stop(true).fadeIn();
                        }
                    } else if (status === 'Uploaded') {
                        // successfull upload (we should have a dataURL)
                        if (dataURL) {
                            $('#uuiupload' + modUploaded).hide();
                            $('#uuiprogress' + modUploaded).hide();
                            let $image = $('#uuiuploaded' + modUploaded);
                            $image.attr('src', dataURL);
                            $image.show();
                            me.props.onImageUpload(dataURL, "face");
                        }
                    } else if (status === 'NoFaceFound' || status === 'MultipleFacesFound') {
                        // upload failed
                        recording++;
                        modRecording = ((recording - 1) % 4) + 1;
                        $('#uuiupload' + modRecording).hide();
                        $('#uuiwait' + modRecording).show();
                    }
                }
            });
        }

        // called by onStart to update GUI
        function captureStarted() {
            $('#uuisplash').hide();
            $('#uuiwebapp').show();
            $('#uuimessage').show();
            $('#uuiinstruction').show();

            $('#uuistart').show().click(function () { startRecording(task === 'enrollment'); });

        }

        // called from onStart when recording is done
        function stopRecording(headGuide) {
            $('#uuiinstruction').hide();
            headGuide.hideHead();

            bwsCapture.stopRecording();
            for (let i = 1; i <= 4; i++) {
                $('#uuiimage' + i).hide();
            }
        }
    }

    render() {
        return (
            <div className="uuimain">
                <section id="uuisplash">
                    <div id="uuiprompt" className="prompt">
                        <p data-res="prompt"></p>
                        <p id="uuierror" className="alert-danger"></p>
                    </div>
                </section>
                <section id="uuiwebapp" className="webapp">
                    <div id="uuiinstruction" className="instruction transparent-background"></div>
                    <canvas id="uuicanvas" className="liveview"></canvas>
                    <div id="uuimessage" className="message"></div>
                    <div id="uuihead" className="head"></div>
                    <div id="uuistart" className="startbutton"><img src="/uui/images/play.svg" className="button-big-grow" alt="start" title="Start the recording of images" data-res="buttonStart" /></div>
                    <div id="uuisingleupload" className="uploadstatus-single">

                        <div id="uuiimage1" className="image">
                            <div id="uuiwait1" className="spinner spinner-wait"></div>
                            <div id="uuiupload1" className="spinner spinner-upload" data-res="uploadInfo">Uploading...</div>
                            <img id="uuiuploaded1" className="image-uploaded" alt=""/>
                            <div id="uuiprogress1" className="progress-single">
                                <div id="uuiprogressbar1" className="progressbar"></div>
                            </div>
                        </div>
                        <div id="uuiimage2" className="image">
                            <div id="uuiwait2" className="spinner spinner-wait"></div>
                            <div id="uuiupload2" className="spinner spinner-upload" data-res="uploadInfo">Uploading...</div>
                            <img id="uuiuploaded2" className="image-uploaded" alt=""/>
                            <div id="uuiprogress2" className="progress-single">
                                <div id="uuiprogressbar2" className="progressbar"></div>
                            </div>
                        </div>
                        <div id="uuiimage3" className="image">
                            <div id="uuiwait3" className="spinner spinner-wait"></div>
                            <div id="uuiupload3" className="spinner spinner-upload" data-res="uploadInfo">Uploading...</div>
                            <img id="uuiuploaded3" className="image-uploaded" alt=""/>
                            <div id="uuiprogress3" className="progress-single">
                                <div id="uuiprogressbar3" className="progressbar"></div>
                            </div>
                        </div>
                        <div id="uuiimage4" className="image">
                            <div id="uuiwait4" className="spinner spinner-wait"></div>
                            <div id="uuiupload4" className="spinner spinner-upload" data-res="uploadInfo">Uploading...</div>
                            <img id="uuiuploaded4" className="image-uploaded" alt=""/>
                            <div id="uuiprogress4" className="progress-single">
                                <div id="uuiprogressbar4" className="progressbar"></div>
                            </div>
                        </div>
                    </div>
                    <div id="uuicompactupload" className="uploadstatus-compact">
                        <div id="uuiprogresscompact" className="progress-compact">
                            <div id="uuiprogressbarcompact" className="progressbar"></div>
                        </div>
                    </div>
                </section>

            </div>
        );
    }
}