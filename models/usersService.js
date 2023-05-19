const User = require("./user");

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

module.exports = { logUser, regUser, findUser };
