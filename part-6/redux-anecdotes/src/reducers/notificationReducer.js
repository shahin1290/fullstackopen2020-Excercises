const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

export const setNotification = (message, timer) => {
  return async (dispatch) => {
    dispatch({ type: 'SET_NOTIFICATION', message })
    setTimeout(() => dispatch({ type: 'CLEAR_NOTIFICATION' }), timer*1000)
  }
}

export default notificationReducer
