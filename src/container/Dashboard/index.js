import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import {NavBar} from 'antd-mobile';
import NavLinkBar from 'components/NavLinkBar/';
import Boss from 'container/Boss/';
import Genius from 'container/Genius/';
import MSG from 'container/MSG/';
import PersonCenter from 'container/PersonCenter/';
import * as ChatCreateActions from 'store/Chat/ChatCreateActions';

class Dashboard extends Component {

  render() {
    const {type} = this.props;
    const {pathname} = this.props.location;
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'genius',
        title: '牛人列表',
        component: Boss,
        hide: type === 'genius'
      },
      {
        path: '/genius',
        text: 'boss',
        icon: 'boss',
        title: 'BOSS列表',
        component: Genius,
        hide: type === 'boss'
      },
      {
        path: '/message',
        text: '消息',
        icon: 'message',
        title: '消息列表',
        component: MSG
      },
      {
        path: '/personCenter',
        text: '个人中心',
        icon: 'personCenter',
        title: '个人中心',
        component: PersonCenter
      }
    ];
    const page = navList.find(item => item.path === pathname);
    return page ? (
      <div>
        <NavBar className="fixed-header" mode="dark">
          {/*{navList.find(k => k.path === pathname).title || '/login'}*/}
          {
            navList.find(k => {
              return (k.path === pathname).title;
            })
          }
        </NavBar>
        <div style={{marginTop: 45}}>
          {navList.map(k => (
            <Route key={k.path} path={k.path} component={k.component}/>
          ))}
        </div>
        <NavLinkBar navList={navList}/>
      </div>
    ): <Redirect to="/message"/>
  }

  componentDidMount() {
    const {chatMsg} = this.props;
    if (!chatMsg.length) {
      this.props.getMessageListProps();
      this.props.receiveMessageProps();
    }
  }

}

const mapStateToProps = state => ({
  userName: state.user.userName,
  type: state.user.type,
  unRead: state.chat.unRead,
  chatMsg: state.chat.chatMsg,
});

const mapDispatchToProps = dispatch => ({
  getMessageListProps() {
    dispatch(ChatCreateActions.getMessageListProps());
  },
  receiveMessageProps() {
    dispatch(ChatCreateActions.receiveMessageProps());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
