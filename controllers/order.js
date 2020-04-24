const { Trx, House, City, User } = require("../models");
const { filterByListId } = require("../utils");

const whereMyHouse = (isHakAkses, id) => ({
  where: { id, ...isHakAkses("tenant") },
  include: [
    {
      model: User,
      attributes: ["id", "username"],
    },
    {
      model: House,
      where: {
        ...isHakAkses("owner"),
      },
      include: [
        {
          model: City,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: User,
          attributes: ["id", "username"],
        },
      ],
      attributes: {
        exclude: [
          "cityId",
          // "ownerId",
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
      // "tenantId",
      "HouseId",
    ],
  },
});

exports.get = async (req, res) => {
  try {
    const { id } = req.params;
    const { user: tenantId, listAsId } = req;

    const isHakAkses = await filterByListId(listAsId, tenantId);

    const order = await Trx.findOne(whereMyHouse(isHakAkses, id));

    if (!order)
      return res.status(401).send({ message: "Order Not Found" });

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
    const { user: tenantId, listAsId } = req;

    const isHakAkses = await filterByListId(listAsId, tenantId);

    const order = await Trx.findOne(whereMyHouse(isHakAkses, id));
    if (!order)
      return res.status(401).send({ message: "bukan punya kamu" });

    const updatedOrder = await Trx.update(
      {
        ...req.body,
      },
      {
        where: { id },
      }
    );

    if (!updatedOrder)
      return res.status(500).send({ message: "data not valid" });

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
