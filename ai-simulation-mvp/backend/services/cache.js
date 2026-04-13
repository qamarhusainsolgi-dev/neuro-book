import NodeCache from 'node-cache';

export const aiCache = new NodeCache({ stdTTL: 60 * 60 * 12 });
