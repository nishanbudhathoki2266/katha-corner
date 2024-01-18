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

// Handling unhandled routes
app.all("*", (req, _, next) => {
  // res.status(404).json({
  //   status: "fail",
  //   message: `Can't find ${req.originalUrl} on this server!`,
  // });

  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.status = "fail";
  err.statusCode = 404;

  // If next function receives an argument, express will always assume that it is an error
  // Skips all the middlewares in the middleware stack and send it straight to the error handler
  next(err);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
