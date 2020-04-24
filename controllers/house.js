const { House, City, User } = require("../models");

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
        {
          model: User,
          attributes: ["id", "username"],
        },
      ],
      attributes: {
        exclude: ["cityId", "CityId", "createdAt", "updatedAt"],
      },
    });

    // if house not found
    if (!house)
      return res.status(401).send({ message: "House Not Found" });

    res.status(200).send({
      data: house,
      message: "Berhasil",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.add = async (req, res) => {
  try {
    const newData = {
      ...req.body,
      ownerId: req.user,
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
    const userId = req.user;

    const house = await House.update(
      {
        ...req.body,
      },
      {
        where: { id, ownerId: userId },
      }
    );

    if (!house)
      return res.status(401).send({ message: "data not valid" });

    this.detail(req, res);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user;

    const respon = await House.destroy({
      where: { id, ownerId: userId },
    });

    if (!respon)
      return res.status(401).send({ message: "data not valid" });

    const data = { id };

    res.status(200).send({ data, message: "Berhasil" });
  } catch (error) {
    res.status(500).send(error);
  }
};
