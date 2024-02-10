import { configDotenv } from 'dotenv';
configDotenv();

import { doRequest } from './src/doRequest.js';
import { download } from './src/download.js';
import { exec } from './src/exec.js';
import { get, set } from './src/lastModified.js';
import { logger } from './src/logger.js';

const bootstrap = async({
    key,
    sslDir = '/etc/nginx/ssl',
}) => {
    if (!key) {
        throw new Error('Check your environment variables: api key is not defined.');
    }

    const { token } = await doRequest(
        'https://panel.netangels.ru/api/gateway/token/',
        {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `api_key=${key}`,
        },
    );

    const { entities: [{ id, updated }] } = await doRequest(
        'https://api-ms.netangels.ru/api/v1/certificates/',
        { headers: { Authorization: `Bearer ${token}` } },
    );
    const lastModified = get();
    if (updated === lastModified) {
        logger.info('Nothing to update');
        return;
    }

    await download(
        `https://api-ms.netangels.ru/api/v1/certificates/${id}/download/?type=tar.gz`,
        './temp/certs.tar.gz',
        { headers: { Authorization: `Bearer ${token}` } },
    )

    await exec([
        `mv ./temp/certs.tar.gz ${sslDir}/certs.tar.gz`,
        `tar -xf ${sslDir}/certs.tar.gz -C ${sslDir}`,
        `rm -f ${sslDir}/certs.tar.gz`,
        'service nginx reload',
    ]);

    set(updated);
    logger.info('Updated successfully');
};

bootstrap({
    key: process.env.API_KEY,
    sslDir: process.env.SSL_DIR,
}).catch(e => logger.error(e));
