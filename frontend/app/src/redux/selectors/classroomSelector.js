import { createSelector } from 'reselect';

export const getCourses = (state) => state.classroom.courses;
export const getDatabaseCards = (state) => state.databaseCards.items

export const getAllCards = createSelector(
  getCourses,
  (courses) => {
    return courses.reduce((agg, { assignments, name: courseName }) => {
      assignments.map(({courseId, dueDate, id: courseWorkId, title, url, submissions: [{userId}]}) => {
        agg.push({
          courseId,
          courseName,
          courseWorkId,
          dueDate,
          title,
          url,
          userId,
        })
      })

      return agg
    }, [])
  }
)

export const getAllCardsWithStatus = createSelector(
  getDatabaseCards,
  getAllCards,
  (dbCards, classroomCards) => {
    return classroomCards.map((classroomCard) => {
      let {
        courseId,
        courseWorkId
      } = classroomCard

      let dbCardIndex = dbCards.findIndex((dbCard) => courseId === dbCard.courseId && courseWorkId === dbCard.courseWorkId)

      if(dbCardIndex >= 0) {
        classroomCard.status = dbCards[dbCardIndex].status
      } else {
        classroomCard.status = 'TODO'
      }

      return classroomCard
    })
  }
)

export const getCardsToInsert = createSelector(
  getAllCardsWithStatus,
  getDatabaseCards,
  (allCards, dbCards) => {
    return allCards.filter(({courseId, courseWorkId}) => {
      let dbCardIndex = dbCards.findIndex((dbCard) => courseId === dbCard.courseId && courseWorkId === dbCard.courseWorkId)

      return dbCardIndex < 0
    })
  }
)