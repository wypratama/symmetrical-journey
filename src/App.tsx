import { useEffect } from 'react';
import './assets/styles/App.css';
import { Route, Routes } from 'react-router-dom';
import { Home, MovieDetail, Watchlist } from './views';
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
        <Route path='watchlist' element={<Watchlist />} />
      </Routes>
      <Navbar />
    </div>
  );
}

export default App;
