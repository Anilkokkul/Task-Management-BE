const Users = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const payload = req.body;

    const existingUser = await Users.findOne({ email: payload.email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }
    const userWithMobile = await Users.findOne({
      mobileNumber: payload.mobileNumber,
    });
    if (userWithMobile) {
      return res.status(409).send({
        message: "An account is already registered with your mobile number",
      });
    }
    const hashedValue = bcrypt.hashSync(payload.password, 10);
    payload.hashedPassword = hashedValue;
    delete payload.password;

    const newUser = new Users(payload);

    newUser
      .save()
      .then((data) => {
        res.status(201).send({
          message: "User saved successfully",
          User: data,
        });
      })
      .catch((error) => {
        res.status(400).send({
          message: "error while saving user",
          error: error,
        });
      });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existUser = await Users.findOne({ email: email });

    if (!existUser) {
      return res.status(401).send({
        message: "Entered emil is not a registered email address",
      });
    }
    if (bcrypt.compareSync(password, existUser.hashedPassword)) {
      const token = jwt.sign(
        {
          _id: existUser._id,
        },
        process.env.SECRET_KEY
      );
      res.cookie("accessToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(Date.now() + 86400000),
      });
      return res.status(200).send({
        message: "User Logged-in Successfully",
      });
    } else {
      return res.status(400).send({
        message: "Incorrect password",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    await res.clearCookie("accessToken");
    res.status(200).send({
      message: "User Logged-Out Successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
