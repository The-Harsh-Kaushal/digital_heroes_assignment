const errorHandler = (err, req, res, next) => {
  console.log("Error happened ", err.message || "Internal Server Error");
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
    status: false,
  });
};

export default errorHandler;
