const { RequestError } = require("../helpers");

const validateBody = (schema) => {
  const foo = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    next();
  };
  return foo;
};

module.exports = validateBody;
