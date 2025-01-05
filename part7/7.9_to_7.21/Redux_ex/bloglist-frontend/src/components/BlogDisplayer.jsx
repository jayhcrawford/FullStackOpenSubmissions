import React from 'react'
import { Link } from 'react-router-dom'

import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'

const BlogDisplayer = (props) => {
  const blogsPassedIn = [...props.allBlogs]
  if (blogsPassedIn) {
    return (
      <Box
        sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}
      >
        <List>
          {blogsPassedIn
            ? blogsPassedIn
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => {
                  return (
                    <>
                      <Link to={`/blogs/${blog.id}`}>
                        <ListItem key={blog.id} disablePadding>
                          <ListItemButton>
                            <ListItemText
                              primary={`${blog.title} by ${blog.author}`}
                            />
                          </ListItemButton>
                        </ListItem>
                      </Link>
                      <Divider />
                    </>
                  )
                })
            : null}
        </List>
      </Box>
    )
  }

  return null
}
export default BlogDisplayer
