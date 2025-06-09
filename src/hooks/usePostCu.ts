import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { POST_API } from '../constant/endpoints';
import { getHeaders } from '../utils/api-headers';
import type { PostTypeRes } from '../types/post';

const usePostCu = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOrUpdatePost = async (post: PostTypeRes) => {
    setIsLoading(true);
    setError(null);

    try {
      if (post._id) {
        // Update existing post (PUT)
        await axios.put(`${POST_API.UPDATE_POST}`, post, {
          headers: getHeaders(),
        });
        toast.success('Post updated successfully!');
      } else {
        // Create new post (POST)
        await axios.post(POST_API.CREATE_POST, post, {
          headers: getHeaders(),
        });
        toast.success('Post created successfully!');
      }
    } catch (err) {
      const axiosError = err as AxiosError;
      const message = axiosError.message || 'Something went wrong';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return [createOrUpdatePost, { isLoading, error }] as const;
};

export default usePostCu;
