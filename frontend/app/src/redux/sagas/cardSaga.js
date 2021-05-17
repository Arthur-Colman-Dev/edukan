import {
  take,
} from 'redux-saga/effects';

import gql from 'graphql-tag';

import {
  MOVE_CARD
} from 'actionTypes';

import axios from 'axios'

// const createCardMutation = ({courseId, courseWorkId, studentId, nextStatus}) => gql`
//   mutation {
//     createAssignment(
//       input: {
//         assignment: {
//           courseId: "${courseId}",
//           courseWorkId: "${courseWorkId}",
//           studentId: "${studentId}",
//           status: "${nextStatus}",
//         }
//       }
//     ) {
//       assignment {
//         id
//         status
//       }
//     }
//   }
// `

const updateCardMutation = ({cardId, nextStatus}) => ({
  query: `mutation updateCardStatus($cardId: Int!, $nextStatus: AssignmentStatus!){
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
});

export function* createCard() {
  while(true) {
    const {
      courseId,
      courseWorkId,
      studentId,
      nextStatus, // TODO DOING DONE
    } = yield take(CREATE_CARD)
  }

  // axios.post('graphql:5433/graphql', {
  //   query: createCardMutation({courseId, courseWorkId, studentId, nextStatus})
  // })
}

export function* updateCardStatus() {
  while(true) {
    const {
      cardId,
      nextStatus
    } = yield take(MOVE_CARD);

    axios.post(
      'http://localhost:5433/graphql', 
      updateCardMutation({cardId, nextStatus}),
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  }
}