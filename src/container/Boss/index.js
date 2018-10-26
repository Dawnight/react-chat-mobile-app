import React, {Component} from 'react';
import {Card, WhiteSpace, WingBlank} from 'antd-mobile';
import {connect} from 'react-redux';
import * as ChatCreateActions from 'store/Chat/ChatCreateActions';

class Boss extends Component {
  render() {
    const {userList} = this.props;
    const Header = Card.Header;
    const Body = Card.Body;
    console.log('userList');
    console.log(userList);
    return (
      <WingBlank>
        <WhiteSpace/>
        {
          userList.map(k =>
            k._id ? (
              <Card key={k._id}>
                <Header
                  title={k.userName}
                  thumb={require(`static/avatar/${k.avatar}.png`)}
                  thumbStyle={{width: 36, height: 36}}
                  extra={<span>{k.title}</span>}/>
                <Body>
                  {k.type === 'boss' ? <div>公司: {k.company}</div> : null}
                  {k.desc.split('\n').map(d => (<div key={d}>{d}</div>))}
                  {k.type === 'boss' ? <div>薪资: {k.money}</div> : null}
                </Body>
              </Card>
            ) : null
          )
        }
      </WingBlank>
    )
  }

  componentDidMount () {
    let param = {};
    param.type = 'genius';
    this.props.propsGetUserList(param);
  }
}

const mapStateToProps = state => ({
  userList: state.chat.userList,
});

const mapDispatchToProps = dispatch => ({
  propsGetUserList (param) {
    dispatch(ChatCreateActions.getUserListProps(param));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Boss);