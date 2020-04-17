const { Trx, House, City } = require("../models");

exports.get = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Trx.findOne({
      where: { id },
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

    if (!order)
      return res.status(401).send({ message: "Orders Not Found" });

    res.status(200).send({
      data: order,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

exports.edit = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Trx.update(
      {
        ...req.body,
      },
      {
        where: { id },
      }
    );

    if (!order)
      return res.status(401).send({ message: "data not valid" });

    this.get(req, res);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.add = async (req, res) => {
  try {
    const newData = { ...req.body, tenantId: req.user };
    const order = await Trx.create(newData);

    if (!order)
      return res.status(401).send({ message: "data not valid" });

    this.get(
      { ...req, params: { ...req.params, id: order.id } },
      res
    );
  } catch (error) {
    res.status(500).send(error);
  }
};
