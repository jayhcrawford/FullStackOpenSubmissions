import React from 'react'
import { Button } from '@mui/material'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}))

const BlogForm = (props) => {
  const handleVisibility = () => {
    props.setVisible(!props.isVisible)
  }

  if (props.isVisible) {
    return (
      <>
        <form style={{ marginTop: '1em' }} onSubmit={props.handleNewBlogPost}>
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
          <Button
            variant="contained"
            type="submit"
            data-testid="blog-submit"
            id="form-submit-button"
          >
            Create
          </Button>
          <br />
        </form>
        <Button variant="contained" onClick={handleVisibility}>
          Close Blog Form
        </Button>
      </>
    )
  } else {
    return (
      <Button
        variant="contained"
        style={{ marginTop: '1em' }}
        onClick={handleVisibility}
      >
        Add New Blog
      </Button>
    )
  }
}

export default BlogForm
