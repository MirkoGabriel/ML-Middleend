const loggerMiddleware = (req, res, next) => {
    console.log(`Request: ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Query Params:', req.query);
    console.log('Body:', req.body);
  
    const originalSend = res.send;
    res.send = function (body) {
      console.log('Response:', body);
      return originalSend.apply(this, arguments);
    };
  
    next();
  };
  
  module.exports = loggerMiddleware;