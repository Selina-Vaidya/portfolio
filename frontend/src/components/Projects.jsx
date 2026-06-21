import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../api';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getProjects()
      .then((res) => setProjects(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-6 py-20">
      <div className="max-w-5xl w-full">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Projects</h2>

        {loading && (
          <p className="text-gray-600 dark:text-gray-300 text-center">Loading projects...</p>
        )}

        {error && (
          <p className="text-red-500 text-center">Could not load projects. Is the backend running?</p>
        )}

        {!loading && !error && projects.length === 0 && (
          <p className="text-gray-600 dark:text-gray-300 text-center">
            No projects yet — add some in the Django admin!
          </p>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              to={`/projects/${project.id}`}
              key={project.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition bg-white dark:bg-gray-800 block"
            >
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3 text-sm line-clamp-2">
                  {project.description}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {project.tech_stack}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}