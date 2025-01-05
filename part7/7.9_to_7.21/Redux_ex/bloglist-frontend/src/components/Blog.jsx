import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Blog = React.forwardRef((props, ref) => {

  return (
    <>
      <div data-testid="whole-blog">
        <h2>{props.passedBlog.title}</h2>
        <p>
          <b>Author:</b> {props.passedBlog.author}
        </p>

        <Link to={props.passedBlog.url} target="_blank">
          {props.passedBlog.url}
        </Link>
        <div>
          <b>Likes:</b> {props.passedBlog.likes}{' '}
          <button
            data-testid="like-button"
            onClick={() => props.likeHandler(props.passedBlog)}
          >
            Like
          </button>
        </div>
        <p>
          <b>Added by user:</b> {props.passedBlog.user.username}
        </p>
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
      <div>
        <h3>Comments</h3>
          <input name="comment" onChange={({ target }) => props.setComment(target.value)} value={props.comment}></input>
          <button type="submit" onClick={() => props.addComment(props.comment, props.passedBlog)}>Add a comment</button>
          <ul>
            {props.passedBlog.comments.map((comment) => {
              return (
                <li key={comment}>{comment}</li>
              )
            })}
          </ul>
      </div>
    </>
  )
})
/*
Blog.propTypes = {
  passedBlog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}
  */

export default Blog
