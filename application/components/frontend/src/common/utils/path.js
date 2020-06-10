const PATH_PREFIX = process.env.PUBLIC_PATH || '';

const removeMultipleSlashes = path => path.replace(/\/+/g, '/');
const getPath = path => removeMultipleSlashes(PATH_PREFIX + path);

export default getPath;
