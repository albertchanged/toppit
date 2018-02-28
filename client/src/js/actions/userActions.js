export const setUserId = (id) => {
  return {
    type: 'SET_USER_ID',
    payload: id
  };
};
export const setUsername = (username) => {
  return {
    type: 'SET_USER_NAME',
    payload: username
  };
};
export const setUserPassword = (password) => {
  return {
    type: 'SET_USER_PASSWORD',
    payload: password
  };
};
export const setUserConfirm = (confirm) => {
  return {
    type: 'SET_USER_CONFIRM',
    payload: confirm
  };
};
export const setUserPwStrength = (pwStrength) => {
  return {
    type: 'SET_USER_PW_STRENGTH',
    payload: pwStrength
  };
};
export const setUserPwStrengthColor = (pwStrengthColor) => {
  return {
    type: 'SET_USER_PW_STRENGTH_COLOR',
    payload: pwStrengthColor
  };
};
export const setUserPwStrengthPhrase = (pwStrengthPhrase) => {
  return {
    type: 'SET_USER_PW_STRENGTH_PHRASE',
    payload: pwStrengthPhrase
  };
};
export const setUserPwError = (pwError) => {
  return {
    type: 'SET_USER_PW_ERROR',
    payload: pwError
  };
};
export const setUsernameError = (usernameError) => {
  return {
    type: 'SET_USERNAME_ERROR',
    payload: usernameError
  };
};
export const setSignInError = (signInError) => {
  return {
    type: 'SET_SIGN_IN_ERROR',
    payload: signInError
  };
};
export const setSignUpError = (signUpError) => {
  return {
    type: 'SET_SIGN_UP_ERROR',
    payload: signUpError
  };
};