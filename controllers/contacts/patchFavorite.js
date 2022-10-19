const { RequestError } = require("../../helpers");
const { Contact } = require("../../models/contacts");

const patchFavorite = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw RequestError(404, "Contact Not Found");
  }
  res.status(200).json(result);
};

module.exports = patchFavorite;
