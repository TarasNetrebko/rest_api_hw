const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const signup = async (req, res) => {
  const { name, email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "email in use");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarUrl = gravatar.url(email);
  const result = await User.create({
    name,
    email,
    password: hashedPassword,
    subscription,
    avatarUrl,
  });
  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};
module.exports = signup;
