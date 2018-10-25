import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import AvatarSelector from 'components/AvatarSelector/';
import * as UserCreateActions from 'store/User/UserCreateActions';
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile';

class GeniusInfo extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      desc: '',
      avatar: '',
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSelectAvatar = this.handleSelectAvatar.bind(this);
    this.handleUpdateInfo = this.handleUpdateInfo.bind(this);
  }
  
  handleOnChange(key, value) {
    this.setState({
      [key]: value,
    })
  }
  
  handleSelectAvatar(e){
    this.setState({
      avatar: e
    });
  }
  
  handleUpdateInfo () {
    const {title, desc, avatar} = this.state;
    let param = {};
    param.title = title;
    param.desc = desc;
    param.avatar = avatar;
    this.props.propsHandleUpdateInfo(param);
  }
  
  render() {
    const path = this.props.location.pathname;
    const redirectTo = this.props.redirectTo;
    return (
      <div>
        {redirectTo && redirectTo !== path ? <Redirect to={this.props.redirectTo}/> : null }
        <NavBar mode="dark">牛人 完善信息页面</NavBar>
        <AvatarSelector handleSelectAvatar={this.handleSelectAvatar}/>
        <InputItem onChange={k => this.handleOnChange('title', k)}>求职职位</InputItem>
        <TextareaItem rows={3} autoHeight title='个人简介' onChange={k => this.handleOnChange('desc', k)}/>
        <Button type="primary" onClick={this.handleUpdateInfo}>保存</Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userName: state.user.userName,
  redirectTo: state.user.redirectTo,
});

const mapDispatchToProps = dispatch => ({
  propsHandleUpdateInfo(param) {
    dispatch(UserCreateActions.updateInfo(param));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(GeniusInfo);
