export const getDiagramPath = () => {
    return process.argv[2] || './diagram.xml';
}

export const getBucketName = () => {
    return process.argv[3] || 'bucket-name';
}

export const getKeyName = () => {
    return process.argv[4] || 'key-name';
}