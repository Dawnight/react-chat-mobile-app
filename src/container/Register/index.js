import React, {Component} from 'react';
import Logo from 'components/Logo/';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as UserCreateActions from 'store/User/UserCreateActions';
import {List, InputItem, Radio, WhiteSpace, Button} from 'antd-mobile';
import UserForm from 'components/UserForm/';

class Register extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      type: 'genius'
    };
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }
  
  // 切换到登录页面
  handleLogin() {
    this.props.history.push('/login');
  }
  
  // 注册提交信息
  handleRegister() {
    const param = Object.assign(this.props.state, {type: this.state.type});
    this.props.propsHandleRegister(param);
  }
  
  handleRadioChange(type) {
    this.setState({
      type,
    });
  }
    
    render() {
    const RadioItem = Radio.RadioItem;
    const userType = [
      {id: 1, type: 'genius', label: '牛人'},
      {id: 2, type: 'boss', label: 'BOSS'},
    ];
    
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
        <Logo/>
        <h2>注册</h2>
        <List>
          <p className="error-msg">{this.props.msg ? this.props.msg: null}</p>
          <InputItem type='text' onChange={k=>this.props.handleChange('userName', k)}>用户名</InputItem><WhiteSpace/>
          <InputItem type='text' onChange={k=>this.props.handleChange('password', k)}>密码</InputItem><WhiteSpace/>
          <InputItem type='text' onChange={k=>this.props.handleChange('rePassword', k)}>确认密码</InputItem><WhiteSpace/>
          {
            userType.map(item => (
              <RadioItem key={item.id} checked={this.state.type === item.type} onChange={() => {
                this.handleRadioChange(item.type)
              }}>{item.label}</RadioItem>
            ))
          }
          <Button type="primary" onClick={this.handleRegister}>注册</Button><WhiteSpace/>
          <Button type="primary" onClick={this.handleLogin}>登录</Button><WhiteSpace/>
        </List>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  type: state.user.type,
  msg: state.user.msg,
  redirectTo: state.user.redirectTo,
});

const mapDispatchToProps = dispatch => ({
  propsHandleRegister(param) {
    dispatch(UserCreateActions.register(param));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm(Register));
