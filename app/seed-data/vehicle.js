import faker from 'faker';
import { getCSVFiles, getContentCSVFiles, cleanField } from './scanDataFile';

const Promise = require('bluebird');

faker.locale = 'vi';

export const generateVehicle = async () => {
    try {
        const userFile = await getCSVFiles('vehicles');

        const { header, content } = await getContentCSVFiles(userFile[0]);

        let userSeed = []

        await Promise.each(content, async (line) => {
            const field = cleanField(line.split(','));

            const vehicle = {
                id: field[header.indexOf('id')],
                chip_id: field[header.indexOf('chip_id')],
                name: field[header.indexOf('name')],
                brand: field[header.indexOf('brand')],
                owner: field[header.indexOf('owner')],
                agent: field[header.indexOf('agent')],
                status: field[header.indexOf('status')],
                vehicle_type: field[header.indexOf('vehicle_type')],
                image: field[header.indexOf('image')],
            };
            userSeed.push(vehicle);
        });

        console.log("debug here");

        return userSeed;

    } catch (err) {
        throw new Error(err.message);
    }
};