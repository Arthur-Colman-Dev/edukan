import produce from 'immer';

import {
  GET_COURSES_SUCCEEDED,
  GET_ASSIGNMENTS_SUCCEEDED,
  GET_SUBMISSIONS_SUCCEEDED,
} from 'actionTypes';

const defaultState = {
  courses: []
}

const classroomReducer = produce((draft = defaultState, action = {}) => {
  let courses, assignments, courseId;
  
  switch(action.type) {
    case GET_COURSES_SUCCEEDED: 
      ({
        courses,
      } = action)

      courses = courses.map((course) => (
        { 
          id: course.id, 
          name: course.name,
          state: course.courseState 
        }
      ));

      draft.courses = courses;
      return draft;

    case GET_ASSIGNMENTS_SUCCEEDED:
      ({
        assignments,
        courseId,
      } = action);

      assignments = assignments.map((assignment) => {
        const { 
          id,
          courseId,
          alternateLink,
          title,
          dueDate,
          dueTime
        } = assignment;

        return {
          id,
          courseId,
          url: alternateLink,
          title,
          dueDate: {
            ...dueDate,
            ...dueTime
          }
        }
      });

      draft.courses = draft.courses.map((course) => {
        let newCourse = course;
        if (newCourse.id === courseId) {
          newCourse.assignments = assignments;
        }
        return newCourse;
      })

      return draft;

    case GET_SUBMISSIONS_SUCCEEDED:
      return draft

    default:
      return draft
  }
})

export default classroomReducer