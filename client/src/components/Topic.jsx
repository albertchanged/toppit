import React from 'react';
import { Card, Grid, Button, Image, Header,  Icon } from 'semantic-ui-react';
import http from 'axios';
import TopicDetailed from './TopicDetailed.jsx';
import UpvoteButton from './UpvoteButton.jsx';
import moment from 'moment';
import emojis from '../emojis';
import defaultPhoto from '../images/defaultPhoto.jpg';
 
import anonPhoto1 from '../images/anonPhoto1.png';
import anonPhoto2 from '../images/anonPhoto2.png';
import anonPhoto3 from '../images/anonPhoto3.png';
import anonPhoto4 from '../images/anonPhoto4.png';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import store from '../js/store.js';

const anonPhotos = [
  anonPhoto1,
  anonPhoto2,
  anonPhoto3,
  anonPhoto4
];

var colors = {};
colors[emojis[0].value] = 'yellow';
colors[emojis[1].value] = 'orange';
colors[emojis[2].value] = 'pink';
colors[emojis[3].value] = 'blue';
colors[emojis[4].value] = 'green';
colors[emojis[5].value] = 'red';
colors[emojis[6].value] = 'violet';
colors[emojis[7].value] = 'purple';
colors[emojis[8].value] = 'teal';

class Topic extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   currentUser: this.props.currentUser
    // };
    this.renderTopicDetailedView = this.renderTopicDetailedView.bind(this);
  }
  
  renderTopicDetailedView () {
    //react router something?
    this.props.history.push(`/topic/${this.props.topic._id}`);
    this.props.onDetailedTopic(this.props.topic);
  }

  render () {
    console.log('Topic ', this.props);
    let name, photoUrl;
    if (this.props.topic.authorId) {
      name = (this.props.topic.authorId && (this.props.topic.authorId.fullName || this.props.topic.authorId.username) || '');
      photoUrl = (this.props.topic.authorId && this.props.topic.authorId.photo) || defaultPhoto;
    } else {
      name = 'Anonymous';
      photoUrl = anonPhotos[Math.floor(Math.random() * anonPhotos.length)];
    }
    let color = colors[this.props.topic.emotion];
    let headline = /^([.]+)\s[.]+$/.exec(this.props.topic.emotion) + this.props.topic.headline 

    let meta = (
      <span>
        <span className='ui meta topicauthorname'>{name} | </span>
        <span className='ui meta topictime'>{moment(this.props.topic.timeStamp).fromNow()}</span>
      </span>
    );

    return (
      <Grid columns={2}>
        <Grid.Column verticalAlign='top' width={1}>
          <Image className='topicavatar' size='small'rounded src={photoUrl}/>
        </Grid.Column>
        <Grid.Column width={14}>
          <Card className='topiccard' color={color} fluid>
            <Card.Content onClick={this.renderTopicDetailedView} header={this.props.topic.headline} meta={meta}/>
            <Card.Content description={this.props.topic.description}/>
            <Card.Content extra>
              <UpvoteButton topic={this.props.topic} upvote={this.props.upVote}/>
              &nbsp;
              <a onClick={this.renderTopicDetailedView}>
                <Icon name='comments'/>
                {this.props.topic.commentId.length || 0} comments
              </a>
              &nbsp;&nbsp;
              {this.props.topic.emotion ?
                <Button compact color="blue" content={this.props.topic.emotion}/> : ''}
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    );
  }  
}

const mapStateToProps = (state) => ({
  topicList: state.topicList.topicList,
  currentUser: state.search.isLoading
});

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({  }, dispatch);
// };

export default connect(mapStateToProps)(Topic);
