import React from 'react'

import { createContext, useReducer, useContext } from 'react'


const loggedInReducer = (state, action) => { 
    switch(action.type) {
      case "LOGIN":
        return action
      case "LOGOUT":
        return null
      default:
        return state
      }
  }

  const LoggedInContext = createContext('')

  export const LoggedInContextProvider = (props) => {
    const [userLoggedIn, userLoggedInDispatch] = useReducer(loggedInReducer, '')

    return  (
        <LoggedInContext.Provider value={[userLoggedIn, userLoggedInDispatch]}>
            {props.children}
        </LoggedInContext.Provider>
    )
  }

export default LoggedInContext
