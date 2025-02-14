const { LanguageValidation } = require("../../infratructure/validation");
const { ErrorHandler, ValidationError } = require("../lib");

/**
 * get params function
 * @param {*} req
 * @return {number}
 */
async function getParam(req, res) {
  try {
    let url = req.url.split("/");
    const param = url[url.length - 1];
    const validate = new LanguageValidation(param);
    await validate.getOneParamValidate();

    if (validate.isValid()) {
      throw new ValidationError(422, validate.getErrors());
    }

    return Number(param);
  } catch (error) {
    new ErrorHandler(res, error);
  }
}

module.exports = getParam;
