const logger = (store) => (next) => (action) => {
  const result = next(action);
  
  console.group(action.type);
  console.info('dispatching', action);
  console.info('next state', store.getState());
  console.groupEnd();

  return result;
};

export default logger;