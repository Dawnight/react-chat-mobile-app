import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as ChatCreateActions from 'store/Chat/ChatCreateActions';
import UserCard from 'components/UserCard/';

class Boss extends Component {
  render() {
    return <UserCard userList={this.props.userList}/>;
  }
  
  componentDidMount () {
    let param = {};
    param.type = 'genius';
    this.props.propsGetUserList(param);
  }
}

const mapStateToProps = state => ({
  userList: state.chat.userList,
});

const mapDispatchToProps = dispatch => ({
  propsGetUserList (param) {
    dispatch(ChatCreateActions.getUserListProps(param));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Boss);