// const thunk = ({dispatch, getState}) => next => action => {
//   return next(action);
// };

const thunk = ({dispatch, getState}) => {
  return next => {
    return action => {
      if (Array.isArray(action)) {
        action.forEach(item => next(item));
      }
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }
      return next(action);
    }
  }
};


export default thunk;