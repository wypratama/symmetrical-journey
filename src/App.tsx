import { useEffect, useState } from 'react';
import './assets/styles/App.css';
import { Route, Routes } from 'react-router-dom';
import { Home, MovieDetail, Watchlist } from './views';
import { Navbar } from './components/partials';
import useFetchMovies from './hooks/useFetchMovies';

function App() {
  const [mount, setMount] = useState(false),
    fetchMovie = useFetchMovies(),
    fetchSerie = useFetchMovies({}, 'tv');
  useEffect(() => {
    if (!mount) {
      setMount(true);
      fetchMovie();
      fetchSerie();
    }
  }, [mount, fetchMovie]);
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='movie/:id' element={<MovieDetail />} />
        <Route path='tv/:id' element={<MovieDetail />} />
        <Route path='watchlist' element={<Watchlist />} />
      </Routes>
      <Navbar />
    </div>
  );
}

export default App;
