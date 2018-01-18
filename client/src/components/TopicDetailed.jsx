import React from 'react';
import {Container, Item, Header, Grid, Image, Card, Icon, Button, Form} from 'semantic-ui-react';
import http from 'axios';
import CommentList from './CommentList.jsx';
import UpvoteButton from './UpvoteButton.jsx';
import {exampleCommentData} from '../exampleData.js';
import {exampleData} from '../exampleData.js';
import moment from 'moment';
import defaultPhoto from '../images/defaultPhoto.jpg';
import anonPhoto1 from '../images/anonPhoto1.png';
import anonPhoto2 from '../images/anonPhoto2.png';
import anonPhoto3 from '../images/anonPhoto3.png';
import anonPhoto4 from '../images/anonPhoto4.png';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import store from '../js/store.js';
import { setCommentText } from '../js/actions/topicActions';
import { setDetailedTopic, setDetailedCommentList, addComment } from '../js/actions/topicListActions.js';

const anonPhotos = [
  anonPhoto1,
  anonPhoto2,
  anonPhoto3,
  anonPhoto4
];

class TopicDetailed extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   // currentUser: this.props.currentUser,
    //   topic: null,
    //   commentText: '',
    //   upvoteStateColor: 'grey'
    // };
  }

  componentDidMount() {
    http.get(`/api/topic/${this.props.topicId}`)

      .then(({data}) => {
        console.log('getting topic', data);
        console.log(data.headline);
        console.log(data.description);
        console.log(data.emotion);

        this.props.setDetailedTopic(data);
        
        // this.setState({
        //   topic: data,
        //   commentText: '',
        //   comments: data.commentId
        // });

      })

      .catch((err) => {
        console.log(err.message);
      });
  }

  handleInputText(e, {value} ) {
    this.props.setCommentText(value);
    // this.setState({
    //   commentText: e.target.value
    // })
  }

  submitComment(commentText) {
    var newComment = {
      authorId: store.getState().user.user.id,
      text: commentText,
      timeStamp: new Date(),
      upvotes: 0
    };
    //http request to database to add comment to topic

    http.post(`/api/topic/${this.props.topicId}`, newComment)
      .then( (result) => {
        console.log('success!', result);
        newComment.description = result.data.text;
      })
      .catch( (error) => {
        console.log(error);
      });

    var allComments = store.getState().topicList.detailedTopic.commentId;
    console.log(allComments);
    // allComments.push(newComment);
    // this.props.setCommentList(allComments);
    // this.props.setCommentText('');
    // this.setState({
    //   comments: allComments,
    //   commentText: ''
    // })
  }  
  
  render() {
    
    let name, photoUrl;
    let selectedTopic = store.getState().topicList.selectedTopic;
    // let topic = store.getState().topic.topic;
    console.log(store.getState().topicList);
    // console.log(topic.headline);
    // console.log(topic.description);
    // if (!topic) {
    //   return null;
    // }

    // const topic = store.get.topic;

    if (selectedTopic.authorId) {
      name = (selectedTopic.authorId && (selectedTopic.authorId.fullName || selectedTopic.authorId.username) || '');
      photoUrl = (selectedTopic.authorId && selectedTopic.authorId.photo) || defaultPhoto;
    } else {
      name = 'Anonymous';
      photoUrl = anonPhotos[Math.floor(Math.random() * anonPhotos.length)];
    }

    let meta = (
      <span>
        <span className='ui meta topicauthorname'>{name} | </span>
        <span className='ui meta topictime'>{moment(selectedTopic.timeStamp).fromNow()}</span>
      </span>
    );


    return (
      <div>
        <Container className='detailedtopic'>   
          <Grid columns={2}>  
            <Grid.Row> 
              <Grid.Column verticalAlign='top' width={1}>
                <Image className='topicavatar' size='small' rounded src={photoUrl}/>
              </Grid.Column>
              <Grid.Column width={14}>
                <Card color="teal" fluid>
                  <Card.Content header={selectedTopic.headline} meta={meta}/>
                  <Card.Content description={selectedTopic.description} />
                  <Card.Content extra>
                    <UpvoteButton 
                      topic={selectedTopic} 
                      // upvote={this.props.upvote} 
                      currentUser={store.getState().user.user.id}/>            
                    <Icon name='comments' />
                    {/* {this.state.comments.length || 0} comments */}
                    &nbsp;&nbsp;
                    {selectedTopic.emotion ?
                      <Button compact color="blue" content={selectedTopic.emotion}/> : ''}                
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={1}>
              </Grid.Column>
              <Grid.Column width={14}>
                <div>
                  &nbsp;&nbsp;
                  {/* <CommentList
                    handleCommentSubmitClick={this.submitComment.bind(this)}
                    comments={topic.comments} 
                  /> */}
                </div>
                <Container className='newcommentcontainer' text>
                  <Item>
                    <Form reply>
                      <Form.TextArea 
                        // value={this.state.commentText} 
                        onChange={this.handleInputText.bind(this)} 
                      />
                      <Button
                        onClick={() => this.submitComment(store.getState().topic.topic.commentText)} content="Add Reply" labelPosition='left' icon='edit' primary
                      />
                    </Form>
                  </Item>
                </Container>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>   
      </div>  
    );
  }
}


const mapStateToProps = (state) => ({
  selectedTopic: state.topicList.selectedTopic,
  commentText: state.topic.commentText,
  comments: state.topic.comments
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ 
    setDetailedTopic, setCommentText, addComment, setDetailedCommentList }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicDetailed);