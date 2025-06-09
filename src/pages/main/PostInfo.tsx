import { useParams } from 'react-router-dom';
import useGetPostById from '../../hooks/useGetPostById';
import Loader from '../../components/ui/Loader';

export default function PostInfo() {
  const { id } = useParams();
  const { data: post, isLoading } = useGetPostById({ id: id as string });

  if (isLoading) return <Loader />;

  return (
    <div className="post-page">
      <h2 className="section-title">Post Details</h2>

      <div className="post-info-container">
        {post?.imageUrl && (
          <div className="post-image-wrapper">
            <img src={post.imageUrl} alt={post.title} className="post-image" />
          </div>
        )}

        <div className="post-details">
          <h1 className="post-title">{post?.title || 'Untitled Post'}</h1>
          <div className="post-meta">
            <span>
              By <strong>{post?.author || 'Unknown'}</strong>
            </span>
            <span> | {post?.category || 'General'}</span>
            <span>
              {' '}
              |{' '}
              {post?.createdAt
                ? new Date(post.createdAt).toLocaleDateString()
                : 'N/A'}
            </span>
          </div>
          <p className="post-content">
            {post?.content || 'No content available.'}
          </p>

          {post?.tags && post?.tags?.split(',').length > 0 && (
            <div className="post-tags">
              <span className="tag-label">Tags:</span>
              {post.tags.split(',').map((tag) => (
                <span key={tag.trim()} className="tag">
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
