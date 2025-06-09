import React from 'react';
import type { PostTypeRes } from '../../types/post';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { POSTS } from '../../constant/navigation';

type PostProps = {
  post: PostTypeRes;
  handleEdit: (val: string | number) => void;
  handleDelete: (val: string | number) => void;
};

const PostCard: React.FC<PostProps> = ({ post, handleEdit, handleDelete }) => {
  const navigate = useNavigate();
  return (
    <Grid id="post-card" size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0px 2px 10px gray',
          position: 'relative',
        }}
      >
        <CardMedia
          component="img"
          sx={{
            height: 300,
            objectFit: 'cover',
          }}
          image={post.imageUrl}
          alt={post.title}
        />
        <CardContent>
          <Typography
            onClick={() => navigate(`${POSTS}/${post._id}`)}
            className="post-title"
            variant="h6"
            style={{ cursor: 'pointer' }}
          >
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {post.author} | {post.category}
          </Typography>
          <Box mt={1} mb={1} display="flex" flexWrap="wrap" gap={1}>
            {post?.tags?.split(',')?.length &&
              post?.tags
                ?.split(',')
                ?.map((tag) => (
                  <Chip className="tag" key={tag} label={tag} size="small" />
                ))}
          </Box>
          <div
            className="showActionBtn"
            style={{
              right: -100,
              top: 5,
            }}
          >
            <div
              style={{ marginBottom: 5 }}
              onClick={() => handleEdit(post?._id as string)}
              className="action-btn edit"
            >
              Edit
            </div>
            <div
              onClick={() => handleDelete(post?._id as string)}
              className="action-btn delete"
            >
              Delete
            </div>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PostCard;
