const { User, House, Trx, sequelize } = require("../models");

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
