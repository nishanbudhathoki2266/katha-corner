const express = require("express");

const morgan = require("morgan");

const userRouter = require("./routes/userRoutes");

const app = express();

// MIDDLEWARES

// Only use the morgan logger in the development environment
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

// If you want to serve static files, specify a middleware for it
app.use(express.static(`${__dirname}/public`));

// ROUTES
app.use("/api/v1/users", userRouter);

module.exports = app;
