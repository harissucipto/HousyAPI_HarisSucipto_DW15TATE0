const { User, ListAs } = require("../models");

exports.get = async (req, res) => {
  try {
    const id = req.user;
    const user = await User.findOne({
      where: { id },
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

    console.log(user, id, "ohokk");

    // if house not found
    if (!user)
      return res.status(401).send({ message: "User Not Found" });

    res.status(200).send({
      data: user,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
