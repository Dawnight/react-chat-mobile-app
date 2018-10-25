import React, {Component} from 'react';
import {getCommonApi, CODE_OK} from "src/utils";

class Genius extends Component {
  constructor(props) {
    super(props);
    this.state ={
      geniusList: []
    };
  }

  render() {
    return (
      <div>
        <h2>genius page</h2>
      </div>
    )
  }

  componentDidMount () {
    getCommonApi('/user/list', {type: 'genius'}).then(response => {
      if (response.code === CODE_OK) {
        this.setState({
          geniusList: response.data
        })
      }
    })
  }
}

export default Genius;