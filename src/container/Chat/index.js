import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, InputItem} from 'antd-mobile';
import * as ChatCreateActions from 'store/Chat/ChatCreateActions';

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
    const from = this.props.userName;
    const to = this.props.match.params.user;
    const text = this.state.text;
    // const {sendMessageProps} = this.props;
    let param = {};
    param.from = from;
    param.to = to;
    param.text = text;
    this.props.sendMessageProps(param);
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
