import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Switch, Route} from 'react-router-dom';
import {NavBar} from 'antd-mobile';
import NavLinkBar from 'components/NavLinkBar/';
import Boss from 'components/Boss/';
import Genius from 'components/Genius/';
import MSG from 'components/MSG/';
import PersonCenter from 'components/PersonCenter/';

class Dashboard extends Component {

  render() {
    console.log('this.props');
    console.log(this.props);
    const {type} = this.props;
    const {pathname} = this.props.location;
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: type === 'genius'
      },
      {
        path: '/genius',
        text: 'boss',
        icon: 'genius',
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
        <NavBar className="fixed-header" mode="dark">{navList.find(k=> k.path == pathname).title || ''}</NavBar>
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
