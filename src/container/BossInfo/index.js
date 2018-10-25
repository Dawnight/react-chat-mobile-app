import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import AvatarSelector from 'components/AvatarSelector/';
import * as UserCreateActions from 'store/User/UserCreateActions';
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile';

class BossInfo extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      company: '',
      salary: '',
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
    const {title, company, salary, desc, avatar} = this.state;
    let param = {};
    param.title = title;
    param.company = company;
    param.salary = salary;
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
        <NavBar mode="dark">BOSS 完善信息页面</NavBar>
        <AvatarSelector handleSelectAvatar={this.handleSelectAvatar}/>
        <InputItem onChange={k => this.handleOnChange('title', k)}>招聘职位</InputItem>
        <InputItem onChange={k => this.handleOnChange('company', k)}>公司名称</InputItem>
        <InputItem onChange={k => this.handleOnChange('salary', k)}>职位薪资</InputItem>
        <TextareaItem rows={3} autoHeight title='职位要求' onChange={k => this.handleOnChange('desc', k)}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(BossInfo);
