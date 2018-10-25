import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Grid, List} from 'antd-mobile';

class AvatarSelector extends Component {
  static propTypes = {
    handleSelectAvatar: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSelectAvatar = this.handleSelectAvatar.bind(this);
  }
  
  handleSelectAvatar (e) {
    this.setState(e);
    this.props.handleSelectAvatar(e.text);
  }
  
  render() {
    const avatars = ['butterFruit', 'carrot', 'chicken', 'corn', 'dish', 'egg', 'fish', 'grape', 'kiwifruit', 'lemon', 'meat', 'mushrooms', 'potato', 'shrimp', 'tomato', 'watermelon'];
    const data = avatars.map((item, index) => ({
      icon: require(`static/avatar/${item}.png`),
      text: item,
    }));
    const gridHeader = this.state.text ? (<div><span>已选择头像:</span><img style={{width: 20}} src={this.state.icon} alt={this.state.text}/></div>) : '请选择头像';
    return (
      <div>
        <List renderHeader={()=>gridHeader}>
          <Grid data={data} onClick={this.handleSelectAvatar}/>
        </List>
      </div>
    )
  }
}

export default AvatarSelector;
