import client from '../../utils/client';
import { gql } from '@apollo/client';
import axios from 'axios';

import {
  take,
  takeEvery,
  put,
  call,
  all,
} from 'redux-saga/effects';

import {
  LOGIN_SUCCEEDED,
  GET_COURSES_SUCCEEDED,
  GET_ASSIGNMENTS_REQUESTED,
  GET_ASSIGNMENTS_SUCCEEDED,
  GET_SUBMISSIONS_REQUESTED,
  GET_SUBMISSIONS_SUCCEEDED,
} from 'actionTypes';

import { axiosConfig } from '../../utils/google-api';

export function* getCourses() {
  const {
    user: {
      accessToken,
    }
  } = yield take(LOGIN_SUCCEEDED);

  try {

    const {
      data: {
        courses
      }
    } = yield call(axios,axiosConfig({ endpoint: 'courses', accessToken, filterByStudent: true }));

    if (courses.length > 0) {
      yield all(courses.map((course) => put({type: GET_ASSIGNMENTS_REQUESTED, course, accessToken })));
    }

    yield put({type: GET_COURSES_SUCCEEDED, courses});

  } catch(e) {
    console.log('ERROR FETCHING COURSES', e)
  }
}

export function* watchGetAssignments() {
  yield takeEvery(GET_ASSIGNMENTS_REQUESTED, getAssignments);
}

function* getAssignments(action) {
  const {
    course: {
      id: courseId,
      courseState,
    },
    accessToken,
  } = action;

  try {

    if (courseState === "ACTIVE") {
      const {
        data: {
          courseWork: assignments,
        }
      } = yield call(axios,axiosConfig({ endpoint: `courses/${courseId}/courseWork`, accessToken }));

      if (assignments.length > 0) {
        yield all(assignments.map((assignment) => put({type: GET_SUBMISSIONS_REQUESTED, assignment, accessToken})));
      }

      yield put({type: GET_ASSIGNMENTS_SUCCEEDED, courseId, assignments});
    }

  } catch(e) {
    console.log('ERROR FETCHING ASSIGNMENTS', e)
  }
}

export function* watchGetSubmissions() {
  yield takeEvery(GET_SUBMISSIONS_REQUESTED, getSubmissions);
}

function* getSubmissions(action) {
  const {
    assignment: {
      id: assignmentId,
      courseId,
    },
    accessToken,
  } = action;

  try {
    const {
      data: {
        studentSubmissions: submissions,
      }
    } = yield call(axios, axiosConfig({ 
      endpoint: `courses/${courseId}/courseWork/${assignmentId}/studentSubmissions`, 
      accessToken, 
      filterByUser: true 
    }));

    yield put({type: GET_SUBMISSIONS_SUCCEEDED, courseId, assignmentId, submissions});

  } catch(e) {
    console.log('ERROR FETCHING COURSEWORK', e)
  }
}