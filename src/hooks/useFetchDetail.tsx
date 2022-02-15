import { useState, useCallback, useEffect } from 'react';
import axios from '../utils/axios';

function useFetchDetail<T, D>(id: string, type: D) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [refresh, setRefresh] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get<T>(`/${type}/${id}`, {
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
