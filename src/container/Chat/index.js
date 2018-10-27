import React, {Component} from 'react';
import io from 'socket.io-client';
import {connect} from 'react-redux';
import {List, InputItem} from 'antd-mobile';
import * as ChatCreateActions from 'store/Chat/ChatCreateActions';

const socket = io('ws://localhost:9999');
socket.on('receiveMsg', data => {
  console.log('receiveMsg');
  console.log(data);
});

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
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
    console.log(this.state);
    socket.emit('sendMsg', {text: this.state.text});
    this.setState({text: ''});
  }

  render() {
    return (
      <div>
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.text}
              onChange={k => this.handleChange('text', k)}
              extra={<span onClick={() => this.handleSubmitInfo()}>发送</span>}
            />
          </List>
        </div>
      </div>
    )
  }

  componentDidMount () {
    this.props.getMessageListProps();
  }

}

const mapStateToProps = state => ({
  chatMsg: state.chat.chatMsg,
  unRead: state.chat.unRead,
});

const mapDispatchToProps = dispatch => ({
  getMessageListProps () {
    dispatch(ChatCreateActions.getMessageListProps());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
