const usernameValidation = (username) => {

  if (!username) {
    return {
      username, 
      isValid: false, 
      error: 'Username cannot be empty.' 
    }
  }
  if (username.length < 6) {
    return { 
      username, 
      inValid: false, 
      error: 'Username at least 6 characters.' 
    }
  }
  if (username.match(/^[a-zA-Z0-9]+$/i)) { 
    return { 
      username,
      isValid: true, 
      error: '' 
    }
  }
  return { 
    username,
    isValid: false, 
    error: 'Only letters and numbers allowed.'}
}
const passwordValidation = (password) => {

  if (!password) {
    return { 
      password, 
      isValid: false, 
      error: 'Password cannot be empty.' 
    }
  }
  if (password.length < 6) {
    return {
      password,
      isValid: false,
      error: 'Password at least 6 characters.'
    }
  }
  if (password.match(/^[a-zA-Z0-9]+$/i)) { 
    return { 
      password, 
      isValid: true, 
      error: '' 
    }
  }
  return { 
    password,
    isValid: false, 
    error: 'Only letters and numbers allowed.'}
}

export {
  usernameValidation,
  passwordValidation
}
