import React from "react"
import { useState } from "react"
import loginService from "../services/login"
import blogService from "../services/blogs"

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    const loggedIn = await loginService.login({ username: username, password: password })

    //401: invalid user
    if (loggedIn == 401) {
      props.postNotification({ type: "red", text: "Username or Password Invalid" })
    } else {
      //store the token in local storage
      window.localStorage.setItem('userLoggedIn', JSON.stringify(loggedIn))
      //set the user state
      props.setUser(loggedIn)
    }

  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          data-testid="Username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          autoComplete="on"
        />
      </div>
      <div>
        password
        <input
          data-testid="Password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button data-testid="login-button" type="submit">Login</button>
    </form>
  )
}


export default LoginForm