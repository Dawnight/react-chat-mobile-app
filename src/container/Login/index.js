import React, {Component} from 'react';
import Logo from 'components/Logo/';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as UserCreateActions from 'store/User/UserCreateActions';
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';
import UserForm from 'components/UserForm/';

class Login extends Component {

  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleRegister() {
    this.props.history.push('/register');
  }

  handleLogin () {
    this.props.propsHandleLogin(this.props.state);
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
            <InputItem type='text' onChange={k=>this.props.handleChange('userName', k)}>用户名</InputItem><WhiteSpace/>
            <InputItem type='text' onChange={k=>this.props.handleChange('password', k)}>密码</InputItem><WhiteSpace/>
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
  redirectTo: state.user.redirectTo,
  msg: state.user.msg,
});

const mapDispatchToProps = dispatch => ({
  propsHandleLogin(param) {
    dispatch(UserCreateActions.login(param));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserForm(Login));
