const fs = require("fs/promises");
const path = require("path");
const { usersService } = require("../../service");
const { HttpError } = require("../../utils");

const avatarDir = path.join(process.cwd(), "public", "avatars");

const updateUserAvatar = async (req, res) => {
  const { path: tempPath, mimetype } = req.file;
  const { _id: id } = req.user;
  const index = mimetype.indexOf("/");
  const format = mimetype.slice(index + 1, mimetype.length);
  const uniqAvatarName = `avatar-${id}.${format}`;
  const resultUpload = path.join(avatarDir, uniqAvatarName);
  await fs.rename(tempPath, resultUpload);
  const avatarUrl = path.join("avatars", uniqAvatarName);

  const result = await usersService.updateAvatar(id, avatarUrl);
  res.json({
    status: "success",
    code: 200,
    data: { avatarUrl: result.avatarUrl },
  });
};

module.exports = updateUserAvatar;
