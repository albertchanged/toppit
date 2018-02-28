export default function reducer(state = {
  subtoppitList: [],
  fullTopicList: [],
  searchedTopicList: [],
  filteredTopicList: [],
  selectedTopic: {},
  detailedTopic: {
    authorId: '',
    commentId: []
  },
  commentList: []
}, action) {
  switch (action.type) {
    case 'ADD_TOPIC_TO_LIST': {
      return {
        ...state,
        fullTopicList: state.fullTopicList.concat(action.payload)
      }
    }
    case 'SET_SUBTOPPIT_TOPICS': {
      console.log('subtoppit list in reducer...', action.payload);
      return {
        ...state,
        subtoppitList: action.payload
      }
    }
    case 'ADD_TOPIC_TO_LIST_FRONT': {
      return {
        ...state,
        fullTopicList: [action.payload].concat(state.fullTopicList)
      }
    }
    case 'CHANGE_SEARCHED_LIST': {
      return {
        ...state,
        searchedTopicList: action.payload
      }
    }
    case 'CHANGE_FILTERED_LIST': {
      return {
        ...state,
        filteredTopicList: action.payload
      }
    }
    case 'SET_SELECTED_TOPIC': {
      return {
        ...state,
        selectedTopic: action.payload
      }
    }
    case 'SET_DETAILED_TOPIC': {
      return {
        ...state,
        detailedTopic: action.payload
      }
    }
    case 'SET_COMMENT_LIST': {
      return {
        ...state,
        detailedTopic: { 
          ...state.detailedTopic, 
          commentId: action.payload
        }
      }
    }
    case 'SET_TOPIC_COMMENTS': {
      return {
        ...state,
        commentList: action.payload
      }
    }
    case 'ADD_COMMENT': {
      return {
        ...state,
        selectedTopic: { 
          ...state.topicList, 
          commentId: state.selectedTopic.commentId.concat(action.payload) 
        }
      }
    }
    case 'ADD_COMMENT_TO_FRONT': {
      return {
        ...state,
        commentList: state.commentList.concat(action.payload)
      }
    }
    default: {
      return state
    }
  }
}