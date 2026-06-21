import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.get(`/projects/${id}/`)
      .then((res) => setProject(res.data))
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

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <p className="text-red-500 mb-4">Project not found.</p>
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
        <Link to="/#projects" className="text-blue-600 dark:text-blue-400 hover:underline mb-6 inline-block">
          ← Back to Projects
        </Link>

        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-80 object-cover rounded-lg mb-6"
          />
        )}

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {project.title}
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          {project.tech_stack}
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8 whitespace-pre-line">
          {project.description}
        </p>

        <div className="flex gap-4">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:opacity-90 transition"
            >
              View on GitHub
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}