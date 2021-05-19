import {
  take,
  put,
  call,
  all,
  takeLatest,
  delay,
  select,
  takeEvery,
} from 'redux-saga/effects';

import {
  getAllCardsWithStatus,
  getCardsToInsert,
  getCardsToUpdateStatus,
} from 'selectors'

import {
  MOVE_CARD,
  GET_DATABASE_CARDS_SUCCEEDED,
  GET_DATABASE_CARDS_REQUESTED,
  GET_SUBMISSIONS_SUCCEEDED,
  CREATE_CARD_REQUESTED,
  FETCH_CARDS,
  UPDATE_CARD_REQUESTED,
} from 'actionTypes';

import client from '../../utils/client'

import { gql } from '@apollo/client';

export function* watchLastFetchSubmission() {
  yield takeLatest(GET_SUBMISSIONS_SUCCEEDED, insertAndSaveCards)
}

function* insertAndSaveCards(action) {
  yield delay(1000)
  const cardsToInsert = yield select((state) => getCardsToInsert(state))
  const cardsToBeSaved = yield select((state) => getAllCardsWithStatus(state))
  const cardsToBeUpdated = yield select((state) => getCardsToUpdateStatus(state))
  try {
    yield all(cardsToInsert.map((card) => put({ type: CREATE_CARD_REQUESTED, ...card })))
    yield all(cardsToBeUpdated.map((card) => put({ type: UPDATE_CARD_REQUESTED, ...card })))
    yield put({ type: FETCH_CARDS, cards: cardsToBeSaved })
  } catch (e) {
    console.log('ERROR', e)
  }
}

export function* watchCreateCard() {
  yield takeEvery(CREATE_CARD_REQUESTED, createCard)
}

function* createCard(action) {
  const {
    courseId,
    courseWorkId,
    userId: studentId,
    status,
  } = action

  try {
    const {
      data
    } = yield call([client, 'mutate'], {
      mutation: gql`
          mutation createCards($courseId: String!, $courseWorkId: String!, $studentId: String!, $status: AssignmentStatus!){
            createAssignment(
              input: {
                assignment: {
                  courseId: $courseId,
                  courseWorkId: $courseWorkId,
                  studentId: $studentId,
                  status: $status,
                }
              }
            ) {
              assignment {
                id
                status
              }
            }
          }
        `,
      variables: {
        courseId,
        courseWorkId,
        studentId,
        status,
      }
    })
  } catch (e) {
    console.log('ERROR ON CARD CREATE', e)
  }
}

export function* updateCardStatus() {
  while (true) {
    const result = yield take([MOVE_CARD, UPDATE_CARD_REQUESTED])

    let cardId, nextStatus;

    switch(result.type) {
      case MOVE_CARD:
        cardId = result.cardId,
        nextStatus = result.nextStatus
        break;
      case UPDATE_CARD_REQUESTED:
        cardId = result.courseWorkId,
        nextStatus = result.status
    }

    try {
      const {
        data
      } = yield call([client, 'mutate'], {
        mutation: gql`mutation updateCardStatus($cardId: String!, $nextStatus: AssignmentStatus!){
          updateAssignmentByCourseWorkId (
            input: {
              courseWorkId: $cardId,
              assignmentPatch: {
                status: $nextStatus
              }
            }
          ){
            assignment {
              status
            }
          }
        }`,
        variables: {
          cardId,
          nextStatus,
        }
      })
    } catch (e) {
      console.log('ERROR ON CARD UPDATE', e)
    }
  }
}

export function* getStudentCards() {
  while (true) {
    const {
      studentId
    } = yield take(GET_DATABASE_CARDS_REQUESTED);

    try {
      const { data } = yield call([client, 'query'], {
        query: gql`
          query($studentId: String!) {
            allAssignments(
              filter: { 
                studentId: {
                  equalTo: $studentId
                }
              }) {
              nodes {
                id
                courseId
                courseWorkId
                status
              }
            }
          }
        `,
        variables: {
          studentId
        }
      })

      yield put({ type: GET_DATABASE_CARDS_SUCCEEDED, data })
    } catch (e) {
      console.log('ERROR ON CARDS FETCH', e)
    }
  }
}