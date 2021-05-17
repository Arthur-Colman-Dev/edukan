import {
  all,
  spawn,
  call,
} from 'redux-saga/effects';

import {
  updateCardStatus,
  getStudentCards,
} from './cardSaga'

import {
  getCurrentUser,
  createNewStudent,
} from './studentSaga'

export default function* rootSaga() {
  const sagas = [
    updateCardStatus,
    getStudentCards,
    getCurrentUser,
    createNewStudent,
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
