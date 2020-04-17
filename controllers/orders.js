const { Trx, House, City } = require("../models");

exports.get = async (req, res) => {
  try {
    const orders = await Trx.findAll({
      include: [
        {
          model: House,
          include: [
            {
              model: City,
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
          ],
          attributes: {
            exclude: [
              "cityId",
              "ownerId",
              "createdAt",
              "updatedAt",
              "CityId",
            ],
          },
        },
      ],
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
          "houseId",
          "tenantId",
          "HouseId",
        ],
      },
    });

    if (!orders)
      return res.status(401).send({ message: "Orders Not Found" });

    res.status(200).send({
      data: orders,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};
