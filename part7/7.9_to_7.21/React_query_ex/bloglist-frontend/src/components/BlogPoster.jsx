import { useState } from 'react'
import blogService from '../services/blogs'
import BlogForm from './BlogForm'

const BlogPoster = (props) => {
  const [isVisible, setIsVisible] = useState(false)

  //passed down to BlogForm.jsx
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')

  let newPost = {
    title: newBlogTitle,
    author: newBlogAuthor,
    url: newBlogUrl,
    user: props.user.id,
  }

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  const submitHandler = async (event) => {
    event.preventDefault()

    //if content is improperly formatted, notify
    if (
      newBlogAuthor === '' ||
      newBlogTitle === '' ||
      newBlogUrl === '' ||
      newBlogAuthor.length < 3 ||
      newBlogTitle.length < 3
    ) {
      //send a notification
      props.postNotification({
        type: 'red',
        text: 'Every Blog must have a title, author, and URL; The title and author must be greater than 3 characters',
      })

      //else post the content
    } else {
      //post new blog post
      const postedBlog = await blogService.create(newPost)

      //temporary value to pass for id in state, to avoid error for lacking key (key is set to blog.id in Blog.jsx)
      let newPostWithKey = newPost
      newPostWithKey.id = 'still-in-state'

      //update state with new blog post information
      const newBlogList = props.listOfAllBlogs.concat(newPostWithKey)
      props.setListOfAllBlogs(newBlogList)

      //Post a notification
      props.postNotification({
        type: 'green',
        text: `${newBlogTitle} by ${newBlogAuthor} was posted`,
      })

      //reset state of component
      setIsVisible(false)
      setNewBlogTitle('')
      setNewBlogUrl('')
      setNewBlogAuthor('')
    }
  }

  if (isVisible) {
    return (
      <>
        <div>
          <BlogForm
            submitHandler={submitHandler}
            newBlogTitle={newBlogTitle}
            setNewBlogTitle={setNewBlogTitle}
            newBlogUrl={newBlogUrl}
            setNewBlogUrl={setNewBlogUrl}
            newBlogAuthor={newBlogAuthor}
            setNewBlogAuthor={setNewBlogAuthor}
          />
        </div>
        <button
          data-testid="make-blogForm-hidden"
          onClick={handleToggleVisibility}
        >
          Cancel
        </button>
      </>
    )
  } else {
    return (
      <>
        <button
          data-testid="make-blogForm-visible"
          onClick={handleToggleVisibility}
        >
          New Blog
        </button>
      </>
    )
  }
}

export default BlogPoster
