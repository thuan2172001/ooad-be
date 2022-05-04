import { Users } from '../../../models/user';
import { Vehicles } from '../../../models/vehicle';
import { Requests } from '../../../models/request';

export const getAll = async (args = {}, type) => {
  let model = Users;
  switch (type) {
    case "vehicles":
      model = Vehicles;
      break;
    case "requests":
      model = Requests;
      break;
  }
  const results = await model.findAll();
  return results;
};
