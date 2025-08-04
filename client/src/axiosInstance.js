// import axios from "axios";

// const bookBaseUrl = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
//   headers: { "Content-Type": "application/json" },
//   timeout: 5000,
// });

// export default bookBaseUrl;


import axios from 'axios';

const bookBaseUrl = axios.create({
  baseURL: '/api/book',
  headers: { 'Content-Type': 'application/json' },
})

export default bookBaseUrl;
