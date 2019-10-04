import React from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    uploadScetion: {
        display: 'flex',
        justifyContent: 'center',



    },

    uploadBtnWrapper: {
        position: 'relative',
        overflow: 'hidden',
        display: 'inline - block',

        '& input': {
            fontSize: 100,
            position: 'absolute',
            left: 0,
            top: 0,
            opacity: 0,
        }
    },

    button: {
        border: 'none',
        color: 'white',
        padding: '15px 32px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline - block',
        fontSize: '16px',
        width: 250,
        marginTop: 20,

        backgroundImage: 'linear-gradient(180deg, #004D9F 0%, #0EC8C8 100%)',
        boxShadow: '0 0 16px 0 rgba(255, 255, 255, 0.2)'
    },

});

function UploadButton(props) {
    const { classes } = props;

    var state = {
        selectedFile: null,
        imagePreviewUrl: null,
        callBack: null
    };

    function fileChangedHandler(event) {
        state.selectedFile = event.target.files[0];

        let reader = new FileReader();
        reader.onloadend = () => {
            state.imagePreviewUrl = reader.result;
            props.parentCallback(state.imagePreviewUrl);
        }

        reader.readAsDataURL(event.target.files[0]);
    }

    return (
        <div className={classes.uploadScetion}>
            <div className={classes.uploadBtnWrapper} >
                <button className={classes.button} >{window.screen.width <= 800 ? 'Take a Foto' : 'Upload a file'}</button>
                <input accept="image/*" className={classes.button} multiple type="file" onChange={fileChangedHandler} />
            </div>
        </div>
    );
}

UploadButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UploadButton);