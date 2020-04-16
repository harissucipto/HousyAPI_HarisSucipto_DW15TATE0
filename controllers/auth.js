const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      where: {
        username,
      },
    });

    // if username not match
    if (!user) {
      return res.status(401).send({
        message: "Username not found",
      });
    }

    // if password not match
    const isPasswordNotMatch = !(await bcrypt.compare(
      password,
      user.password
    ));

    if (isPasswordNotMatch)
      return res.status(401).send({
        message: "Incorect Password",
      });

    // if ok
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET
    );
    const data = {
      username,
      token,
    };
    res.status(200).send({ data });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    // check if user uniq
    const user = await User.findOne({
      where: {
        username,
      },
    });
    if (user) {
      return res.status(400).send({
        message: "Username already registered",
      });
    }

    // if ok create a new user
    const passwordEncrypt = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      ...req.body,
      password: passwordEncrypt,
    });
    const token = jwt.sign(
      { id: newUser.id },
      process.env.JWT_SECRET
    );
    const data = {
      username,
      token,
    };
    res.status(200).send({ data });
  } catch (error) {
    res.status(500).send(error);
  }
};
