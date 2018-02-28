export const setCommentId = (commentId) => {
  return {
    type: 'SET_COMMENT_ID',
    payload: commentId
  };
};
export const setReplyCommentText = (commentText) => {
  return {
    type: 'SET_REPLY_TEXT',
    payload: commentText
  };
};
export const setShowReply = (showReply) => {
  //change filter
  return {
    type: 'SET_SHOW_REPLY',
    payload: showReply
  };
};
export const setNewNested = (nested) => {
  return {
    type: 'SET_NESTED_COMMENTS',
    payload: nested
  };
};
export const setNestedCommentsCopy = (copy) => {
  return {
    type: 'SET_NESTED_COMMENTS_COPY',
    payload: copy
  };
};
export const addNestedToFront = (nested) => {
  return {
    type: 'ADD_NESTED_TO_FRONT',
    payload: nested
  };
};
export const setContainsObj = (containsObj) => {
  return {
    type: 'SET_CONTAINS_OBJ',
    payload: containsObj
  };
};