import ReactDOM from 'react-dom/client'
import App from './App'
import { NotifierContextProvider } from './NotifierContext'
import { LoggedInContextProvider } from './LoggedInContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <LoggedInContextProvider>
      <NotifierContextProvider>
        <App />
      </NotifierContextProvider>
    </LoggedInContextProvider>
  </QueryClientProvider>
)
