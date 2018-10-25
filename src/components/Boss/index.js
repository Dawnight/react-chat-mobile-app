import React, {Component} from 'react';
import {getCommonApi, CODE_OK} from "src/utils";

class Boss extends Component {
  constructor(props) {
    super(props);
    this.state ={
      geniusList: []
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
    getCommonApi('/user/genius').then(response => {
      if (response.code === CODE_OK) {
        this.setState({
          geniusList: response.data
        })
      }
    })
  }
}

export default Boss;