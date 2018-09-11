module.exports = {
    env: process.env.NODE_ENV || 'development',
    root: `${__dirname}/../../../`,
    host: process.env.HOST || 'http://localhost',
    port: process.env.PORT || 3707,
    secretKey: process.env.SECRET || 'eToRo.OmnI.ServER',

    cors: {
        credentials: true,
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE']
    }
};
