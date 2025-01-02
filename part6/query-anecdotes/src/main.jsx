import ReactDOM from 'react-dom/client'
import React from 'react'

import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotifierContextProvider } from './NotifierContext'

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotifierContextProvider>
      <App />
    </NotifierContextProvider>
  </QueryClientProvider>

)