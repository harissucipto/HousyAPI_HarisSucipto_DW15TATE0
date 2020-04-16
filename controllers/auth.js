const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.signin = async (req, res) => {
  try {
    const { username, password, listAsId = 1 } = req.body;

    // check if user uniq
    const user = await User.findOne({
      where: {
        username,
      },
    });
    if (user) {
      return res.status(400).send({
        message: "Username already registered",
        data: user,
      });
    }

    // if ok create a new user
    const passwordEncrypt = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      ...req.body,
      password: passwordEncrypt,
      listAsId,
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
