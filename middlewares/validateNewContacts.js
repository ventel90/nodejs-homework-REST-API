const { HttpError, objectFieldsChecker } = require('../helpers');

const validateNewContacts = schema => {
    const func = (req, _, next)=> {
        const { error } = schema.validate(req.body);
        if (error) {
            next(HttpError(400, objectFieldsChecker(req.body)));
        }
        next()
    }

    return func;
}

module.exports = validateNewContacts;