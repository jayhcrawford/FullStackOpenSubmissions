import React from 'react'

import { createContext, useReducer, useContext } from 'react'


const notificationReducer = (state, action) => {

    switch(action.type) {
      case "NOTIFY":
        return action.message
      case "RESET":
        return ''
      default:
        return state
      }
  }

  const NotifierContext = createContext()

  export const NotifierContextProvider = (props) => {
    const [notifier, notifierDispatch] = useReducer(notificationReducer, '')

    return  (
        <NotifierContext.Provider value={[notifier, notifierDispatch]}>
            {props.children}
        </NotifierContext.Provider>
    )
  }

export const useNotifierValue = () => {
    const notifierAndDispatch = useContext(NotifierContext)
    return notifierAndDispatch[0]
  }

export const useNotifierDispatch = () => {
    const notifierAndDispatch = useContext(NotifierContext)
    return notifierAndDispatch[1]
  }

export default NotifierContext
