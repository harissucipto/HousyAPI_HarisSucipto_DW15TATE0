const { ListAs } = require("../models");

exports.filterByListId = async (listAsId, userId) => {
  const { name: listAs } = await ListAs.findOne({
    where: { id: listAsId },
  });

  return (place) => {
    if ([listAs, place].every((word) => word === "owner"))
      return { ownerId: userId };

    if ([listAs, place].every((word) => word === "tenant"))
      return { tenantId: userId };

    return {};
  };
};
