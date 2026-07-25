export const sendSuccess = ({res, data={}, message = "Success", status = 200 , ...rest}) => {
  return res.status(status).json({
    success: true,
    message,
    data,
    rest,
  });
};
