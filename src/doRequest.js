import fetch from 'node-fetch';

export const doRequest = async(...params) => {
    const resp = await fetch(...params);
    return resp.json();
}
