import React, {Component} from 'react';
import AvatarSelector from 'components/AvatarSelector/';
import {NavBar, InputItem, TextareaItem} from 'antd-mobile';

class BossInfo extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      company: '',
      salary: '',
      avatar: '',
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSelectAvatar = this.handleSelectAvatar.bind(this);
  }
  
  handleOnChange(key, value) {
    this.setState({
      [key]: value,
    })
  }
  
  handleSelectAvatar(e){
    this.setState({
      avatar: e
    });
  }
  
  render() {
    return (
      <div>
        <NavBar mode="dark">BOSS 完善信息页面</NavBar>
        <AvatarSelector handleSelectAvatar={this.handleSelectAvatar}/>
        <InputItem onChange={k => this.handleOnChange('title', k)}>招聘职位</InputItem>
        <InputItem onChange={k => this.handleOnChange('company', k)}>公司名称</InputItem>
        <InputItem onChange={k => this.handleOnChange('salary', k)}>职位薪资</InputItem>
        <TextareaItem rows={3} autoHeight title='职位要求' onChange={k => this.handleOnChange('desc', k)}/>
      </div>
    )
  }
}

export default BossInfo;
