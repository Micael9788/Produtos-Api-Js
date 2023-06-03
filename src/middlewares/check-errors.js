const checkErrosApi = (error, req, res, next) => {
  
  if (error) {
    return res.status(404).json(
      {
        success: false,
        message: 'this request is invalid'
      }
    );
  }
  
  next();
  
};

export default checkErrosApi