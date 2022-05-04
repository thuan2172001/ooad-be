import { Sql } from '../database';
import { generateRequest } from '../seed-data/request';

const { DataTypes } = require('sequelize');

const Requests = Sql.define('request', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    request_type: {
        type: DataTypes.STRING,
        defaultValue: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: false,
    },
    receiver: {
        type: DataTypes.STRING,
        defaultValue: false,
    },
    creator: {
        type: DataTypes.STRING,
        defaultValue: false,
    },
    expired_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    form_body: {
        type: DataTypes.JSON,
        allowNull: true,
    }
}, {
    // disable the modification of table names; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
});

Requests.sync({ force: true }).then(() => {
    generateRequest().then(data => {
        console.log({ data })
        return Requests.bulkCreate(data);
    })
});

module.exports.Requests = Requests;