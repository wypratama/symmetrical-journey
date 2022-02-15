import { useCallback, useEffect, useState } from 'react';
import { IMovieDetail, ISeriesDetail } from '../utils/types';

function useWatchList<T>() {
  const [watchList, setWatchList] = useState<
      Array<IMovieDetail | ISeriesDetail> | []
    >([]),
    [load, setLoad] = useState(false),
    reload = useCallback(() => setLoad(true), []),
    addToWatchList = useCallback(
      (movie: IMovieDetail | ISeriesDetail, type: 'movie' | 'tv') => {
        const newItem = { ...movie, type } as IMovieDetail | ISeriesDetail;
        setWatchList([...watchList, newItem]);
        localStorage.setItem(
          'watchlist',
          JSON.stringify([...watchList, newItem])
        );
      },
      [watchList]
    ),
    removeFromWatchList = useCallback(
      (movie: IMovieDetail | ISeriesDetail) => {
        const newList = watchList.filter((item) => item.id !== movie.id);
        setWatchList(newList);
        localStorage.setItem('watchlist', JSON.stringify(newList));
      },
      [watchList]
    ),
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
