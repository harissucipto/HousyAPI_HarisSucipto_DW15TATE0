const { User, ListAs } = require("../models");

exports.get = async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: ListAs,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updatedAt", "listAsId"],
      },
    });

    console.log(users, "inii");

    // if house not found
    if (!users)
      return res.status(401).send({ message: "House Not Found" });

    res.status(200).send({
      data: users,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
