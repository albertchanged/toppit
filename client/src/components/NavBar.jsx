import React from 'react';
import { Input, Menu, Image, Button, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Logo from '../images/logo.png';
import defaultPhoto from '../images/defaultPhoto.jpg';
import Search from './Search.jsx';
import store from '../js/store.js';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    
    this.onHome = this.onHome.bind(this);
    this.onNewTopic = this.onNewTopic.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(e, {value}) {
    console.log(e);
    console.log('data ' + value);
  }

  onHome() {
    this.props.history.push('/');
    document.querySelector(".dropdown .text").innerHTML = '';
    this.props.home();
  }

  onNewTopic() {
    this.props.history.push('/share');
    this.props.createNewTopic();
  }

  handleChatClick() {
    this.props.history.push('/chat');
  }

  selectSubtoppit(e, {value}) {
    document.querySelector(".dropdown .text").innerHTML = '';
    this.props.history.push('/t/' + {value}.value);
  }

  render() {
    // let name = (this.props.currentUser && (this.props.currentUser.fullName || this.props.currentUser.username) || '');
    let name = store.getState().user.user.username;
    let photoUrl = (this.props.currentUser && this.props.currentUser.photo) || defaultPhoto;
    const trigger = (
      <span>
        <Image avatar src={photoUrl} /> {name}
      </span>
    );
    let subtoppits = [
      {value: 'introductions', text: 'introductions'},
      {value: 'chatter', text: 'chatter'},
      {value: 'legacyProject', text: 'legacyProject'}, 
      {value: 'greenFieldProject', text: 'greenFieldProject'},
      {value: 'cats', text: 'cats'},
      {value: 'dogs', text: 'dogs'},
    ];

    return (
      <Menu attached='top' className='nav'>
        <Menu.Item 
          name='home' 
          onClick={this.onHome} 
        >
          <img className="logo" src={Logo} />
        </Menu.Item>
        <Menu.Item>
          <Button primary onClick={this.handleChatClick.bind(this)}>Chat</Button>
        </Menu.Item>
        <Menu.Item id="subtoppitNavigationContainer">
          <Dropdown placeholder='Select subtoppit' id="subtoppitNavigation" onChange={this.selectSubtoppit.bind(this)} fluid search selection options={subtoppits} />
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Button primary onClick={this.onNewTopic}>Create Topic</Button>
          </Menu.Item>
          <Menu.Item>
            <Search onSearch={this.props.onSearch}/>
          </Menu.Item>
          <Dropdown trigger={trigger} item simple>
            <Dropdown.Menu>
              <Dropdown.Item as='a' href='/login' >Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    );
  }
}

