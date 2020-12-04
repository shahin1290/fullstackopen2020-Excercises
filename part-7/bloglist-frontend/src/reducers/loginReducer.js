import blogService from '../services/blogs'
import loginService from '../services/login'

const initialState = null

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER': {
      return action.data
    }

    case 'SET_USER': {
      return action.data
    }

    case 'LOGOUT': {
      return initialState
    }

    default:
      return state
  }
}

export const getCurrentUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)

      dispatch({ type: 'GET_USER', data: user })
    }
  }
}

export const setCurrentUser = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password })

    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogService.setToken(user.token)

    dispatch({ type: 'SET_USER', data: user })
  }
}

export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem('loggedBlogappUser')

    dispatch({ type: 'LOGOUT' })
  }
}

export default loginReducer
