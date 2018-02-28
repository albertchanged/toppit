import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import Login from './components/Login.jsx';
import { Provider } from 'react-redux';
import store from './js/store.js';
import './styles/styles.css';
import { BrowserRouter as Router, Route, Switch, browserHistory } from 'react-router-dom';

console.log('Rendering Main Page');

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Switch>
        <Route exact path='/login' component={Login}/>
        <Route path='/' component={App}/>
      </Switch>
    </Router>
  </Provider>), document.getElementById('app'));
