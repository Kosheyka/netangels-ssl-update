import fs from 'fs';
import { logger } from './logger.js';

const filename = '.last-modified';

/**
 * Return an array of previous update
 * @returns {{ [id: number]: string }}
 */
export const get = () => {
    try {
        const file = fs.readFileSync(
            filename,
            {encoding: 'utf-8'},
        );
        if (!file) {
            return {};
        }

        return JSON.parse(file);
    } catch(e) {
        logger.error(e);
    }
};

/**
 * Save new update
 * @param data {{ [id: number]: string }}
 */
export const set = (data) => {
    fs.writeFileSync(
        filename,
        JSON.stringify(data),
        { encoding: 'utf-8' },
    );
};
