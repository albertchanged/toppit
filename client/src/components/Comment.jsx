import React from 'react';
import { Button, Comment, Form, Card, Header } from 'semantic-ui-react';
import moment from 'moment';
import defaultPhoto from '../images/defaultPhoto.jpg';
import store from '../js/store.js';
import http from 'axios';
import { connect } from 'react-redux';
import CommentList from './CommentList.jsx';
import { bindActionCreators } from 'redux';
import { setReplyCommentText, setCommentId, setShowReply, setNestedComments, setNestedCommentsCopy, addNestedToFront } from '../js/actions/commentActions';

class MyComment extends React.Component {
  constructor(props) {
    super(props);
    this.onReply = this.onReply.bind(this);
  }
  componentDidMount() {
    this.getAllComments();
  }
  getAllComments() {
    let topicId = store.getState().topicList.selectedTopic._id;
    let author = this.props.comment.authorId.username || this.props.comment.authorUsername;
    let text = this.props.comment.text;
    let nestedComments = [];

    http.get(`/api/comments/${topicId}/${author}`, { params: { text: this.props.comment.text }})
      .then((comment) => {
        console.log('Got the comment!', comment);
        this.props.setCommentId(comment.data._id);
        
        if (this.props.comment.comments.length > 0) {
          let promises = this.props.comment.comments.map((commentId) => {
            return http.get(`/api/comments/${commentId}`)
              .then((nested) => {
                console.log('This is the nested comment', nested.data);
                this.props.addNestedToFront(nested.data);
                comment = nested.data;
                return comment;
              })
              .catch((err) => {
                console.error(err);
              });
          });
          Promise.all(promises)
            .then((data) => {
              this.props.setNestedCommentsCopy(data);
            })
            .catch((err) => {
              console.error(err);
            });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  handleInputText(e, { value }) {
    this.props.setReplyCommentText(value);
  }
  toggleShowParentReply() {
    let comment = store.getState().comment;
    this.props.setShowReply(!comment.showReply);
  }
  toggleShowNestedReply() {
    let comment = store.getState().comment;
    this.props.setShowReply(!comment.showReply);
  }
  onReply(text) {
    let topicId = store.getState().topicList.selectedTopic._id;
    let comment = {
      text: text,
      timeStamp: new Date(),
      authorId: store.getState().user.user.id,
      authorUsername: store.getState().user.user.username,
      parentId: this.props.comment._id,
      comments: []
    };
    http.post(`/api/topic/${topicId}/${this.props.comment._id}`, comment)
      .then((data) => {
        console.log('Data', data);
        this.props.addNestedToFront(comment);
        this.getAllComments();
        this.props.setShowReply(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  submitComment(commentText) {
    var newComment = {
      authorId: store.getState().topicList.selectedTopic.authorId,
      topicId: this.props.topicId,
      text: commentText,
      timeStamp: new Date(),
      username: store.getState().user.user.username,
      upvotes: 0
    };
    //http request to database to add comment to topic
    http.post(`/api/topic/${this.props.topicId}`, newComment)
      .then( (result) => {
        this.props.addCommentToFront(newComment);
        this.getAllTopicComments();
      })
      .catch( (error) => {
        console.error(error);
      });
  } 
  render() {
    let comment = this.props.comment;
    let parent = store.getState().comment;
    let nested = store.getState().comment.nestedCommentsCopy;
    let nestedComments = [];
    return (
      <div>
        <Comment.Group>
          <Comment>
            <Comment.Avatar className='commentuser' src={defaultPhoto} />
            <Comment.Content>
              <Comment.Author as='a'>{this.props.comment.authorId.username || this.props.comment.authorUsername}</Comment.Author>
              <Comment.Metadata>
                <div>{moment(this.props.comment.timeStamp).fromNow()}</div>
              </Comment.Metadata>
              <Comment.Text>{this.props.comment.text}</Comment.Text>
              <Comment.Actions>
                <Comment.Action onClick={this.toggleShowParentReply.bind(this)}>Reply</Comment.Action>
              </Comment.Actions>
              {
                (parent.showReply) &&
                  <Form reply className="replyTextArea">
                    <Form.TextArea onChange={this.handleInputText.bind(this)} />
                    <Button onClick={() => this.onReply(store.getState().comment.commentText)} content='Add Reply' labelPosition='left' icon='edit' primary />
                  </Form>
              }
              {
                this.props.comment.comments && this.props.comment.comments.length > 0 && nested.map((child, index) => {
                  console.log(child, index);
                  return (
                    <Comment.Group key={index}>
                      <Comment>
                        <Comment.Avatar src={defaultPhoto} />
                        <Comment.Content>
                          <Comment.Author as='a'>{child.authorUsername}</Comment.Author>
                          <Comment.Metadata>
                            <div>{moment(child.timeStamp).fromNow()}</div>
                          </Comment.Metadata>
                          <Comment.Text>
                            {child.text}
                          </Comment.Text>
                          <Comment.Actions>
                            <Comment.Action onClick={this.toggleShowNestedReply.bind(this)}>Reply</Comment.Action>
                          </Comment.Actions>
                          {
                            (parent.showReply) &&
                            <Form reply className="replyTextArea">
                              <Form.TextArea onChange={this.handleInputText.bind(this)} />
                              <Button onClick={() => this.onReply(store.getState().comment.commentText)} content='Add Reply' labelPosition='left' icon='edit' primary />
                            </Form>
                          }
                        </Comment.Content>
                      </Comment>
                    </Comment.Group>
                  );
                })
              }
              {
                (store.getState().comment.showReply) &&
                <Form reply className="replyTextArea">
                  <Form.TextArea onChange={this.handleInputText.bind(this)} />
                  <Button onClick={() => this.onReply(store.getState().comment.commentText)} content='Add Reply' labelPosition='left' icon='edit' primary />
                </Form>
              }
            </Comment.Content>
          </Comment>
        </Comment.Group>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  commentText: state.comment.commentText,
  commentId: state.comment.commentId,
  showReply: state.comment.showReply,
  nestedComments: state.comment.nestedComments,
  nestedCommentsCopy: state.comment.nestedCommentsCopy
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setReplyCommentText, setCommentId, setShowReply, setNestedComments, setNestedCommentsCopy, addNestedToFront }, dispatch);
};

var NestedComment = connect(mapStateToProps, mapDispatchToProps)(MyComment);
export default NestedComment;