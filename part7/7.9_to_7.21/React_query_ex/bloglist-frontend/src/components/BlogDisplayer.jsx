import React from 'react'
import Blog from './Blog'

const BlogDisplayer = (props) => {
  return (
    <div data-testid="blog-displayer-body">
      {props.listOfAllBlogs
        ? props.listOfAllBlogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => {
              return (
                <Blog
                  key={blog.id}
                  handleDelete={props.handleDelete}
                  setListOfAllBlogs={props.setListOfAllBlogs}
                  listOfAllBlogs={props.listOfAllBlogs}
                  passedBlog={blog}
                  user={props.user}
                  likeHandler={props.likeHandler}
                />
              )
            })
        : null}
    </div>
  )
}
export default BlogDisplayer
