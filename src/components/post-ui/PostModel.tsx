/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  IconButton,
} from '@mui/material';
import type React from 'react';
import type { PostTypeRes } from '../../types/post';
import CustomInput from '../ui/CustomInput';
import CustomButton from '../ui/CustomButton';
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  open: boolean;
  handleClear: () => void;
  type: string;
  form: PostTypeRes;
  handleChange: (val: any) => void;
  handleSave: () => void;
  errors: any;
};

const PostModel: React.FC<Props> = ({
  open,
  handleClear,
  type,
  form,
  handleChange,
  handleSave,
  errors,
}) => {
  return (
    <Dialog open={open} onClose={handleClear} maxWidth="sm" fullWidth>
      <DialogTitle
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--secondary)',
        }}
      >
        {open ? type + ' Post' : ''}
        <IconButton onClick={handleClear} sx={{ padding: '1px' }}>
          <CloseIcon sx={{ color: 'tomato' }} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ marginTop: 2 }}>
        <Grid container spacing={1.5}>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomInput
              margin="dense"
              label="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              error={!!errors.title}
              placeholder="Enter post title"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomInput
              fullWidth
              margin="dense"
              label="Author"
              name="author"
              value={form.author}
              onChange={handleChange}
              error={!!errors.author}
              placeholder="Enter author name"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            {' '}
            <CustomInput
              fullWidth
              margin="dense"
              label="Category"
              name="category"
              value={form.category}
              onChange={handleChange}
              error={!!errors.category}
              placeholder="Enter post category"
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomInput
              fullWidth
              margin="dense"
              label="Image URL"
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              error={!!errors.imageUrl}
              placeholder="Paste image URL"
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomInput
              fullWidth
              multiline
              minRows={4}
              maxRows={5}
              margin="dense"
              label="Content"
              name="content"
              value={form.content}
              onChange={handleChange}
              error={!!errors.content}
              placeholder="Write your post content here..."
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <CustomInput
              fullWidth
              margin="dense"
              label="Tags (comma separated)"
              name="tags"
              value={form.tags || ''}
              onChange={handleChange}
              placeholder="e.g. react, blog, tutorial"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ padding: '25px' }}>
        <CustomButton
          style={{
            width: '100px',
            backgroundColor: 'var(--secondary)',
            color: 'darkslategray',
          }}
          onClick={handleClear}
        >
          Cancel
        </CustomButton>
        <CustomButton style={{ width: '100px' }} onClick={handleSave}>
          {type === 'Edit' ? 'Update' : 'Save'}
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
};

export default PostModel;
