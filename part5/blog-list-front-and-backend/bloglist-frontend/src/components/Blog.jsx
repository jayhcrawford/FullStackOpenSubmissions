import { useState, useEffect } from "react"
import React from "react"
import blogService from "../services/blogs"
import PropTypes from 'prop-types'

export const LikeButton = (props) => {
  return (
    <button data-testid="like-button" onClick={props.handleLike}>Like</button>
  )
}

const Blog = React.forwardRef((props, ref) => {

  const [viewDetails, setViewDetails] = useState(false)
  const [likeCount, setLikeCount] = useState(props.passedBlog.likes)

  const handleViewBlog = () => {
    setViewDetails(!viewDetails)
  }

  const handleLike = async () => {
    //update state
    setLikeCount(likeCount + 1)

    //append new likes value to blog in state and PUT
    let blogWithNewLikes = props.passedBlog
    blogWithNewLikes.likeCount = likeCount + 1
    await blogService.putLike(blogWithNewLikes)
  }

  if (!viewDetails) {
    return (
      <div>
        <p>{props.passedBlog.title} - {props.passedBlog.author} <button data-testid="make-blog-visible" className="show-blog" onClick={handleViewBlog}>View Details</button></p>
      </div>
    )
  }
  else {
    return (
      <div data-testid="whole-blog">
        <p>{props.passedBlog.title} - {props.passedBlog.author} <button className="hide-blog" onClick={handleViewBlog}>Hide Details</button> </p>
        <p>Blog URL: {props.passedBlog.url}</p>
        <div>Likes: <p className="likes-displayer" data-testid="like-count">{likeCount}</p> <LikeButton handleLike={handleLike} /></div>
        <p>User: {props.user.username}</p>
        {props.user.username == props.passedBlog.user.username && <p><button data-testid="delete-blog" onClick={() => props.handleDelete(props.passedBlog.id)}>Delete</button></p>}
      </div>
    )
  }
})



Blog.propTypes = {
  passedBlog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}



export default Blog