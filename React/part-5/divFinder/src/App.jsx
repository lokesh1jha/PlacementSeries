import './App.css'
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import UserDetails from './pages/UserDetails';
import UsersRepos from './pages/UsersRepos';
import NotFound from './pages/NotFound';
import RootLayout from './layouts/RootLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="users/:username" element={<UserDetails />} />
        <Route path="users/:username/repos" element={<UsersRepos />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>

  )
}


export default App;
