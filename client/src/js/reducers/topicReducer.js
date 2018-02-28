export default function reducer(state = {
  topic: {
    username: '',
    subtoppit: 'home',
    author: '',
    headline: '',
    description: '',
    emotion: '',
    anon: false,
    comments: [],
    commentText: '',
    upvoteStateColor: 'grey',
    displayNewTopic: false
  }
}, action) {
  switch (action.type) {
    case 'SET_TOPIC_USERNAME': {
      return {
        ...state,
        topic: { ...state.topic, username: action.payload }
      }
    }
    case 'SET_SUBTOPPIT_TO_POST_TO': {
      return {
        ...state,
        topic: { ...state.topic, subtoppit: action.payload }
      }
    }
    case 'SET_TOPIC_AUTHOR': {
      return {
        ...state,
        topic: { ...state.topic, author: action.payload }
      }
    }
    case 'DISPLAY_NEW_TOPIC': {
      return {
        ...state,
        topic: { ...state.topic, displayNewTopic: action.payload }
      }
    }
    case 'SET_HEADLINE': {
      return {
        ...state,
        topic: { ...state.topic, headline: action.payload }
      }
    }
    case 'SET_DESCRIPTION': {
      return {
        ...state,
        topic: { ...state.topic, description: action.payload }
      }
    }
    case 'SET_EMOTION': {
      return {
        ...state,
        topic: { ...state.topic, emotion: action.payload }
      }
    }
    case 'SET_ANON': {
      return {
        ...state,
        topic: { ...state.topic, anon: action.payload }
      }
    }
    case 'SET_COMMENT_TEXT': {
      return {
        ...state,
        topic: { ...state.topic, commentText: action.payload }
      }
    }
    case 'ADD_COMMENT': {
      return {
        ...state,
        topic: { ...state.topic, comments: state.topic.comments.concat(action.payload) }
      }
    }
    case 'SET_UPVOTE_STATE_COLOR': {
      return {
        ...state,
        topic: { ...state.topic, upvoteStateColor: action.payload }
      }
    }
    default: {
      return state
    }
  }
}