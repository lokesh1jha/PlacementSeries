// import { useState } from 'react'
import './App.css'
import FetchUsers from './components/FetchUsers'
import UserDetail from './components/UsersDetail'
import ErrorPatterns from './components/ErrorPatterns'

function App() {

  return (
    <>
    Hello world
    <FetchUsers />
    <UserDetail />
    <ErrorPatterns />
    </>
  )
}

export default App
