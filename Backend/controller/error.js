exports.get404 = (req, res, next) => {
    const error = new Error("Not found.");
    res.statusCode = 404;
    next();
  };
  
  exports.get500 = (error, req, res, next) => {
    const data = error.data;
    res.statusCode = 500;
    res.json({
      error: {
        message: error.message,
        data: data,
      },
    });
  };
  