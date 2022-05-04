import faker from 'faker';
import { getCSVFiles, getContentCSVFiles, cleanField } from './scanDataFile';

const Promise = require('bluebird');

faker.locale = 'vi';

export const generateRequest = async () => {
    try {
        const userFile = await getCSVFiles('request');

        const { header, content } = await getContentCSVFiles(userFile[0]);

        let userSeed = []

        await Promise.each(content, async (line) => {
            const field = cleanField(line.split(','));

            const request = {
                id: field[header.indexOf('id')],
                receiver: field[header.indexOf('receiver')],
                creator: field[header.indexOf('creator')],
                request_type: field[header.indexOf('request_type')],
                status: field[header.indexOf('status')],
            };
            userSeed.push(request);
        });

        console.log("debug here");

        return userSeed;

    } catch (err) {
        throw new Error(err.message);
    }
};