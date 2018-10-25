import React, {Component} from 'react';
import {getCommonApi, CODE_OK} from "src/utils";

class Boss extends Component {
  constructor(props) {
    super(props);
    this.state ={
      bossList: []
    };
  }

  render() {
    return (
      <div>
        Boss Page
      </div>
    )
  }

  componentDidMount () {
    getCommonApi('/user/list', {type: 'boss'}).then(response => {
      if (response.code === CODE_OK) {
        this.setState({
          bossList: response.data
        })
      }
    })
  }
}

export default Boss;