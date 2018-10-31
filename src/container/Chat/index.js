import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile';
import * as ChatCreateActions from 'store/Chat/ChatCreateActions';
import {getChatId} from "src/utils";

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      content: '',
      msg: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitInfo = this.handleSubmitInfo.bind(this);
    this.fixAntdCarouselBug = this.fixAntdCarouselBug.bind(this);
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
    this.setState({
      content: '',
      showEmoji: false
    });
  }

  fixAntdCarouselBug() {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  }

  render() {
    /** emoji START **/
    const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '.split(' ').filter(k => k).map(v => ({text: v}));
    /** emoji END **/
    const Item = List.Item;
    let {chatMsg, users} = this.props;
    const userID = this.props.match.params.user;
    const chatId = getChatId(userID, this.props._id);
    chatMsg = chatMsg.filter(k => k.chatId === chatId);
    if (!users[userID]) {
      return null;
    }
    return (
      <div id="chat-page">
        <NavBar
          mode="dark"
          onLeftClick={() => {
            this.props.history.goBack()
          }}
          icon={<Icon type="left"/>}
        >
          {users[userID]['userName']}
        </NavBar>
        {
          chatMsg.map(k => {
            const avatar = require(`../../static/avatar/${users[k.from].avatar}.png`);
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
                  extra={<img src={avatar} alt=''/>}
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
              extra={
                <div>
                  <span style={{marginRight: 15}} onClick={() => {
                    this.setState({
                      showEmoji: !this.state.showEmoji
                    });
                    this.fixAntdCarouselBug();
                  }}>😀</span>
                  <span onClick={() => this.handleSubmitInfo()}>发送</span>
                </div>
              }
            />
          </List>
          {
            this.state.showEmoji ? <Grid
              data={emoji}
              columnNum={9}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={(el) => {
                this.setState({content: this.state.content + el.text})
              }}
            /> : null
          }
        </div>
      </div>
    )
  }

  componentWillUnmount() {
    const to = this.props.match.params.user;
    console.log(`%cto: ${to}`, 'color: blue');
    // this.props.readMessageProps(to);
  }

  componentDidMount() {
    if (this.props.chatMsg.length === 0) {
      this.props.getMessageListProps();
      this.props.receiveMessageProps();
    }
    this.fixAntdCarouselBug();
    const to = this.props.match.params.user;
    console.log(`%cto: ${to}`, 'color: blue');
    // this.props.readMessageProps(to);
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
  },
  readMessageProps(param) {
    dispatch(ChatCreateActions.readMessageProps(param));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
