const fs = require("fs/promises");
const path = require("node:path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("models", "contacts.json");
const updateContacts = async(contacts) => await fs.writeFile(
  contactsPath,
  JSON.stringify(contacts, null, 2)
);

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  
  return JSON.parse(contacts);
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === id);

  return result || null;
};

const deleteContact = async (id) => {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === id);

    if (index === -1) {
      return null;
    }

  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
};

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), ...data };

  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const data = await fs.readFile(contactsPath, 'utf-8');
  const contacts = JSON.parse(data);
  const { name, email, phone } = body;

  const idx = contacts.findIndex(contact => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  contacts.forEach(contact => {
    if (contact.id === contactId) {
      if (name) contact.name = name;
      if (email) contact.email = email;
      if (phone) contact.phone = phone;
    }
  });
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  deleteContact,
  addContact,
  updateContact,
};
