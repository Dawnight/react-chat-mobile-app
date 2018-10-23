import React, {Component} from 'react';
import Logo from 'components/Logo/';

import {List, InputItem, Radio, WhiteSpace, Button} from 'antd-mobile';

class Register extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      type: 'genius'
    };
    
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }
  
  // 切换到登录页面
  handleLogin() {
    this.props.history.push('/login');
  }
  
  // 选择身份，修改state的值
  handleRadioChange(type) {
    this.setState({
      type: type,
    });
  }
  
  // 注册提交信息
  handleRegister () {
    
  }
  render() {
    const RadioItem = Radio.RadioItem;
    let type = this.state.type;
    const userType = [
      {id: 1, type: 'genius', label: '牛人'},
      {id: 2, type: 'boss', label: 'BOSS'},
    ];
    
    return (
      <div>
        <Logo/>
        <h2>注册</h2>
        <List>
          <InputItem>用户名</InputItem><WhiteSpace/>
          <InputItem>密码</InputItem><WhiteSpace/>
          <InputItem>确认密码</InputItem><WhiteSpace/>
          {
            userType.map(item => (
              <RadioItem key={item.id} checked={type === item.type} onChange={() => {
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

export default Register;
