export default function reducer(state = {
  nav: {
    activeItem: 'home'
  }
}, action) {
  switch (action.type) {
    case 'SET_ACTIVE_ITEM': {
      return {
        ...state,
        nav: { ...state.nav, activeItem: action.payload }
      }
    }
    default: {
      return state
    }
  }
}