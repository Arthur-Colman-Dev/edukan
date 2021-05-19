import { createSelector } from 'reselect';

export const getLoadingState = (state) => state.cards.loading
export const getCards = (state) => state.cards.items

export const getColumnCards = createSelector(
  getCards,
  (cards) => {
    let firstColumn = [];
    let secondColumn = [];
    let thirdColumn = [];
    cards.map((card) => {
      switch(card.status) {
        case 'TODO':
          firstColumn.push(card)
          break;
        case 'DOING':
          secondColumn.push(card)
          break;
        case 'DONE':
          thirdColumn.push(card)
          break;
        default:
          break;
      }
    })
    
    return {
      1: firstColumn,
      2: secondColumn,
      3: thirdColumn,
    }
  }
)