import fetch from 'node-fetch';
import path from 'path';
import fs from 'fs';

export const download = async (url, fileName, { method = 'GET', headers }) => {
    const resp = await fetch(
        url,
        {
            method,
            headers,
        },
    );

    const dirname = path.dirname(fileName);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }

    const fileStream = fs.createWriteStream(fileName);
    await new Promise((resolve, reject) => {
        resp.body.pipe(fileStream);
        resp.body.on('error', reject);
        fileStream.on('finish', resolve);
    });
}
