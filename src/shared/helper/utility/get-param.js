const { LanguageValidation, ParamValidation } = require("../../validation");
const { NumberValidation } = require("../../validation/validators");
const { ErrorHandler, ValidationError, CustomError } = require("../lib");

/**
 * get params function
 * @param {*} req
 * @return {number}
 */
async function getParam(req, res) {
  // try {
  let url = req.url.split("/");
  const param = url[url.length - 1];
  const validate = new ParamValidation(param);
  await validate.check();

  if (validate.isValid()) {
    throw new ValidationError(422, validate.getErrors());
  }

  return Number(param);
  // } catch (error) {
  //   throw error;
  // }
}

module.exports = getParam;
