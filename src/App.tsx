import React from 'react';
import logo from './logo.svg';
import './assets/styles/App.css';
import { Link, Route, Routes } from 'react-router-dom';
import { Home, MovieDetail } from './views';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='detail' element={<MovieDetail />} />
      </Routes>
      <nav>
        <Link to='/'>Home</Link>
      </nav>
    </div>
  );
}

export default App;
