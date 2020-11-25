import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from '../components/Blog'

const blog = {
  id: '5a422a851b54a676234d17f7',
  title: 'Canonical string reduction',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  likes: 12,
  user: {
    username: 'shahin01',
    name: 'Shahin Patowary',
    id: '5fb4f2bd77d66d263517b611',
  },
}

const users = [
  {
    blogs: ['5a422a851b54a676234d17f7'],
    username: 'shahin01',
    name: 'Shahin Patowary',
    id: '5fb4f2bd77d66d263517b611',
  },
]

test('only render blog title and author by default', async () => {
  const component = render(<Blog blog={blog} user={users[0]} />)

  const defaultRenderDiv = component.container.querySelector('.default-render')
  const toggleRenderDiv = component.container.querySelector('.toggle-render')

  expect(defaultRenderDiv).toHaveTextContent('Canonical string reduction')
  expect(defaultRenderDiv).toHaveTextContent('Edsger W. Dijkstra')

  expect(toggleRenderDiv).toHaveStyle('display: none')
})