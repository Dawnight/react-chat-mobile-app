import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from './self-redux';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});
/**
 export const connect = (mapStateToProps, mapDispatchToProps) => {
  return class WrapComponent extends Component {

  }
};
 **/


export class Provider extends Component {

  static childContextTypes = {
    store: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.store = props.store;
  }

  getChildContext() {
    return {store: this.store}
  }

  render() {
    return this.props.children;
  }
}