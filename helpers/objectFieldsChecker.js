const objectFieldsChecker = object => {
  const FIELDS = ['name', 'email', 'phone'];
  const allowFields = FIELDS.filter(field => object[field] === undefined);
  if (allowFields.length > 0) {
    return `missing required ${allowFields.join(', ')} fields`;
  }
  return `missing required ${allowFields} field`;
};

module.exports = objectFieldsChecker;
