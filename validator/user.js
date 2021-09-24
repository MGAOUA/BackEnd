const joi = require("joi");
const validatePost = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().required(),
    userName: joi.string().required(),
    phone: joi.string().required(),
    email: joi.string().email().required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).send({
      message: "Error in user data",
      error: result.error,
    });
  }
  next();
};

const validatePut = (req, res, next) => {
  const schema = joi.object({
    name: joi.string(),
    userName: joi.string(),
    phone: joi.string(),
    email: joi.string().email(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).send({
      message: "Error in user data",
      error: result.error,
    });
  }
  next();
};

module.exports = {
  validatePost,
  validatePut,
};
