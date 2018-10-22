import React, {Component} from 'react';
import {getCommonApi} from "src/utils";

class AuthRoute extends Component {
  componentDidMount() {
    getCommonApi('/user/info').then(response => {
      console.log(response);
    })
  }

  render() {
    return (
      <div>
        auth route
      </div>
    )
  }
}

export default AuthRoute;
