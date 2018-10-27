import React, {Component} from 'react';
import io from 'socket.io-client';

class Chat extends Component {
  render() {
    console.log('chat page');
    console.log(this.props);
    return (
      <div>
        Chat page---{this.props.match.params.user}
      </div>
    )
  }

  componentDidMount () {
    console.log('*****************');
    const socket = io('ws://localhost:9999');
    console.log('--------------------');
    console.log(socket);
  }
}

export default Chat;
