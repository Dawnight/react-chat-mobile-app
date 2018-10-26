import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, WhiteSpace, WingBlank} from 'antd-mobile';

class UserCard extends Component {
  static propTypes = {
    userList: PropTypes.array.isRequired
  };
  
  render() {
    const Header = Card.Header;
    const Body = Card.Body;
    const {userList} = this.props;
    return (
      <WingBlank>
        <WhiteSpace/>
        {
          userList.map(k => (
            k.avatar ? (
              <Card key={k._id}>
                <Header title={k.userName}
                        thumb={require(`static/avatar/${k.avatar}.png`)}
                        thumbStyle={{width: 36, height: 36}}
                        extra={<span>{k.title}</span>}/>
                <Body>
                {k.type === 'boss' ? <div>公司: {k.company}</div> : null}
                {k.desc.split('\n').map(d => (<div key={d}>{d}</div>))}
                {k.type === 'boss' ? <div>薪资: {k.salary}</div> : null}
                </Body>
              </Card>
            ) : null
          ))
        }
      </WingBlank>
    );
  }
}

export default UserCard;
