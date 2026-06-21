import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBlogPosts } from '../api';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getBlogPosts()
      .then((res) => setPosts(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="blog" className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800 px-6 py-20">
      <div className="max-w-5xl w-full">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Blog</h2>

        {loading && (
          <p className="text-gray-600 dark:text-gray-300 text-center">Loading posts...</p>
        )}

        {error && (
          <p className="text-red-500 text-center">Could not load blog posts. Is the backend running?</p>
        )}

        {!loading && !error && posts.length === 0 && (
          <p className="text-gray-600 dark:text-gray-300 text-center">
            No blog posts yet — add some in the Django admin!
          </p>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link
              to={`/blog/${post.id}`}
              key={post.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900 hover:shadow-lg transition block"
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                  {post.summary}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}