import axios from 'axios';

const API_BASE_URL = 'https://scaling-palm-tree-xp76pr96r6xcpgr9-8000.app.github.dev/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getProjects = () => api.get('/projects/');
export const getBlogPosts = () => api.get('/blog/');
export const sendContactMessage = (data) => api.post('/contact/', data);