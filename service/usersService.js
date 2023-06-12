const { User } = require("../models");

const findUser = async (email) => {
  try {
    const result = await User.findOne({ email });
    return result;
  } catch (error) {
    return error;
  }
};

// const findUserByVerificationToken = async (verificationToken) => {
//   try {
//     const result = await User.findOne({ verificationToken });
//     return result;
//   } catch (error) {
//     return error;
//   }
// };

const regUser = async (body) => {
  try {
    const result = await User.create(body);

    return result;
  } catch (error) {
    return error;
  }
};

const logUser = async (body) => {
  try {
    const result = await User.create(body);
    return result;
  } catch (error) {
    return error;
  }
};

const updateToken = async (id, token) => {
  try {
    await User.findByIdAndUpdate(
      id,
      { token },
      {
        new: true,
      }
    );
  } catch (error) {
    return error;
  }
};

const updateSubscription = async (id, subscription) => {
  try {
    const result = await User.findByIdAndUpdate(
      id,
      { subscription },
      {
        new: true,
      }
    );
    return result;
  } catch (error) {
    return error;
  }
};

const updateAvatar = async (id, avatarUrl) => {
  try {
    const result = await User.findByIdAndUpdate(
      id,
      { avatarUrl },
      { new: true }
    );
    return result;
  } catch (error) {
    return error;
  }
};

// const updateVerify = async (id, { verify, verificationToken }) => {
//   try {
//     const result = await User.findByIdAndUpdate(
//       id,
//       { verify, verificationToken },
//       { new: true }
//     );
//     return result;
//   } catch (error) {
//     return error;
//   }
// };

module.exports = {
  logUser,
  regUser,
  findUser,
  // findUserByVerificationToken,
  updateToken,
  updateSubscription,
  updateAvatar,
  // updateVerify,
};
