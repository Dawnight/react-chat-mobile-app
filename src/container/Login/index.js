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
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.getUserNameValue = this.getUserNameValue.bind(this);
    this.getPasswordValue = this.getPasswordValue.bind(this);
  }

  handleRegister() {
    this.props.history.push('/register');
  }
  
  getUserNameValue(userName) {
    this.setState({
      userName,
    });
  }
  
  getPasswordValue(password) {
    this.setState({
      password,
    });
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
            <InputItem type='text' value={this.state.userName}
                       onChange={this.getUserNameValue}>用户名</InputItem><WhiteSpace/>
            <InputItem type='text' value={this.state.password}
                       onChange={this.getPasswordValue}>密码</InputItem><WhiteSpace/>
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
