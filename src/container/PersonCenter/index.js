import React, {Component} from 'react';
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile';
import * as UserCreateActions from 'store/User/UserCreateActions';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import BrowserCookies from 'browser-cookies';

class PersonCenter extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }
  
  handleLogout() {
    const {propsLogoutSubmit} = this.props;
    const alert = Modal.alert;
    alert('注销', '确认退出登录吗？', [
      {text: '取消', onPress: () => console.log('cancel')},
      {text: '确认', onPress: () => {console.log('删除cookie');propsLogoutSubmit();}},
    ]);
  }
  
  render() {
    const {userName, avatar, type, company, title, desc, money, redirectTo} = this.props;
    const Item = List.Item;
    const Brief = Item.Brief;
    return userName ? (
      <div>
        {redirectTo && redirectTo !== '/login' ? <Redirect to={redirectTo}/> : null}
        <Result
          img={<img width="60px" height="60px" src={require(`static/avatar/${avatar}.png`)} alt={userName}/>}
          title={userName}
          msg={type === 'boss' ? company : null}
        />
        <List renderHeader={() => '简介'}>
          <Item multipleLine>
            {title}
            {desc.split('\n').map(k => <Brief key={k}>{k}</Brief>)}
            {money ? <Brief>薪资: {money}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace/>
        <Button onClick={this.handleLogout}>退出登录</Button>
      </div>
    ) : <Redirect to={redirectTo}/>
  }
  
}

const mapStateToProps = state => ({
  userName: state.user.userName,
  company: state.user.company,
  avatar: state.user.avatar,
  type: state.user.type,
  title: state.user.title,
  desc: state.user.desc,
  money: state.user.money,
  redirectTo: state.user.redirectTo,
});

const mapDispatchToProps = dispatch => ({
  propsLogoutSubmit() {
    dispatch(UserCreateActions.logoutSubmitProps());
    BrowserCookies.erase('userID');
    BrowserCookies.erase('userID.sig');
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(PersonCenter);