import React, {Component} from 'react';
import {Result, List, WhiteSpace} from 'antd-mobile';
import {connect} from 'react-redux';

class PersonCenter extends Component {
  render() {
    const {userName, avatar, type, company, title, desc, money} = this.props;
    const Item = List.Item;
    const Brief = Item.Brief;
    return userName ? (
      <div>
        <Result
          img={<img width="60px" height="60px" src={require(`static/avatar/${avatar}.png`)} alt={userName}/>}
          title={userName}
          msg={type==='boss'? company: null}
        />
        <List renderHeader={()=>'简介'}>
          <Item multipleLine>
            {title}
            {desc.split('\n').map(k=><Brief key={k}>{k}</Brief>)}
            {money ? <Brief>薪资: {money}</Brief>: null}
          </Item>
        </List>
        <WhiteSpace/>
        <List>
          <Item>退出登录</Item>
        </List>
      </div>
    ): null
  }
  componentDidMount () {
  
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
});

const mapDispatchToProps = dispatch => ({});


export default connect(mapStateToProps, mapDispatchToProps)(PersonCenter);