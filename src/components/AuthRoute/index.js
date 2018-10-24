import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as UserCreateActions from 'store/User/UserCreateActions';
import {getCommonApi, CODE_OK} from "src/utils";

class AuthRoute extends Component {
  componentDidMount() {
    const publicList = ['/login', '/register'];
    const {pathname} = this.props.location;
    console.log('pathname: ', pathname);
    if (publicList.indexOf(pathname) > -1) {
      return null;
    }
    getCommonApi('/user/info').then(response => {
      if (response.code === CODE_OK) {
        this.props.propsLoadData(response.data);
      } else {
        this.props.history.push('/login')
      }
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

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  propsLoadData(data) {
    dispatch(UserCreateActions.loadData(data));
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthRoute));
