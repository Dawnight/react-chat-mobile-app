import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, InputItem, NavBar, Icon} from 'antd-mobile';
import * as ChatCreateActions from 'store/Chat/ChatCreateActions';

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: '',
      msg: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitInfo = this.handleSubmitInfo.bind(this);
  }

  handleChange(key, value) {
    this.setState({
      [key]: value,
    })
  }

  handleSubmitInfo() {
    const from = this.props._id;
    const to = this.props.match.params.user;
    const content = this.state.content;
    const {sendMessageProps} = this.props;
    let param = {};
    param.from = from;
    param.to = to;
    param.content = content;
    sendMessageProps(param);
    this.setState({content: ''});
  }

  render() {
    const Item = List.Item;
    const {chatMsg, users} = this.props;
    const userID = this.props.match.params.user;
    if (!users[userID]) {
      return null;
    }
    return (
      <div id="chat-page">
        <NavBar
          mode="dark"
          onLeftClick={()=>{this.props.history.goBack()}}
          icon={<Icon type="left"/>}
        >
          {users[userID]['userName']}
        </NavBar>
        {
          chatMsg.map(k => {
            const avatar = require(`../../static/avatar/${users[k.from].avatar}.png`);
            const selfAvatar = avatar.split('.')[0] + '.' + avatar.split('.')[2];
            return k.from === userID ? (
              <List key={k._id}>
                <Item
                  thumb={avatar}
                >{k.content}</Item>
              </List>
            ) : (
              <List key={k._id}>
              <Item
                className="chat-me"
                extra={<img src={selfAvatar} alt=''/>}
              >{k.content}</Item>
            </List>
            )
          })
        }
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.content}
              onChange={k => this.handleChange('content', k)}
              extra={<span onClick={() => this.handleSubmitInfo()}>发送</span>}
            />
          </List>
        </div>
      </div>
    )
  }

  componentDidMount() {
    if (this.props.chatMsg.length === 0) {
      this.props.getMessageListProps();
      this.props.receiveMessageProps();
    }
  }
}

const mapStateToProps = state => ({
  _id: state.user._id,
  userName: state.user.userName,
  chatMsg: state.chat.chatMsg,
  unRead: state.chat.unRead,
  users: state.chat.users,
});

const mapDispatchToProps = dispatch => ({
  getMessageListProps() {
    dispatch(ChatCreateActions.getMessageListProps());
  },
  sendMessageProps(param) {
    dispatch(ChatCreateActions.sendMessageProps(param));
  },
  receiveMessageProps() {
    dispatch(ChatCreateActions.receiveMessageProps());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
