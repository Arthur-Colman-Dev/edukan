import {
  all,
  spawn,
  call,
} from 'redux-saga/effects';

import {
  updateCardStatus,
  getStudentCards,
  watchLastFetchSubmission,
  watchCreateCard,
} from './cardSaga';

import {
  getCurrentUser,
  createNewStudent,
} from './studentSaga';

import {
  getCourses,
  watchGetAssignments,
  watchGetSubmissions,
} from './classroomSaga';

export default function* rootSaga() {
  const sagas = [
    updateCardStatus,
    getStudentCards,
    getCurrentUser,
    createNewStudent,
    getCourses,
    watchGetAssignments,
    watchGetSubmissions,
    watchLastFetchSubmission,
    watchCreateCard,
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
