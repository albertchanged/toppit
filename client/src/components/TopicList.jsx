import React from 'react';
import Topic from './Topic.jsx';
import {Container} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import store from '../js/store.js';

class TopicList extends React.Component {
  constructor(props) {
    super(props);
    this.subtoppit = this.props.match.params.subtoppit;
    this.topicList = [];
  }  

  componentDidMount() {
    this.props.getAllTopicsInSubtoppit(this.subtoppit);
  }  

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.subtoppit && this.props.match.params.subtoppit !== nextProps.match.params.subtoppit) {
      this.subtoppit = nextProps.match.params.subtoppit;
      this.props.getAllTopicsInSubtoppit(this.subtoppit);
    }
  }

  render() {
    // this.subtoppit = this.props.match.params.subtoppit;
    if (!this.props.match.params.subtoppit) {
      this.subtoppit = '';
    }
    if (this.subtoppit && this.props.subtoppitList[0]) {
      this.topicList = this.props.subtoppitList;
    } else if (this.subtoppit && !this.props.subtoppitList[0]) {
      this.topicList = [];
    } else {
      this.topicList = this.props.filteredTopicList;
    }
    return (
      <Container>
        {this.topicList[0] ? this.topicList.map((topic, index) => (
          <Topic {...this.props}
            topic={topic} 
            key={index} 
            upVote={this.props.upVote}
            onDetailedTopic={this.props.onDetailedTopic}
          />)) : <div></div>}
      </Container>
    );
  }  
}


const mapStateToProps = (state) => ({
  filteredTopicList: state.topicList.filteredTopicList,
  subtoppitList: state.topicList.subtoppitList
});

export default connect(mapStateToProps)(TopicList);


