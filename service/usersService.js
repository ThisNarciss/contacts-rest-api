const { User } = require("../models");

const findUser = async (email) => {
  try {
    const result = await User.findOne({ email });
    return result;
  } catch (error) {
    return error;
  }
};

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
    await User.findByIdAndUpdate(id, { token });
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

module.exports = {
  logUser,
  regUser,
  findUser,
  updateToken,
  updateSubscription,
  updateAvatar,
};
