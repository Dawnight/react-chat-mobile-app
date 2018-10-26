import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import {NavBar} from 'antd-mobile';
import NavLinkBar from 'components/NavLinkBar/';
import Boss from 'container/Boss/';
import Genius from 'container/Genius/';
import MSG from 'container/MSG/';
import PersonCenter from 'container/PersonCenter/';

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
    return (
      <div>
        <NavBar className="fixed-header" mode="dark">{navList.find(k=> k.path === pathname).title || ''}</NavBar>
        <div style={{marginTop: 45}}>
          {navList.map(k=>(
            <Route key={k.path} path={k.path} component={k.component}/>
          ))}
        </div>
        <NavLinkBar navList={navList}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userName: state.user.userName,
  type: state.user.type,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
