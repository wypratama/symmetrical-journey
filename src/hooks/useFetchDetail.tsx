import { useState, useCallback, useEffect } from 'react';
import axios from '../utils/axios';
import type { IMovieDetail } from '../utils/types';

function useFetchDetail(id: string) {
  const [data, setData] = useState<IMovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [refresh, setRefresh] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get<IMovieDetail>(`/movie/${id}`, {
        params: {
          api_key: process.env.REACT_APP_API_KEY,
        },
      });
      console.log(data);
      setData(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData, refresh]);

  return { data, loading, error, setRefresh };
}

export default useFetchDetail;
