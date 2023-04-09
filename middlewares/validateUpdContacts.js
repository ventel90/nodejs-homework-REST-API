const { HttpError } = require('../helpers');

const validateUpdateContacts = schema => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, 'missing fields'));
    }
    next();
  };

  return func;
};

module.exports = validateUpdateContacts;
