const { House, City } = require("../models");

exports.get = async (_req, res) => {
  try {
    const houses = await House.findAll({
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
