import { useCallback } from 'react';
import axios from '../utils/axios';
import type { APIResponse, IMovie } from '../utils/types';
import { fetchMovie, fetchSeries, useStateContext } from './useStore';

function useFetchMovies<T>(params: any = {}, source: 'movie' | 'tv' = 'movie') {
  const { dispatch } = useStateContext();

  return useCallback(async () => {
    try {
      const { data } = await axios.get(`/discover/${source}`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          ...params,
        },
      });

      if (source === 'movie') {
        const mappedData: IMovie[] = data.results.map((item: any) => ({
          ...item,
          type: 'movie',
        }));
        dispatch(fetchMovie({ ...data, results: mappedData }));
      } else {
        const mappedData: IMovie[] = data.results.map((item: any) => ({
          ...item,
          type: 'tv',
        }));
        dispatch(fetchSeries({ ...data, results: mappedData }));
      }
    } catch (error) {
      console.log(error);
    }
  }, [params, dispatch]);
}
export default useFetchMovies;
