import {
  take,
} from 'redux-saga/effects';

import gql from 'graphql-tag';

import {
  MOVE_CARD
} from 'actionTypes';

import axios from 'axios'

const createCardMutation = ({courseId, courseWorkId, studentId, nextStatus}) => gql`
  mutation {
    createAssignment(
      input: {
        assignment: {
          courseId: "${courseId}",
          courseWorkId: "${courseWorkId}",
          studentId: "${studentId}",
          status: "${nextStatus}",
        }
      }
    ) {
      assignment {
        id
        status
      }
    }
  }
`

const updateCardMutation = ({cardId, nextStatus}) => gql`
  mutation {
    updateAssignmentById (
      input: {
        id: ${cardId},
        assignmentPatch: {
          status: ${nextStatus}
        }
      }
    ){
      assignment {
        status
      }
    }
  }
`

export function* createCard() {
  while(true) {
    const {
      courseId,
      courseWorkId,
      studentId,
      nextStatus, // TODO DOING DONE
    } = yield take(CREATE_CARD)
  }

  axios.post('http://0.0.0.0:5433/graphiql', {
    query: createCardMutation({courseId, courseWorkId, studentId, nextStatus})
  })
}

export function* updateCardStatus() {
  while(true) {
    const {
      cardId,
      nextStatus
    } = yield take(MOVE_CARD);

    axios.post('http://0.0.0.0:5433/graphiql', {
    query: updateCardMutation(cardId, nextStatus)
  })
  }
}