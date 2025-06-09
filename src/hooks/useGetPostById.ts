/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { POST_API } from '../constant/endpoints';
import { getHeaders } from '../utils/api-headers';
import type { PostTypeRes } from '../types/post';

const useGetPostById = ({ id }: { id: string }) => {
  const [data, setData] = useState<PostTypeRes | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPost = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get<{ result: PostTypeRes }>(
        `${POST_API.GET_POST_BY_ID}${id}`,
        {
          headers: getHeaders(),
        },
      );

      // Simulate a delay (optional)
      setTimeout(() => {
        setData(res.data.result ?? null);
      }, 500);
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || 'Something went wrong');
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    if (id) fetchPost();
  }, [id]);

  return { data, isLoading: loading, error, refetch: fetchPost };
};

export default useGetPostById;
