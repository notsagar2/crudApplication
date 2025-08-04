// import path from "path";

// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const databaseConnection = require("./database");
// const bookRouter = require("./routes/book.routes");

// const app = express();
// app.use(express.json());
// app.use(cors());

// databaseConnection();

// const _dirname = path.resolve();

// app.get("/", (req, res) => res.send("Hello World"));
// app.use("/book", bookRouter);


// app.use(express.static(path.join(_dirname, "/client/dist")));
// app.get('*', (_, res) => {

//   res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"));
// });

// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');

const databaseConnection = require('./database');
const bookRouter = require('./routes/book.routes');

const app = express();

// simple logger to see incoming traffic
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use(express.json());
app.use(cors());

// init DB (make sure databaseConnection logs success/failure)
databaseConnection();

// Mount routers
app.use('/api/book', bookRouter);
app.use('/book', bookRouter); // optional: for compatibility if client is calling /book/...

// health check
app.get('/health', (_, res) => res.send('OK'));

// Serve frontend build
const clientDistPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientDistPath));

// SPA fallback (non-API routes)
app.get('*', (req, res) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/book')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
