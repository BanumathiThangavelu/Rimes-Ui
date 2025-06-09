/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { POST_API } from '../constant/endpoints';
import { getHeaders } from '../utils/api-headers';
import type { PostTypeRes } from '../types/post';

// Define Post type (adjust based on your actual API response)
const useGetPosts = () => {
  const [data, setData] = useState<PostTypeRes[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res: any = await axios.get<PostTypeRes[]>(POST_API.GET_POSTS, {
        headers: getHeaders(),
      });
      setTimeout(() => {
        setData(res?.data?.result || []);
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
    fetchPosts();
  }, []);

  return { data, isLoading: loading, error, refetch: fetchPosts };
};

export default useGetPosts;
