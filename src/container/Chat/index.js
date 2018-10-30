import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, InputItem, NavBar} from 'antd-mobile';
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
    const {chatMsg} = this.props;
    const user = this.props.match.params.user;
    return (
      <div id="chat-page">
        <NavBar mode="dark">
          {this.props.match.params.user}
        </NavBar>
        {
          chatMsg.map(k => {
            return k.from === user ? (
              <List key={k._id}>
                <Item>{k.content}</Item>
              </List>
            ) : (
              <List key={k._id}>
              <Item
                className="chat-me"
                extra=""
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
    this.props.getMessageListProps();
    this.props.receiveMessageProps();
  }

}

const mapStateToProps = state => ({
  _id: state.user._id,
  userName: state.user.userName,
  chatMsg: state.chat.chatMsg,
  unRead: state.chat.unRead,
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
