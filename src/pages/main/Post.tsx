import React, { useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import type { PostTypeRes } from '../../types/post';
import PostCard from '../../components/post-ui/PostCard';
import { postSchema } from '../../utils/validations';
import PostModel from '../../components/post-ui/PostModel';
import CustomInput from '../../components/ui/CustomInput';
import CustomButton from '../../components/ui/CustomButton';
import useGetPosts from '../../hooks/useGetPosts';
import Loader from '../../components/ui/Loader';
import useDeletePost from '../../hooks/useDeletePost';
import usePostCu from '../../hooks/usePostCu';

const emptyForm = {
  userId: '',
  title: '',
  content: '',
  author: '',
  category: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  imageUrl: '',
  tags: '',
};

const PostList: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<PostTypeRes>(emptyForm);

  // api's
  const { data: posts, isLoading, refetch } = useGetPosts();
  const [DeletePost] = useDeletePost();
  const [CuPost, { isLoading: isLoadingCu }] = usePostCu();

  const handleEdit = (id: number | string) => {
    const findIndex = posts.findIndex((i) => i._id === id);
    if (findIndex !== -1) {
      setEditIndex(id as string);
      setForm(posts[findIndex]);
      setOpen(true);
    }
  };

  const handleDelete = async (id: number | string) => {
    try {
      const res = await DeletePost(id as string);
      console.log('ress', res, id);
      refetch();
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'tags') {
      console.log('value,', value);

      setForm((prev) => ({
        ...prev,
        tags: value,
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };
  console.log('name,', form);

  const handleClear = () => {
    setOpen(false);
    setEditIndex(null);
    setErrors({});
    setForm(emptyForm);
  };

  const handleSave = async () => {
    try {
      const result = postSchema.safeParse(form);

      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.errors.forEach((err) => {
          if (err.path.length > 0) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
        console.log('errors validata', fieldErrors);

        return;
      }

      await CuPost({
        ...form,
        id: editIndex ? editIndex : '',
      });
      refetch();
      handleClear();
    } catch (error) {
      console.error('error', error);
    }
  };

  const filteredPosts = posts.filter((post) => {
    const search = searchTerm.toLowerCase();
    return (
      post.title.toLowerCase().includes(search) ||
      post.author.toLowerCase().includes(search) ||
      post.category.toLowerCase().includes(search) ||
      post.content.toLowerCase().includes(search) ||
      post?.tags?.toLowerCase().includes(search)
    );
  });

  return (
    <Box p={4}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Typography sx={{ fontWeight: '700' }} variant="h5" gutterBottom>
          Posts ({posts?.length})
        </Typography>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 10,
            marginBottom: '20px',
          }}
        >
          <CustomInput
            sx={{ width: '300px' }}
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <CustomButton
            style={{ width: '100px' }}
            label="Add Post"
            variant="contained"
            onClick={() => setOpen(true)}
          />
        </div>
      </div>

      {(isLoading || isLoadingCu) && <Loader />}
      <Grid container spacing={3}>
        {filteredPosts.map((post, index) => (
          <PostCard
            key={index}
            post={post}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </Grid>

      {/* add and edit modal */}
      <PostModel
        open={open}
        type={editIndex !== null ? 'Edit' : 'Add'}
        form={form}
        errors={errors}
        handleChange={handleChange}
        handleClear={handleClear}
        handleSave={handleSave}
      />
    </Box>
  );
};

export default PostList;
