import React, {Component} from 'react';

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
}

export default Chat;
