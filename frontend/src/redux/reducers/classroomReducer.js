import produce from 'immer';

import {
  GET_COURSES_SUCCEEDED,
  GET_ASSIGNMENTS_SUCCEEDED,
  GET_SUBMISSIONS_SUCCEEDED,
} from 'actionTypes';

const defaultState = {
  courses: []
}

const convertDate = (dueDate = {}, dueTime = {}) => {
  const { day, month, year } = dueDate;
  const { hours, minutes } = dueTime;

  return `${year}-${month}-${day} ${hours || '00'}:${minutes || '00'}:00`;
}

const classroomReducer = produce((draft = defaultState, action = {}) => {
  let courses, assignments, courseId, assignmentId, submissions;
  
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
          dueDate: convertDate(dueDate,dueTime)
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
      ({
        courseId,
        assignmentId,
        submissions,
      } = action);

      submissions = submissions.map((submission) => {
        const {
          id,
          courseId,
          courseWorkId: assignmentId,
          userId,
          state: classroomState,
        } = submission;

        let status = 'unknown';
        if (classroomState === "TURNED_IN" || classroomState === "RETURNED") {
          status = 'DONE';
        }

        return {
          id,
          courseId,
          assignmentId,
          userId,
          classroomState,
          status,
        };
      });

      draft.courses = draft.courses.map((course) => {
        let newCourse = course;
        if (newCourse.id === courseId) {
          newCourse.assignments = newCourse.assignments.map((assignment) => {
            let newAssignment = assignment;
            if (newAssignment.id === assignmentId) {
              newAssignment.submissions = submissions;
            }
            return newAssignment;
          });
        }
        return newCourse;
      });

      return draft

    default:
      return draft
  }
})

export default classroomReducer