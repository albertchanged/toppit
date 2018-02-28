export const setTopicUsername = (username) => {
  return {
    type: 'SET_TOPIC_USERNAME',
    payload: username
  };
};
export const displayNewTopic = (display) => {
  return {
    type: 'DISPLAY_NEW_TOPIC',
    payload: display
  };
};
export const setHeadline = (headline) => {
  return {
    type: 'SET_HEADLINE',
    payload: headline
  };
};
export const setDescription = (description) => {
  return {
    type: 'SET_DESCRIPTION',
    payload: description
  };
};
export const setEmotion = (emotion) => {
  return {
    type: 'SET_EMOTION',
    payload: emotion
  };
};
export const setSubtoppitToPostTo = (subtoppit) => {
  return {
    type: 'SET_SUBTOPPIT_TO_POST_TO',
    payload: subtoppit
  };
};
export const setAnon = (anon) => {
  return {
    type: 'SET_ANON',
    payload: anon
  };
};
export const addComment = (comment) => {
  return {
    type: 'ADD_COMMENT',
    payload: comment
  };
};
export const setCommentText = (commentText) => {
  return {
    type: 'SET_COMMENT_TEXT',
    payload: commentText
  };
};
export const setUpvoteStateColor = (upvoteStateColor) => {
  return {
    type: 'SET_UPVOTE_COLOR',
    payload: upvoteStateColor
  };
};
