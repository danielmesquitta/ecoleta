import React from 'react'
import { ToastContainer } from 'react-toastify'

import GlobalStyles from './styles/global'
import Routes from './routes'

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <ToastContainer autoClose={5000} />
      <Routes />
    </>
  )
}

export default App
