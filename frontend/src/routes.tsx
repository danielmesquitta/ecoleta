import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import CreatePoint from './pages/CreatePoint'
import Map from './pages/Map'

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route path="/create-point" component={CreatePoint} />
      <Route path="/maps" component={Map} />
    </BrowserRouter>
  )
}

export default Routes
