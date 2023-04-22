const {Contact}  = require('../models/contact');
const { HttpError, ctrlWrapper } = require('../helpers');


const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 5;
  const favorite = req.query.favorite;
  const skip = page * limit;
  if (favorite) {
    const result = await Contact.find({ owner, favorite }, '', {
      skip,
      limit,
    }).populate('owner', 'name email');
    res.json(result);
  }
  const result = await Contact.find({ owner }, '', {
    skip,
    limit,
  }).populate('owner', 'name email');
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);

  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json({
    message: 'Contact deleted',
  });
};

const updateContact = async (req, res) => {
 const { id } = req.params;
 const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
 if (!result) {
   throw HttpError(404, `Product with id ${id} not found`);
 }
 res.status(200).json(result);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
