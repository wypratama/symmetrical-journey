import { useEffect } from 'react';
import './assets/styles/App.css';
import { Route, Routes } from 'react-router-dom';
import { Home, MovieDetail } from './views';
import { Navbar } from './components/partials';
import useFetchMovies from './hooks/useFetchMovies';

function App() {
  const fetchMovie = useFetchMovies();
  useEffect(() => {
    fetchMovie();
  }, []);
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='detail/:id' element={<MovieDetail />} />
      </Routes>
      <Navbar />
    </div>
  );
}

export default App;
