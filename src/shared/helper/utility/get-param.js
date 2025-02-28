const { ParamValidation } = require("../../validation");
const { ValidationError } = require("../lib");

/**
 * get params function
 * @param {*} req
 * @return {number}
 */
async function getParam(req) {
  let url = req.url.split("/");
  const param = url[url.length - 1];
  const validate = new ParamValidation(param);
  await validate.check();

  if (validate.isValid()) {
    throw new ValidationError(422, validate.getErrors());
  }

  return Number(param);
}

module.exports = getParam;
