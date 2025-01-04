import React from 'react'
import Blog from './Blog'

const BlogDisplayer = (props) => {
  const blogsPassedIn = [...props.allBlogs]
  if (blogsPassedIn) {
    return (
      <div>
      {blogsPassedIn ? blogsPassedIn
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
                  deleteHandler={props.deleteHandler}
                />
              )
            }) : null} 
      </div>
    )
  }

  return (
    <div data-testid="blog-displayer-body">
      



      
    </div>
  )
}
export default BlogDisplayer