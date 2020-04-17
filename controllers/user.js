const {
  User,
  House,
  Trx,
  sequelize,
  ListAs,
} = require("../models");

exports.remove = async (req, res) => {
  const trx = await sequelize.transaction();
  try {
    const { id } = req.params;

    // delete baris pada table terkait
    await House.destroy(
      {
        where: { ownerId: id },
      },
      { transaction: trx }
    );
    await Trx.destroy(
      {
        where: { tenantId: id },
      },
      { transaction: trx }
    );
    const respon = await User.destroy(
      {
        where: { id },
      },
      { transaction: trx }
    );

    if (!respon)
      return res.status(401).send({ message: "data not valid" });

    const data = { id };

    res.status(200).send(data);
  } catch (error) {
    await trx.rollback();
    res.status(500).send(error);
  }
};

exports.get = async (req, res) => {
  try {
    const { id } = req.params;
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
