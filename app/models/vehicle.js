import { Sql } from '../database';
import { generateVehicle } from '../seed-data/vehicle';

const { DataTypes } = require('sequelize');

const Vehicles = Sql.define('vehicles', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        defaultValue: false,
    },
    chip_id: {
        type: DataTypes.STRING,
        defaultValue: false,
    },
    brand: {
        type: DataTypes.STRING,
        defaultValue: false,
    },
    agent: {
        type: DataTypes.STRING,
        defaultValue: false,
    },
    owner: {
        type: DataTypes.STRING,
        defaultValue: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: false,
    },
    produce_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    last_maintain: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    vehicle_type: {
        type: DataTypes.STRING,
        defaultValue: false,
    },
    image: {
        type: DataTypes.JSON,
        defaultValue: false,
    },
}, {
    // disable the modification of table names; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
});

Vehicles.sync({ force: true }).then(() => {
    generateVehicle().then(data => {
        console.log({ data })
        return Vehicles.bulkCreate(data);
    })
});

module.exports.Vehicles = Vehicles;