//--For Printing Normal Logs
const info = (...params) => {
  console.log(...params);
};
//--For Printing Errors
const error = (...params) => {
  console.error(...params);
};

module.exports = {
  info,
  error,
};

//__ Use in other modules with logger.info() or logger.error()
