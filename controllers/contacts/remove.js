const { Contact } = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const remove = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw RequestError(404, "Contact Not Found");
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = remove;
