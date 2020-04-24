const { Op } = require("sequelize");
const { Trx, House, City, User } = require("../models");
const { filterByListId } = require("../utils");

exports.get = async (req, res) => {
  try {
    const { user: tenantId, listAsId } = req;

    const { category } = req.query;
    // filter order category booking
    // status order ["waitingPayment", "pending"];
    // filter order category history
    // status order ["approve", "pending", "cancel"]
    const statusSearch =
      category === "booking"
        ? ["waiting payment", "pending"]
        : ["approve", "pending", "cancel"];

    const whereStatus = category
      ? {
          status: {
            [Op.in]: statusSearch,
          },
        }
      : {};

    console.log(whereStatus, "hehe");

    const isHakAkses = await filterByListId(listAsId, tenantId);

    const orders = await Trx.findAll({
      where: {
        ...isHakAkses("tenant"),
        ...whereStatus,
      },
      include: [
        {
          model: User,
          attributes: [
            "id",
            "username",
            "phone",
            "fullName",
            "gender",
          ],
        },
        {
          model: House,
          where: {
            ...isHakAkses("owner"),
          },
          include: [
            {
              model: City,
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
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

    if (!orders)
      return res.status(401).send({ message: "Orders Not Found" });

    res.status(200).send({
      data: orders,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};
