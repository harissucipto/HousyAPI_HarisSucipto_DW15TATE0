const { User } = require("../models");

exports.listAs = async (req, _res, next) => {
  const id = req.user;

  const { listAsId } = await User.findOne({
    where: { id },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });

  req.listAsId = listAsId;
  next();
};
