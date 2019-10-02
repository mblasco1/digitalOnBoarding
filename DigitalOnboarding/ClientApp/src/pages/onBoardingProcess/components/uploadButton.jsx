import React from 'react';
import { PropTypes } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    uploadScetion: {
        display: 'flex',
        justifyContent: 'center',
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
            <input accept="image/*" className={classes.button} id="upload-button-file" multiple type="file" onChange={fileChangedHandler} />
        </div>
    );
}

UploadButton.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UploadButton);