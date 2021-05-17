import { combineReducers } from 'redux';

import cardsReducer from './cardsReducer';
import classroomReducer from './classroomReducer';

const rootReducer = combineReducers({
  cards: cardsReducer,
  classroom: classroomReducer,
});

export default rootReducer;