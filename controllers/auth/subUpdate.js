const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");
const subUpdate = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;
  if (
    subscription === "starter" ||
    subscription === "pro" ||
    subscription === "business"
  ) {
    await User.findByIdAndUpdate(_id, { subscription });
    res.json({
      message: `Subscription changed, you are ${subscription} now`,
    });
  } else {
    throw RequestError(400);
  }
};

module.exports = subUpdate;
