import React from 'react'
import { useState } from 'react'

const BlogForm = (props) => {

  const handleVisibility = () => {
    props.setVisible(!props.isVisible)
  }

  if (props.isVisible) {
    return (
      <>
        {' '}
        <form onSubmit={props.addBlog}>
          Blog Title:
          <input
            id={'blog-title'}
            data-testid="blog-title-input"
            name="title"
            value={props.newBlogTitle}
            onChange={({ target }) => props.setNewBlogTitle(target.value)}
          />
          <br />
          Author:{' '}
          <input
            id={'blog-author'}
            data-testid="blog-author-input"
            name="author"
            value={props.newBlogAuthor}
            onChange={({ target }) => props.setNewBlogAuthor(target.value)}
          />
          <br />
          URL:{' '}
          <input
            id={'blog-url'}
            data-testid="blog-url-input"
            name="url"
            value={props.newBlogUrl}
            onChange={({ target }) => props.setNewBlogUrl(target.value)}
          />
          <br />
          <button
            type="submit"
            data-testid="blog-submit"
            id="form-submit-button"
          >
            Create
          </button>
          <br />
        </form>
        <button onClick={handleVisibility}>Close Blog Form</button>
      </>
    )
  } else {
    return <button onClick={handleVisibility}>Create New Blog</button>
  }
}

export default BlogForm
