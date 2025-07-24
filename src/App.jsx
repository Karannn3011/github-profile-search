import React from 'react'
import Header from './Header'
import { UserProvider } from './context/UserContext'

import Body from './Body'
const App = () => {
  return (
    <>
    <UserProvider>
    <Header />
    <Body />
    </UserProvider>
    </>
    
  )
}

export default App