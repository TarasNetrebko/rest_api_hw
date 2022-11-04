const fs = require("fs/promises");
const path = require("path");
const { User } = require("../../models/user");
const jimp = require("jimp");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const extension = originalname.split(".").pop();
  const filename = `${_id}.${extension}`;
  const resultUpload = path.join(avatarDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const resizeAvatar = await jimp.read(resultUpload);
  await resizeAvatar.resize(250, 250).write(resultUpload);
  const avatarUrl = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarUrl });
  res.json({
    avatarUrl,
  });
};

module.exports = updateAvatar;
