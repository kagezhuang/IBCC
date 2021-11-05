import React, { useState, useEffect } from 'react';
import { bool, func } from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { SESSION_ACTIONS } from '../actions/types';
import AppToolbar from '../components/AppToolbar';
import CustomizedSnackbar from '../components/CustomizedSnackbar';

function Main({ isLoggedIn, logout, push }) {

  const [snackbarOpen, setSnackbarOpen] = useState(() => {
    if (isLoggedIn) return true;
    return false;
  });
  const [loggedIn, setLoggedIn] = useState(isLoggedIn)
  useEffect(() => {
    if (!isLoggedIn) setLoggedIn(false);
    else setLoggedIn(true);
    
  }, [loggedIn, isLoggedIn])
  
  function handleSnackbarClose() {
    setSnackbarOpen(false);
  }
  const handleLogin = () => {
    push('/login');
  };

  return (
    <div className='main'>
      <AppToolbar
        isLoggedIn={loggedIn}
        onLogin={handleLogin}
        onLogout={logout}
      />
      <CustomizedSnackbar 
        open={ snackbarOpen }
        kind={ 'success' } 
        message={ 'Login successfully!'} 
        handleClose={ handleSnackbarClose }
      />
    </div>
    
  );
}

Main.propTypes = {
  isLoggedIn: bool.isRequired,
  logout: func.isRequired,
  push: func.isRequired
};

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.getIn(['session', 'username'])
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(SESSION_ACTIONS.LOGOUT),
    push: path => dispatch(push(path))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
