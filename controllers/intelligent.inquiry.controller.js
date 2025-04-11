const Sequelize = require("sequelize");
const Contracts = require("../models/contracts.model");
const EquipmentItems = require("../models/equipment_items.model");
const errorHandler = require("../helpers/error.handler");

const getContractsByDateRange = async (req, res) => {
  try {
    // console.log(req);
    // const contracts = await Contracts.findAll({
    //   where: {
    //     start_date: {
    //       [Sequelize.Op.gte]: new Date(startDate),
    //       [Sequelize.Op.lte]: new Date(endDate),
    //     },
    //   },
    //   include: [
    //     {
    //       model: EquipmentItems,
    //       as: "equipment_item",
    //     },
    //   ],
    // });

    // if (contracts.length > 0) {
    //   res.status(200).send(contracts);
    // } else {
    //   res
    //     .status(404)
    //     .send({ message: "No contracts found in the given date range." });
    // }
    
    console.log(req.query.startDate);
    console.log(req.query.endDate);
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = { getContractsByDateRange };
