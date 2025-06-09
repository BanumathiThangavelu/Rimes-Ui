import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { POST_API } from '../constant/endpoints';
import { getHeaders } from '../utils/api-headers';
import { toast } from 'react-toastify';

const useDeletePost = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deletePost = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${POST_API.DELETE_POST}${id}`, {
        headers: getHeaders(),
      });

      toast.success('Post deleted successfully!');
    } catch (err) {
      const axiosError = err as AxiosError;
      setError(axiosError.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return [
    deletePost,
    {
      isLoading: loading,
      error,
    },
  ] as const;
};

export default useDeletePost;
