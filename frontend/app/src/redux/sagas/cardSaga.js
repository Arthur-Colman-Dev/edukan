import {
  take,
  put,
  call,
} from 'redux-saga/effects';

import {
  MOVE_CARD,
  LOGIN_SUCCEEDED,
  FETCH_CARDS_SUCCEEDED,
  FETCH_CARDS_REQUESTED,
} from 'actionTypes';

import client from '../../utils/client'

import { gql } from '@apollo/client';

export function* createCard() {
  while (true) {
    const {
      courseId,
      courseWorkId,
      studentId,
      nextStatus, // TODO DOING DONE
    } = yield take(CREATE_CARD)
  }

  try {
    const {
      data
    } = yield call([client, 'mutate'], {
      query: gql`
        mutation createCards($courseId: String!, $courseWorkId: $String!, $studentId: String!, $nextStatus: AssignmentStatus!){
          createAssignment(
            input: {
              assignment: {
                courseId: $courseId,
                courseWorkId: $courseWorkId,
                studentId: $studentId,
                status: "$nextStatus,
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
        nextStatus,
      }
    })
  } catch(e) {
    console.log('ERROR ON CARD CREATE', e)
  }
}

export function* updateCardStatus() {
  while (true) {
    const {
      cardId,
      nextStatus
    } = yield take(MOVE_CARD);

    try {
      const {
        data
      } = yield call([client, 'mutate'], {
        mutation: gql`mutation updateCardStatus($cardId: Int!, $nextStatus: AssignmentStatus!){
          updateAssignmentById (
            input: {
              id: $cardId,
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
    } = yield take(FETCH_CARDS_REQUESTED);

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

      yield put({type:FETCH_CARDS_SUCCEEDED, data})
    } catch (e) {
      console.log('ERROR ON CARDS FETCH', e)
    }
  }
}