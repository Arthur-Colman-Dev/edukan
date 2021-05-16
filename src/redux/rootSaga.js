import {
  all,
  spawn,
  call,
} from 'redux-saga/effects';

import { testSaga } from './sagas/testSaga'

export default function* rootSaga() {
  const sagas = [
    testSaga
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
