import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List} from 'antd-mobile';

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
              return (
                <List key={lastItem._id}>
                  <Item
                    thumb={require(`../../static/avatar/${avatar}.png`)}
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