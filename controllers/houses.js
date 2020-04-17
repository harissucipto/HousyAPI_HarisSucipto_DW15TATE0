const { House, City } = require("../models");
const { Op } = require("sequelize");

exports.get = async (req, res) => {
  try {
    const { typeRent, belowPrice } = req.query;

    const houses = await House.findAll({
      where: {
        ...filterByTypeRent(typeRent),
        ...filterByBelowPrice(belowPrice),
      },
      include: [
        {
          model: City,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      ],
      attributes: {
        exclude: ["cityId", "CityId", "createdAt", "updatedAt"],
      },
    });

    // if house not found
    if (!houses)
      return res.status(401).send({ message: "House Not Found" });

    res.status(200).send({
      data: houses,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const filterByTypeRent = (typeRent) => {
  if (!typeRent) return {};

  return { typeRent };
};

const filterByBelowPrice = (belowPrice) => {
  if (!belowPrice) return {};
  return {
    price: {
      [Op.lt]: belowPrice,
    },
  };
};
