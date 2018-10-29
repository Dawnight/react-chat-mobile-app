import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, InputItem} from 'antd-mobile';
import * as ChatCreateActions from 'store/Chat/ChatCreateActions';
import io from 'socket.io-client';
const socket = io('ws://localhost:9999');

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
    const {chatMsg} = this.props;
    return (
      <div>
        <div>
          {chatMsg.map(k => {
            return <p key={k._id}>{k.content}</p>
          })}
        </div>
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
    // socket.on('receiveMsg', data => {
    //   console.log('chat page receiveMsg');
    //   console.log(data);
    //   this.setState({
    //     msg: [...this.state.msg, data.content]
    //   });
    //   console.log('this.state.msg');
    //   console.log(this.state.msg);
    // });
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
