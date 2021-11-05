import React, { useState } from 'react'
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { SESSION_ACTIONS } from '../actions/types';
import PropTypes from 'prop-types';
// import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText'; 
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LockIcon from '@material-ui/icons/Lock';
import CustomizedSnackbar from './CustomizedSnackbar';
import { signIn } from '../services/auth'
import { usernameValidation, passwordValidation } from '../services/inputValidation'

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: '20px 0',
  },
  formControl: {
    width: "100%"
  },
  paper: {
    padding: 40,
    height: '70%',
    width: 300,
    margin: '200px auto'
  },
  typoGraphy: {
    fontSize: '1rem',
    color: 'red'
  }
}));

function LoginForm({ push, storeUser }) {

  const classes = useStyles();
  const [usernameInput, setUsernameInput] = useState(() => {
    return {
      username: '',
      isValid: false,
      error: ''
    }
  })
  const [passwordInput, setPasswordInput] = useState(() => {
    return {
      password: '',
      isValid: false,
      error: '',
      isVisible: false
    }
  })
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  function handleSnackbarClose() {
    setOpenSnackbar(false);
  }
  function handleUsernameChange(e) {
    const username = e.target.value;
    setUsernameInput(prev => {
      return {
        ...prev,
        ...usernameValidation(username)
      };
    });
  }
  function handlePasswordChange(e) {
    const password = e.target.value;
    setPasswordInput(prev => {
      return {
        ...prev, 
        ...passwordValidation(password)
      };
    });
  }
  const handleShowPassword = () => {
    setPasswordInput(prev => {
      return { 
        ...prev, 
        isVisible: !prev.isVisible 
      }
    });
  };
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await signIn(usernameInput.username, passwordInput.password);
      storeUser(data)
      setError(null); 
      push('/');
    } catch (error) {
      setError(`${error}`);
      setLoading(false);
      setOpenSnackbar(true);
    }
  }


  return (
    <Grid>
      <Paper
        className={ classes.paper } 
        elevation={ 5 }
      >
        <Avatar>
          <LockIcon />
        </Avatar>
        <h1>Please log in below</h1>
        <Grid align='center'>
          <TextField 
            className={ classes.margin }
            label='Username'
            placeholder='Please enter username...'
            fullWidth
            required
            onChange={(e) => handleUsernameChange(e)}
            error={ 
              usernameInput.isValid || !usernameInput.username.length ? false : true
            }
            helperText={ 
              usernameInput.isValid || !usernameInput.username.length ? null : usernameInput.error 
            }
          ></TextField>
          <FormControl className={ classes.formControl }>
            <InputLabel 
              htmlFor="standard-adornment-password"
              error={ 
                passwordInput.isValid || !passwordInput.password.length ? false : true
              }
            >
              Password
            </InputLabel>
            <Input
              id="standard-adornment-password"
              type={passwordInput.isVisible ? 'text' : 'password'}
              placeholder='Please enter password...'
              value={passwordInput.password}
              onChange={(e) => handlePasswordChange(e)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={(e) => handleShowPassword(e)}
                    onMouseDown={ handleMouseDownPassword }
                  >
                    {passwordInput.isVisible ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              error={ 
                passwordInput.isValid || !passwordInput.password.length ? false : true
              }
            />
            <FormHelperText 
              id="form-password-helper-text"
              error={ 
                passwordInput.isValid || !passwordInput.password.length ? false : true
              }
            >
              { !passwordInput.password.length ? '' : passwordInput.error }
            </FormHelperText>
          </FormControl>
          <Button 
            className={ classes.margin }
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
            onClick={(e) => submitHandler(e)}
            disabled={ loading || !usernameInput.isValid || !passwordInput.isValid}
          >
            { loading ? 'Loading...' : 'Sign in' }
          </Button>
          <Typography>
            <ButtonBase className={ classes.typoGraphy } onClick={() => { push('/reset-password') }}>
              Forget your password?
            </ButtonBase>
          </Typography>
          <Typography>
            Don't have an account?{' '} 
            <ButtonBase className={ classes.typoGraphy } onClick={ () => push('/signup') }>Sign up!</ButtonBase>
          </Typography>
        </Grid>
      </Paper>
      <CustomizedSnackbar 
        open={ openSnackbar } 
        kind={ error ? 'error' : 'success' } 
        message={ error ? error : 'Login successfully!'} 
        handleClose={handleSnackbarClose}
      />
    </Grid>
  )
}

LoginForm.propTypes = {
  isLoggedIn: PropTypes.bool,
  push: PropTypes.func.isRequired,
  storeUser: PropTypes.func.isRequired

}
// const mapStateToProps = state => {
//   return {
//     isLoggedIn: !!state.getIn(['session', 'username']),
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    push: path => dispatch(push(path)),
    storeUser: ({ username, fullname }) => dispatch({
      type: SESSION_ACTIONS.SET_USER_DETAILS, 
      payload: { username, fullname }
    })
  };
};

export default connect(null, mapDispatchToProps)(LoginForm)
