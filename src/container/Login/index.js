import React, {Component} from 'react';
import Logo from 'components/Logo/';

import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';

class Login extends Component {

  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister() {
    this.props.history.push('/register');
  }

  render() {
    return (
      <div>
        <Logo/>
        <h2>登录</h2>
        <WingBlank>
          <List>
            <InputItem>用户</InputItem><WhiteSpace/>
            <InputItem>密码</InputItem>
          </List>
          <Button type="primary">登录</Button>
          <WhiteSpace/>
          <Button type="primary" onClick={this.handleRegister}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login;
