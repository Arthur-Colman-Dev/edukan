import update from 'immutability-helper';

import {
  MOVE_CARD
} from 'actionTypes';

const defaultState = {
  items: {
    1: {
      id: 1,
      column: '1'
    },
    2 : {
      id: 2,
      column: '3'
    },
  }
}

const cardsReducer = (state = defaultState, action = {}) => {
  let nextColumn, cardId;
  
  switch(action.type) {
    case MOVE_CARD:
      ({
        cardId,
        nextColumn
      } = action)

      return update(state, {
        items: {
          [cardId]: {
            column: { $set: nextColumn }
          }
        }
      })
    default:
      return state
  }
}

export default cardsReducer