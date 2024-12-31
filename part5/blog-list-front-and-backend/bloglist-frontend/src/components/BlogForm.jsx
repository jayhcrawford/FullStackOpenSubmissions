import React from "react"
import { useState } from "react"

const BlogForm = (props) => {
  return (
      <form onSubmit={props.submitHandler}>
        Blog Title:
        <input
          id={"blog-title"}
          data-testid="blog-title-input"
          value={props.newBlogTitle}
          onChange={({ target }) => props.setNewBlogTitle(target.value)}
        /><br />
        Author:       <input
          id={"blog-author"}
          data-testid="blog-author-input"
          value={props.newBlogAuthor}
          onChange={({ target }) => props.setNewBlogAuthor(target.value)}
        /><br />
        URL:       <input
          id={"blog-url"}
          data-testid="blog-url-input"
          value={props.newBlogUrl}
          onChange={({ target }) => props.setNewBlogUrl(target.value)}
        /><br />
        <button type="submit" data-testid="blog-submit" id="form-submit-button">Create</button><br />
      </form>
  )
}

export default BlogForm