const generateErrorsArray = (validator) => {
  let errorArray = [];
  validator.errors.map((error) => {
    errorArray.push(error.msg);
  });
  return errorArray;
};
module.exports = { generateErrorsArray };
