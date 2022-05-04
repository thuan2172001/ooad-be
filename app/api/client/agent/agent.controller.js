import express from 'express';
import { CheckAuth } from '../../middlewares/auth.mid';
import CommonError from '../../library/error';
import {
  success,
} from '../../../utils/response-utils';
import {
  getAllVehicles, getAllRequests
} from './agent.service';

const api = express.Router();

api.get('/agent/vehicles', async (req, res) => {
  try {
    const args = req.query;
    const results = await getAllVehicles(args);

    return res.json(success(results));
  } catch (err) {
    return CommonError(req, err, res);
  }
});

api.get('/agent/requests', async (req, res) => {
  try {
    const args = req.query;
    const results = await getAllRequests(args);

    return res.json(success(results));
  } catch (err) {
    return CommonError(req, err, res);
  }
});

module.exports = api;
