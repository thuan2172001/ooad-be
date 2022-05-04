import { Users } from '../../../models/user';
import { Vehicles } from '../../../models/vehicle';
import { Requests } from '../../../models/request';
import { Op } from "sequelize";

export const getAllVehicles = async (args = {}, type) => {
  let { id, brand, vehicle_type } = args;
  let searchObj = {}
  if (id) searchObj.id = id;
  if (vehicle_type) searchObj.vehicle_type = {
    [Op.iLike]: `%${vehicle_type}%`,
  }
  if (brand) searchObj.brand = {
    [Op.iLike]: `%${brand}%`,
  }
  const results = await Vehicles.findAndCountAll({
    where: searchObj
  });
  const allUsers = await Users.findAll();
  return {
    result: results.rows.map(e => {
      return {
        ...e.dataValues,
        owner: e.owner ? allUsers.filter(user => user.userId === e.owner)[0].fullName : null
      }
    }),
    pagination: {
      total: results.count,
    }
  }
};

export const getAllRequests = async (args = {}, type) => {
  let { id } = args;
  let searchObj = {}
  if (id) searchObj.id = id;

  const results = await Requests.findAndCountAll({
    where: searchObj
  });

  return {
    result: results.rows.map(e => {
      return {
        ...e.dataValues,
      }
    }),
    pagination: {
      total: results.count,
    }
  }
};
