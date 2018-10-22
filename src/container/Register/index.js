import React, {Component} from 'react';
import Logo from 'components/Logo/';

import {List, InputItem, Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      type: 'genius',
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    this.props.history.push('/login');
  }

  render() {
    const RadioItem = Radio.RadioItem;

    return (
      <div>
        <Logo/>
        <h2>注册</h2>
        <List>
          <InputItem>用户名</InputItem><WhiteSpace/>
          <InputItem>密码</InputItem><WhiteSpace/>
          <InputItem>确认密码</InputItem><WhiteSpace/>
          <RadioItem type={() => {
            this.setState({type: 'genius'})
          }}>牛人</RadioItem>
          <RadioItem type={() => {
            this.setState({type: 'boss'})
          }}>BOSS</RadioItem>
          <Button type="primary">注册</Button>
        </List>
      </div>
    )
  }
}

export default Register;
