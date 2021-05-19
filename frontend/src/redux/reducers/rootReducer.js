import { combineReducers } from 'redux';

import cardsReducer from './cardsReducer';
import classroomReducer from './classroomReducer';
import databaseCardsReducer from './databaseCardsReducer';

import {
  LOGOUT_SUCCEEDED
} from 'actionTypes';

const appReducer = combineReducers({
  cards: cardsReducer,
  classroom: classroomReducer,
  databaseCards: databaseCardsReducer,
})

const rootReducer = (state, action) => {
  if(action.type === LOGOUT_SUCCEEDED) {
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}

export default rootReducer;