export const createStore = (reducer, enhancer) => {
  if (enhancer) {
    return enhancer(createStore)(reducer);
  }
  let currentState = {};
  let currentListeners = [];

  const getState = () => {
    return currentState
  };

  const subscribe = listener => {
    currentListeners.push(listener)
  };

  const dispatch = action => {
    currentState = reducer(currentState, action);
    currentListeners.forEach(listener => listener());
    return action;
  };

  dispatch({type: 'SELF-TEXT'});
  return {getState, subscribe, dispatch};

};


function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args));
}

// creators实际上就是触发dispatch的方法
export const bindActionCreators = (creators, dispatch) => {
  let bound = {};
  Object.keys(creators).forEach(item => {
    let creator = creators[item];
    bound[item] = bindActionCreator(creator, dispatch);
  });
  return bound;
};

export const compose = (...funcs) => {
  if (funcs.length === 0) {
    return arg => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((ret, item) => (...args) => ret(item(...args)));
};

export const applyMiddleWare = (...middlewares) => {
  return createStore => (...args) => {
    const store = createStore(...args);
    let dispatch = store.dispatch;
    const midApi = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args),
    };
    // dispatch = middlewares(midApi)(store.dispatch);
    const middlewareChain = middlewares.map(middleware => middleware(midApi));
    dispatch = compose(...middlewareChain)(store.dispatch);
    return {
      ...store,
      dispatch,
    }
  }
};
