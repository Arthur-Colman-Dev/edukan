import { createSelector } from 'reselect';

export const getCards = (state) => state.cards.items

export const getColumnCards = createSelector(
  getCards,
  (cards) => {
    let firstColumn = [];
    let secondColumn = [];
    let thirdColumn = [];
    Object.values(cards).map((card) => {
      switch(card.column) {
        case '1':
          firstColumn.push(card)
          break;
        case '2':
          secondColumn.push(card)
          break;
        case '3':
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