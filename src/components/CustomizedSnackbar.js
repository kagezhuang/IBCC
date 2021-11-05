import PropTypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CustomizedSnackbar({ kind, message='', open, handleClose, duration=5000 }) {
  
  return (
    <Snackbar 
      data-testid='snackbar'
      open={ open } 
      autoHideDuration={ duration } 
      onClose={ handleClose }
    >
      <Alert severity={ kind } onClose={ handleClose }>
        { message }
      </Alert>
    </Snackbar>
  )
}

CustomizedSnackbar.propTypes = {
  kind: PropTypes.oneOf(['info', 'success', 'error', 'warning']),
  message: PropTypes.string,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default CustomizedSnackbar;
