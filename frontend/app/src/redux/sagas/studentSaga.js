import {
  take,
  put,
  call,
} from 'redux-saga/effects';

import {
  GET_CURRENT_STUDENT,
  LOGIN_SUCCEEDED,
  CREATE_NEW_STUDENT,
  FETCH_CARDS_REQUESTED,
} from 'actionTypes';

import client from '../../utils/client'
import { gql } from '@apollo/client';

export function* getCurrentUser() {
  const {
    user: {
      id: studentId
    }
  } = yield take(LOGIN_SUCCEEDED)

  // try {
  //   const {
  //     data
  //   } = yield call([client, 'query'], {
  //     query: gql`
  //       query getCurrentUser($studentId: String!) {
  //         studentByGoogleClassroomId(googleClassroomId: $studentId) {
  //           googleClassroomId: googleClassroomId
  //         }
  //       }
  //     `,
  //     variables: {
  //       studentId
  //     }
  //   })

  //   if(data.studentByGoogleClassroomId !== null) {
  //     yield put({type: FETCH_CARDS_REQUESTED, studentId})
  //   } else {
  //     yield put({type: CREATE_NEW_STUDENT, studentId})
  //   }
  // } catch(e) {
  //   console.log('ERROR FETCHING STUDENT', e)
  // }
}

export function* createNewStudent() {
  const {
    studentId
  } = yield take(CREATE_NEW_STUDENT)

  try {
    const {
      data
    } = yield call([client, 'mutate'], {
      mutation: gql`
        mutation createStudent($studentId: String!){
          createStudent(
            input: {
              student: {
                googleClassroomId: $studentId
              }
            }
          ) {
            student {
              googleClassroomId
            }
          }
        }
      `,
      variables: {
        studentId
      }
    })
  } catch(e) {
    console.log('ERROR CREATING STUDENT', e)
  }
}
