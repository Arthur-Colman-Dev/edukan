export const axiosConfig = ({endpoint, accessToken, filterByStudent, filterByUser}) => {
  let config = {
    method: 'GET',
    url: `https://classroom.googleapis.com/v1/${endpoint}`,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    }
  }
  if (filterByStudent) {
    config.params = {
      studentId: 'me',
    }
  }
  if (filterByUser) {
    config.params = {
      userId: 'me',
    }   
  }
  return config;
}