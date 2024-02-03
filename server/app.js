const express = require("express");

const morgan = require("morgan");
const cors = require("cors");

const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

// MIDDLEWARES
app.use(cors());

// Only use the morgan logger in the development environment
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

// If you want to serve static files, specify a middleware for it
app.use(express.static(`${__dirname}/public`));

// ROUTES
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

// Handling unhandled routes
app.all("*", (req, _, next) => {
  // If next function receives an argument, express will always assume that it is an error
  // Skips all the middlewares in the middleware stack and send it straight to the error handler
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
