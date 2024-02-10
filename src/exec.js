import * as util from 'util';
import { exec as execSync } from 'child_process';
import { logger } from './logger.js';

const execAsync = util.promisify(execSync);

export const exec = async(commandsArray) => {
    try {
        const { stdout, stderr } = await execAsync(commandsArray.join(' && '));

        if (stderr) {
            throw new Error(stderr);
        } else {
            logger.debug(stdout);
        }
    } catch (e) {
        throw new Error(e);
    }
};
