import { useState, useEffect } from 'react'
import React from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = React.forwardRef((props, ref) => {
  const [viewDetails, setViewDetails] = useState(false)

  const handleViewBlog = () => {
    setViewDetails(!viewDetails)
  }

  if (!viewDetails) {
    return (
      <div>
        <p>
          {props.passedBlog.title} - {props.passedBlog.author}{' '}
          <button
            data-testid="make-blog-visible"
            className="show-blog"
            onClick={handleViewBlog}
          >
            View Details
          </button>
        </p>
      </div>
    )
  } else {
    return (
      <div data-testid="whole-blog">
        <p>
          {props.passedBlog.title} - {props.passedBlog.author}{' '}
          <button className="hide-blog" onClick={handleViewBlog}>
            Hide Details
          </button>{' '}
        </p>
        <p>Blog URL: {props.passedBlog.url}</p>
        <div>
          Likes:{' '}
          <p className="likes-displayer" data-testid="like-count">
            {props.passedBlog.likes}
          </p>{' '}
          <button
            data-testid="like-button"
            onClick={() => props.likeHandler(props.passedBlog)}
          >
            Like
          </button>
        </div>
        <p>User: {props.user.username}</p>
        {props.user.username == props.passedBlog.user.username && (
          <p>
            <button
              data-testid="delete-blog"
              onClick={() => props.deleteHandler(props.passedBlog.id)}
            >
              Delete
            </button>
          </p>
        )}
      </div>
    )
  }
})
/*
Blog.propTypes = {
  passedBlog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}
  */

export default Blog
