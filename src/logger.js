import { fileURLToPath } from 'url';
import path from 'path';
import pino from 'pino';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directory = process.env.LOG_DIRECTORY || `${__dirname}/../`;

export const logger = pino(
    {
        level: process.env.LOG_LEVEL || 'info',
        formatters: {
            level: (label) => {
                return { level: label.toUpperCase() };
            },
        },
        timestamp: pino.stdTimeFunctions.isoTime,
    },
    pino.destination(`${directory}/netangels-ssl-update.log`)
);
