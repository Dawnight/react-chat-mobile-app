export const createStore = (reducer) => {
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