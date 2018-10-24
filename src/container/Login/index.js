import React, {Component} from 'react';
import Logo from 'components/Logo/';
import {connect} from 'react-redux';
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
    // TODO ,暂留
  }
  render() {
    return (
      <div>
        <Logo/>
        <h2>登录</h2>
        <WingBlank>
          <List>
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
  type: state.user.type,
  msg: state.user.msg,
  redirectTo: state.user.redirectTo,
});

const mapDispatchToProps = dispatch => ({
  propsHandleRegister() {
    dispatch();
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
