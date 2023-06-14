export const getDiagramPath = () => {
    return process.argv[2] || './diagram.xml';
}

export const getServiceProvider = () => {
    return process.argv[3] || 'redis';
}

export const getBucketName = () => {
    return process.argv[4] || 'bucket-name';
}

export const getKeyName = () => {
    return process.argv[5] || 'key-name';
}
