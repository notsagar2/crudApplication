// import axios from "axios";

// const bookBaseUrl = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
//   headers: { "Content-Type": "application/json" },
//   timeout: 5000,
// });

// export default bookBaseUrl;


// import axios from 'axios';

// const bookBaseUrl = axios.create({
//   baseURL: '/api/book',
//   headers: { 'Content-Type': 'application/json' },
// })

// export default bookBaseUrl;

import axios from 'axios';

function makeBaseURL(raw) {
  if (!raw) return '/api/book';
  let normalized = raw.replace(/\/+$/, '');
  if (normalized.endsWith('/api/book')) return normalized; // don’t append twice
  return normalized + '/api/book';
}

const bookBaseUrl = axios.create({
  baseURL: makeBaseURL(import.meta.env.VITE_API_URL),
  headers: { 'Content-Type': 'application/json' },
  timeout: 5000,
});

export default bookBaseUrl;
