let timeoutId = 0
const initialState = {}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      clearTimeout(timeoutId)
      return { ...state, message: action.data.message, type: action.data.type }
    case 'CLEAR_NOTIFICATION':
      return initialState
    default:
      return state
  }
}

export const setNotification = (message, type, timer) => {
  return async (dispatch) => {
    dispatch({ type: 'SET_NOTIFICATION', data: { message, type } })
    timeoutId = setTimeout(
      () => dispatch({ type: 'CLEAR_NOTIFICATION' }),
      timer * 1000
    )
  }
}

export default notificationReducer
