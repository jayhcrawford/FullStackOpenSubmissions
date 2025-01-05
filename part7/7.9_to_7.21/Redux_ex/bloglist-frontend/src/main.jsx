import ReactDOM from 'react-dom/client'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { Container, createTheme} from '@mui/material'


import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial'
    ].join(','),
  },
});


const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Router>
    <Provider store={store}>
      <Container>
      <App />
      </Container>
    </Provider>
  </Router>
)
