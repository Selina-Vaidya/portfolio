import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';

export default function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.get(`/blog/${id}/`)
      .then((res) => setPost(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <p className="text-red-500 mb-4">Post not found.</p>
          <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <Link to="/#blog" className="text-blue-600 dark:text-blue-400 hover:underline mb-6 inline-block">
          ← Back to Blog
        </Link>

        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-80 object-cover rounded-lg mb-6"
          />
        )}

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {post.title}
        </h1>

        <p className="text-sm text-gray-400 dark:text-gray-500 mb-8">
          {new Date(post.created_at).toLocaleDateString()}
        </p>

        <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
          {post.content}
        </div>
      </div>
    </div>
  );
}