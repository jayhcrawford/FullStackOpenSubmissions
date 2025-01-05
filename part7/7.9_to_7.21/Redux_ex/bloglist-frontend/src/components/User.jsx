import React from 'react'
import { Link } from 'react-router-dom'

const User = (props) => {
  return (
    <>
      <h2>{props.singleUser.name}</h2>
      <p>
        <b>username:</b> {props.singleUser.username}
      </p>
      <h4>Added Blogs</h4>
      <ul>
        {props.allBlogs.map((blog) => {
          if (blog.user.username == props.singleUser.username) {
            return <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>
          } else {
            return null
          }
        })}
      </ul>
    </>
  )
}

export default User
