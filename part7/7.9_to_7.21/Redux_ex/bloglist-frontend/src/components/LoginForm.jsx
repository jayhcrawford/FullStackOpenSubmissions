import React from 'react'
import { Button, TextField } from '@mui/material'

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleLogin}>
      <div>
        <TextField
          id="username-input"
          label="Username"
          variant="filled"
          data-testid="Username"
          type="text"
          value={props.username}
          name="username"
          onChange={({ target }) => props.setUsername(target.value)}
          autoComplete="on"
        />
      </div>
      <div>
        <TextField
          id="password-input"
          label="Password"
          variant="filled"
          data-testid="Password"
          type="password"
          value={props.password}
          name="password"
          onChange={({ target }) => props.setPassword(target.value)}
        />
      </div>
      <Button variant="contained" data-testid="login-button" type="submit">
        Login
      </Button>
    </form>
  )
}

export default LoginForm
