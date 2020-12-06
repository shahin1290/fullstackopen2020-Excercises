import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data

    case 'NEW_BLOG': {
      return [...state, action.data]
    }
    case 'NEW_COMMENT': {
      return state.map((blog) =>
        blog.id !== action.data.id ? blog : action.data
      )
    }
    case 'DELETE_BLOG': {
      return state.filter((blog) => blog.id !== action.data)
    }

    case 'LIKE_BLOG': {
      const blogToUpdate = state.find((blog) => blog.id === action.data.id)
      blogToUpdate.likes++
      return state.map((blog) =>
        blog.id === action.data.id ? blogToUpdate : blog
      )
    }

    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({ type: 'INIT_BLOGS', data: blogs })
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject)
    dispatch({ type: 'NEW_BLOG', data: newBlog })
  }
}

export const createComment = (id, comment) => {
  return async (dispatch) => {
    const newComment = await blogService.addComment(id, comment)

    dispatch({ type: 'NEW_COMMENT', data: newComment })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.destroy(id)
    dispatch({ type: 'DELETE_BLOG', data: id })
  }
}

export const likeBlog = (blogToUpdate) => {
  return async (dispatch) => {
    const returnedBlog = await blogService.update(blogToUpdate)
    dispatch({ type: 'LIKE_BLOG', data: returnedBlog })
  }
}

export default blogReducer
