const { House, City } = require("../models");

exports.detail = async (req, res) => {
  try {
    const { id } = req.params;

    const house = await House.findOne({
      where: { id },
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
    if (!house)
      return res.status(401).send({ message: "House Not Found" });

    const data = {
      ...house.get(),
    };
    delete data.ownerId;

    res.status(200).send({
      data,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.add = async (req, res) => {
  try {
    const newData = {
      ...req.body,
      ownerId: req.user || 2,
    };
    const house = await House.create(newData);

    if (!house)
      return res.status(401).send({ message: "data not valid" });

    this.detail(
      { ...req, params: { ...req.params, id: house.id } },
      res
    );
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.edit = async (req, res) => {
  try {
    const { id } = req.params;

    const house = await House.update(
      {
        ...req.body,
      },
      {
        where: { id },
      }
    );

    if (!house)
      return res.status(401).send({ message: "data not valid" });

    this.detail(req, res);
  } catch (error) {
    res.status(500).send(error);
  }
};
