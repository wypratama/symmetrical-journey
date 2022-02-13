import { useCallback, useEffect, useState } from 'react';
import { IMovieDetail } from '../utils/types';

function useWatchList(): any {
  const [watchList, setWatchList] = useState<Array<IMovieDetail> | []>([]),
    [load, setLoad] = useState(false),
    reload = useCallback(() => setLoad(true), []),
    addToWatchList = useCallback((movie: IMovieDetail) => {
      setWatchList([...watchList, movie]);
      localStorage.setItem('watchlist', JSON.stringify([...watchList, movie]));
    }, []),
    removeFromWatchList = useCallback((movie: IMovieDetail) => {
      const newList = watchList.filter((item) => item.id !== movie.id);
      setWatchList(newList);
      localStorage.setItem('watchlist', JSON.stringify(newList));
    }, []),
    inWatchList = useCallback(
      (movieId: number) => {
        return watchList.some((item) => item.id === movieId);
      },
      [watchList]
    );
  useEffect(() => {
    setLoad(false);
    const currentList = localStorage.getItem('watchlist');
    if (currentList) {
      setWatchList(JSON.parse(currentList));
    }
  }, [load]);
  return {
    watchList,
    reload,
    addToWatchList,
    removeFromWatchList,
    inWatchList,
  };
}
export default useWatchList;
