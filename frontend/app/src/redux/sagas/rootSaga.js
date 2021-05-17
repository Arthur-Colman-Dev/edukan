import {
  all,
  spawn,
  call,
} from 'redux-saga/effects';

import { testSaga } from './testSaga'
import {
  updateCardStatus
} from './cardSaga'

export default function* rootSaga() {
  const sagas = [
    testSaga,
    updateCardStatus,
  ]

  yield all(sagas.map((saga) => spawn(function* () {
    while (true) {
      try {
        yield call(saga);
        break;
      } catch (error) {
        throw error
      }
    }
  })));
}
