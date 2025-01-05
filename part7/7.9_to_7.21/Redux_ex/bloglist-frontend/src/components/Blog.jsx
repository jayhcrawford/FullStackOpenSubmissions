import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Button, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'

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
          <Button
            variant="contained"
            data-testid="like-button"
            onClick={() => props.likeHandler(props.passedBlog)}
          >
            Like
          </Button>
        </div>
        <p>
          <b>Added by user:</b> {props.passedBlog.user.username}
        </p>
        {props.user.username == props.passedBlog.user.username && (
          <p>
            <Button
              variant="contained"
              data-testid="delete-blog"
              onClick={() => props.deleteHandler(props.passedBlog.id)}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </p>
        )}
      </div>
      <div>
        <h3>Comments</h3>
        <ul>
          {props.passedBlog.comments.map((comment) => {
            return <li key={comment}>{comment}</li>
          })}
        </ul>
        <TextField
          id="comment-input"
          variant="filled"
          name="comment"
          onChange={({ target }) => props.setComment(target.value)}
          value={props.comment}
        />
        <br />
        <Button
          startIcon={<ThumbUpAltIcon />}
          variant="contained"
          type="submit"
          onClick={() => props.addComment(props.comment, props.passedBlog)}
        >
          comment
        </Button>
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
