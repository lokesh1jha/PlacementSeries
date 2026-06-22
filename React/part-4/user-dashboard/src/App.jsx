import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
// import Hero from './pages/hero';
import Home from './pages/home';
import Welcome from './pages/welcome';
import NotFound from './pages/notFound';
import RootLayout from './layouts/RootLayout';
import ProtectedRoutes from './components/ProtectedRoutes';
import UserList from './pages/UsersList';
import UserDetails from './pages/UserDetails';

function App() {
  return (
    <Routes>
      <Route path='/' element={<RootLayout />} >
        <Route index element={<Home />} />
        <Route path='/users' element={<UserList />} />
        <Route path='/users/:id' element={<UserDetails />} />

        {/* Protected routes wrapped in ProtectedRoute */}
        <Route path='/welcome'

          element={
            <ProtectedRoutes isAuthenticated={false}>
              <Welcome />
            </ProtectedRoutes>} />
        {/* <Route path='/user/:id' element={<UserDetail />} /> */}
        {/* <Route path='/userRelation/:userid/:managerid' element={<UserDetail />} /> */}

        {/* <Route path='/users' element={<UsersList />} /> */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes >
  )
}


export default App;
