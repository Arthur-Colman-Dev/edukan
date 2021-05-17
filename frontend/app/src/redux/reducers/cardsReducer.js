import produce from 'immer';

import {
  MOVE_CARD,
  FETCH_CARDS_SUCCEEDED,
} from 'actionTypes';

const defaultState = {
  items: []
}

const cardsReducer = produce((draft = defaultState, action = {}) => {
  let nextStatus, cardId, cardsArray, cardIndex;
  
  switch(action.type) {
    case MOVE_CARD:
      ({
        cardId,
        nextStatus
      } = action)

      cardIndex = draft.items.findIndex(card => card.id === cardId)

      draft.items[cardIndex].status = nextStatus
      return draft
    case FETCH_CARDS_SUCCEEDED: 
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

export default cardsReducer