import React, {Component, Fragment} from 'react';
import store from './store/';
import './static/css/common.css';
import {Provider} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';

import AuthRoute from 'components/AuthRoute';
import Login from 'container/Login/';
import Register from 'container/Register/';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Fragment>
            <AuthRoute/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
          </Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
