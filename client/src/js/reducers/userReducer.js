export default function reducer(state = {
  user: {
    username: '',
    password: 0,
    confirm: 0,
    pwStrength: 0,
    pwStrengthColor: 'grey',
    pwStrengthPhrase: 'password strength',
    pwError: false,
    usernameError: false,
    signInError: '',
    signUpError: ''
  }
}, action) {
  switch (action.type) {
    case 'SET_USER_ID': {
      return {
        ...state,
        user: { ...state.user, id: action.payload }
      }
    }
    case 'SET_USER_NAME': {
      return {
        ...state,
        user: { ...state.user, username: action.payload }
      }
    }
    case 'SET_USER_PASSWORD': {
      return {
        ...state,
        user: { ...state.user, password: action.payload }
      }
    }
    case 'SET_USER_CONFIRM': {
      return {
        ...state,
        user: { ...state.user, confirm: action.payload }
      }
    }
    case 'SET_USER_PW_STRENGTH': {
      return {
        ...state,
        user: { ...state.user, pwStrength: action.payload }
      }
    }
    case 'SET_USER_PW_STRENGTH_COLOR': {
      return {
        ...state,
        user: { ...state.user, pwStrengthColor: action.payload }
      }
    }
    case 'SET_USER_PW_STRENGTH_PHRASE': {
      return {
        ...state,
        user: { ...state.user, pwStrengthPhrase: action.payload }
      }
    }
    case 'SET_USER_PW_ERROR': {
      return {
        ...state,
        user: { ...state.user, pwError: action.payload }
      }
    }
    case 'SET_USERNAME_ERROR': {
      return {
        ...state,
        user: { ...state.user, usernameError: action.payload }
      }
    }
    case 'SET_SIGN_IN_ERROR': {
      return {
        ...state,
        user: { ...state.user, signInError: action.payload }
      }
    }
    case 'SET_SIGN_UP_ERROR': {
      return {
        ...state,
        user: { ...state.user, signUpError: action.payload }
      }
    }
    default: 
      return state
  }
}