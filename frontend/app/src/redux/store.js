import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers/rootReducer';
import loggerMiddleware from './middleware/logger';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware()

const middlewares = [
  loggerMiddleware,
  sagaMiddleware,
];

const middlewareEnhancer = applyMiddleware(...middlewares);

const store = createStore(
  rootReducer,
  middlewareEnhancer
);

sagaMiddleware.run(rootSaga)
export default store;