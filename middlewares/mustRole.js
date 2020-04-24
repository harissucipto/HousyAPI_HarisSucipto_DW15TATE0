const { User, ListAs } = require("../models");

const mustRole = (role) => async (req, res, next) => {
  const id = req.user;

  const { ListA } = await User.findOne({
    where: { id },
    include: [
      {
        model: ListAs,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    ],
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });

  console.log(ListA.name, "hehe");

  if (ListA && ListA.name === role) return next();

  res.status(401).send({ message: "unauthoriz cant access!" });
};

exports.mustTenant = mustRole("tenant");
exports.mustOwner = mustRole("owner");
