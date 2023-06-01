const fs = require("fs/promises");
const path = require("path");
const { usersService } = require("../../service");
const { HttpError } = require("../../utils");

const avatarDir = path.join(process.cwd(), "public", "avatars");

const updateUserAvatar = async (req, res) => {
  const { path: tempPath, filename } = req.file;
  const { _id: id } = req.user;
  const resultUpload = path.join(avatarDir, filename);
  await fs.rename(tempPath, resultUpload);
  const avatarUrl = path.join("avatars", filename);

  const result = await usersService.updateAvatar(id, avatarUrl);
  res.json({
    status: "success",
    code: 200,
    data: { avatarUrl: result.avatarUrl },
  });
};

module.exports = updateUserAvatar;
