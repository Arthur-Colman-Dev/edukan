import { createSelector } from 'reselect';

export const getCourses = (state) => state.classroom.courses;
export const getDatabaseCards = (state) => state.databaseCards.items

export const getAllCards = createSelector(
  getCourses,
  (courses) => {
    return courses.reduce((agg, { assignments, name: courseName }) => {
      assignments.map(({courseId, dueDate, id: courseWorkId, title, url, submissions: [{userId, status}]}) => {
        agg.push({
          courseId,
          courseName,
          courseWorkId,
          dueDate,
          title,
          url,
          userId,
          status,
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

      if(dbCardIndex >= 0 && classroomCard.status === 'unknown') {
        classroomCard.status = dbCards[dbCardIndex].status
      } else if(classroomCard.status === 'unknown'){
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

export const getCardsToUpdateStatus = createSelector(
  getAllCardsWithStatus,
  getDatabaseCards,
  (allCards, dbCards) => {
    return allCards.filter(({courseId, courseWorkId, status}) => {
      let dbCardIndex = dbCards.findIndex((dbCard) => courseId === dbCard.courseId && courseWorkId === dbCard.courseWorkId && status === dbCard.status)

      return dbCardIndex < 0
    })
  }
)