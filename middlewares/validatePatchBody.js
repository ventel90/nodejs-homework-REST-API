const { HttpError } = require('../helpers');

const validatePatchBody = schema => {
  const func = (req, _, next) => {
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, 'missing field favorite');
    }
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validatePatchBody;
