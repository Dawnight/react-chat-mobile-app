import React, {Component, Fragment} from 'react';
import store from './store/';
import './static/css/common.css';
import './config';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import AuthRoute from 'components/AuthRoute';
import Login from 'container/Login/';
import Register from 'container/Register/';
import BossInfo from 'container/BossInfo/';
import GeniusInfo from 'container/GeniusInfo/';
import Dashboard from 'container/Dashboard/';
import Chat from 'container/Chat/';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    }
  }
  
  componentDidCatch(err, info) {
    console.log(err);
    console.log(info);
    this.setState({
      hasError: true
    })
  }
  
  render() {
    return this.state.hasError? '<h2>页面出错了</h2>' :(
      <Provider store={store}>
        <BrowserRouter>
          <Fragment>
            <AuthRoute/>
            <Switch>
              <Route path="/bossinfo" component={BossInfo}/>
              <Route path="/geniusinfo" component={GeniusInfo}/>
              <Route path="/login" component={Login}/>
              <Route path="/register" component={Register}/>
              <Route path="/chat/:user" component={Chat}/>
              <Route component={Dashboard}/>
            </Switch>
          </Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
