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
export const connect = (mapStateToProps, mapDispatchToProps) => (wrapComponent) => {
  return class ConnectComponent extends Component {
    static contextType = {
      store: PropTypes.object
    };

    constructor(props, context) {
      super(props, context);
      this.state = {
        props: {}
      };
    }

    componentDidMount() {
      const {store} = this.context;
      store.subscribe(() => this.update());
      this.update();
    }

    update() {
      // 获取 mapStateToProps  mapDispatchToProps
      const {store} = this.context;
      const stateProps = mapStateToProps(store.getState());
      // 方法不能直接给，需要dispatch

      const dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch);
      this.setState({
        props: {
          ...this.state.props,
          ...stateProps,
          ...dispatchProps,
        }
      })

    }

    render() {
      return <wrapComponent {...this.state.props}/>;
    }

  }
};


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