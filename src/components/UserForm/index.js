import React, {Component} from 'react';

export default (DecoratedComponent) => {
  return class NewComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(key, value) {
      this.setState({
        [key]: value,
      })
    }
    render () {
      return <DecoratedComponent handleChange={this.handleChange} state={this.state} {...this.props}/>
    }
  }
}