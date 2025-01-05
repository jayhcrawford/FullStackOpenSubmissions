import React from 'react'
import { Link } from 'react-router-dom'

const BlogDisplayer = (props) => {
  const blogsPassedIn = [...props.allBlogs]
  if (blogsPassedIn) {
    return (
      <ul>
        {blogsPassedIn
          ? blogsPassedIn
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => {
                return (
                  <p key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </p>
                )
              })
          : null}
      </ul>
    )
  }

  return null
}
export default BlogDisplayer
