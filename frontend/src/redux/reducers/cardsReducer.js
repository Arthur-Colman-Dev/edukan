import produce from 'immer';

import {
  MOVE_CARD,
  FETCH_CARDS,
  LOGIN_SUCCEEDED,
} from 'actionTypes';

const defaultState = {
  items: [],
  loading: false,
}

const cardsReducer = produce((draft = defaultState, action = {}) => {
  let nextStatus, cardId, cards, cardIndex;
  
  switch(action.type) {
    case LOGIN_SUCCEEDED:
      draft.loading = true
      return draft
    case MOVE_CARD:
      ({
        cardId,
        nextStatus
      } = action)

      cardIndex = draft.items.findIndex(card => card.courseWorkId === cardId)

      draft.items[cardIndex].status = nextStatus
      return draft
    case FETCH_CARDS: 
      ({
        cards
      } = action)

      draft.items = cards
      draft.loading = false
      return draft
    default:
      return draft
  }
})

export default cardsReducer