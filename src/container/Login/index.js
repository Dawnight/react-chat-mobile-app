import React, {Component} from 'react';
import Logo from 'components/Logo/';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as UserCreateActions from 'store/User/UserCreateActions';
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleRegister() {
    this.props.history.push('/register');
  }
  
  handleChange(key, value) {
    this.setState({
      [key]: value,
    })
  }
  
  handleLogin () {
    const {userName, password} = this.state;
    let param = {};
    param.userName = userName;
    param.password = password;
    this.props.propsHandleLogin(param);
  }
  render() {
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/> : null}
        <Logo/>
        <h2>登录</h2>
        <WingBlank>
          <List>
            <p className="error-msg">{this.props.msg ? this.props.msg: null}</p>
            <InputItem type='text' onChange={k=>this.handleChange('userName', k)}>用户名</InputItem><WhiteSpace/>
            <InputItem type='text' onChange={k=>this.handleChange('password', k)}>密码</InputItem><WhiteSpace/>
          </List>
          <Button type="primary" onClick={this.handleLogin}>登录</Button>
          <WhiteSpace/>
          <Button type="primary" onClick={this.handleRegister}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userName: state.user.userName,
  password: state.user.password,
  redirectTo: state.user.redirectTo,
  msg: state.user.msg,
});

const mapDispatchToProps = dispatch => ({
  propsHandleLogin(param) {
    dispatch(UserCreateActions.login(param));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
