import produce from 'immer';

import {
  GET_DATABASE_CARDS_SUCCEEDED,
} from 'actionTypes';

const defaultState = {
  items: []
}

const databaseCardsReducer = produce((draft = defaultState, action = {}) => {
  let cardsArray;
  
  switch(action.type) {
    case GET_DATABASE_CARDS_SUCCEEDED: 
      ({
        data: {
          allAssignments: {
            nodes: cardsArray
          }
        }
      } = action)

      draft.items = cardsArray
      return draft
    default:
      return draft
  }
})

export default databaseCardsReducer