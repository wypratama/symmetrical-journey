import { useCallback } from 'react';
import axios from '../utils/axios';
import type { APIResponse } from '../utils/types';
import { fetchMovie, useStateContext } from './useStore';

function useFetchMovies(params: any = {}) {
  const { dispatch } = useStateContext();

  return useCallback(async () => {
    try {
      const { data } = await axios.get<APIResponse>('/discover/movie', {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
          ...params,
        },
      });

      console.log(data, 'dari useFetchMovies');

      dispatch(fetchMovie(data));
    } catch (error) {
      console.log(error);
    }
  }, [params, dispatch]);
}
export default useFetchMovies;
