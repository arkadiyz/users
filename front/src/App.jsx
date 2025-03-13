import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import { setNavigate } from './services/error.service';
import HomePage from './Pages/HomePage/HomePage';
import Login from './Pages/Auth/Login';
import SignUp from './Pages/Auth/SignUp';

function App() {
  return (
    <div className='App'>
      <Router>
        <NavigationInitializer />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/homepage' element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

function NavigationInitializer() {
  const navigate = useNavigate();
  setNavigate(navigate);
  return null;
}

export default App;
