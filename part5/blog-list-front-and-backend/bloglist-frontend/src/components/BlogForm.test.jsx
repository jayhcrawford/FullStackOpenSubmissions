import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test } from 'vitest'
import BlogForm from './BlogForm'

  //Information for filling inputs
  const testPost = {
    title: 'test-post',
    author: 'Jay Wellington Crawford',
    url: 'www.google.com',
    likes: 1000000
  }

test('posts a new blog', async () => {
  //Mock state
  let newBlogTitle = testPost.title;
  let newBlogUrl = testPost.url;
  let newBlogAuthor = testPost.author;

  const mockHandler = vi.fn(e => e.preventDefault())

  const { container } = render(<BlogForm submitHandler={mockHandler} newBlogTitle={newBlogTitle} newBlogAuthor={newBlogAuthor} newBlogUrl={newBlogUrl}/>)

  const user = userEvent.setup()

  const author = container.querySelector('#blog-author')
  const url = container.querySelector('#blog-url')
  const title = container.querySelector('#blog-title')

  const submitButton = container.querySelector('#form-submit-button')

  screen.debug()
  
  expect(author).toBeDefined()
  expect(url).toBeDefined()
  expect(title).toBeDefined()

  expect(author.value).toBe(testPost.author)
  expect(url.value).toBe(testPost.url)
  expect(title.value).toBe(testPost.title)

  await fireEvent.click(submitButton)

  expect(mockHandler.mock.calls).toHaveLength(1)
 
})
