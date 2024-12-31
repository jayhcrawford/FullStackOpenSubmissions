import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {LikeButton} from './Blog'
import Blog from './Blog'


const testPost = {
  title: 'test-post',
  author: 'Jay Wellington Crawford',
  url: 'www.google.com',
  likes: 1000000,
  user: {
      username: "root"
  }
}

test('renders blog', () => {

  const {container} = render(<Blog passedBlog={testPost} />)

  const element = screen.getByText(`${testPost.title} - ${testPost.author}`)
  expect(element).toBeDefined()

  
  const username = container.querySelector('.username')
  const url = container.querySelector('.blogUrl')
  const likes = container.querySelector('.likeCounter')
  
  expect(username).toBeFalsy()
  expect(url).toBeFalsy()
  expect(likes).toBeFalsy()
})

test('clicking the view button displays the URL, likes, and user', async () => {
    const testPost = {
        title: 'test-post',
        author: 'Jay Wellington Crawford',
        url: 'www.google.com',
        likes: 1000000,
        user: {
            username: "root"
        }
      }
    
    const mockHandler = vi.fn()
    
    const {container} = render(<Blog user={testPost.user.username} passedBlog={testPost} onClick={mockHandler}/>)


    const user = userEvent.setup()
    const button = screen.getByText('View Details')
    await user.click(button)
      

    const username = container.querySelector('.username')
    const url = container.querySelector('.blogUrl')
    const likes = container.querySelector('.likeCounter')
    
    expect(username).toBeDefined()
    expect(url).toBeDefined()
    expect(likes).toBeDefined()

})

test('clicking the like button twice calls the handleLike function twice', async () => {
  const testPost = {
    title: 'test-post',
    author: 'Jay Wellington Crawford',
    url: 'www.google.com',
    likes: 1000000,
    user: {
        username: "root"
    }
  }

  const mockHandler = vi.fn()
    
  const {container} = render(<LikeButton handleLike={mockHandler}/>)
  const user = userEvent.setup()


  const likeButton = screen.getByText('Like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})