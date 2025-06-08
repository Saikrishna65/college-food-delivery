const userModel = require("../models/user.model");

module.exports.createUser = async ({ name, mobile, email, password }) => {
  if (!name || !mobile || !email || !password) {
    throw new Error("All fields are required");
  }
  const user = userModel.create({
    name,
    mobile,
    email,
    password,
  });

  return user;
};
