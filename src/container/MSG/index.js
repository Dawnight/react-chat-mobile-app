import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, Badge} from 'antd-mobile';

class MSG extends Component {

  getLast(arr) {
    return arr[arr.length - 1];
  }

  render() {
    const Item = List.Item;
    const Brief = Item.Brief;
    const {_id, users} = this.props;
    let msgGroup = {};
    const {chatMsg} = this.props;
    chatMsg.forEach(item => {
      msgGroup[item.chatId] = msgGroup[item.chatId] || [];
      msgGroup[item.chatId].push(item);
    });
    console.log('chatMsg');
    console.log(chatMsg);
    const chatList = Object.values(msgGroup);
    console.log('chatList');
    console.log(chatList);
    chatList.sort((a, b) => {
      const a_last = this.getLast(a);
      const b_last = this.getLast(b);
      const a_updatedAt = new Date(a_last.meta.updatedAt).getTime();
      const b_updatedAt = new Date(b_last.meta.updatedAt).getTime();
      return b_updatedAt - a_updatedAt;
    });
    return (
      <div>
          {
            chatList.map(k => {
              const lastItem = this.getLast(k);
              console.log('lastItem');
              console.log(lastItem);
              const targetId = k[0].from === _id ? k[0].to : k[0].from;
              console.log('users');
              console.log(users);
              console.log('targetId');
              console.log(targetId);
              const userName = users[targetId] ? users[targetId]['userName'] : '';
              const avatar = users[targetId] ? users[targetId]['avatar'] : '';
              const unRead = k.filter(k => !k.read && k.to===_id).length;
              return (
                <List key={lastItem._id}>
                  <Item
                    extra={<Badge text={unRead}></Badge>}
                    thumb={require(`../../static/avatar/${avatar}.png`)}
                    arrow="horizontal"
                    onClick={()=>{this.props.history.push(`/chat/${targetId}`)}}
                  >
                    {lastItem.content}
                    <Brief>{userName}</Brief>
                  </Item>
                </List>
              )
            })
          }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  chatMsg: state.chat.chatMsg,
  users: state.chat.users,
  _id: state.user._id,
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(MSG);