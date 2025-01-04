import React from 'react'
import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleLogin}>
      <div>
        username
        <input
          data-testid="Username"
          type="text"
          value={props.username}
          name="username"
          onChange={({ target }) => props.setUsername(target.value)}
          autoComplete="on"
        />
      </div>
      <div>
        password
        <input
          data-testid="Password"
          type="password"
          value={props.password}
          name="password"
          onChange={({ target }) => props.setPassword(target.value)}
        />
      </div>
      <button data-testid="login-button" type="submit">
        Login
      </button>
    </form>
  )
}

export default LoginForm
