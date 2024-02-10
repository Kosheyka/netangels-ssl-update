import fs from 'fs';

const filename = '.last-modified';
export const get = () => {
    try {
        return fs.readFileSync(
            filename,
            {encoding: 'utf-8'},
        );
    } catch {}
};

export const set = (data) => {
    fs.writeFileSync(
        filename,
        data,
        { encoding: 'utf-8' },
    );
};
