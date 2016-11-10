module.exports = {
    port: process.env.PORT || 9000,

    // Server IP
    ip: process.env.IP || '0.0.0.0',

    mongo: {
        uri: 'mongodb://localhost/fluany-api',
        options: {
            db: {
                safe: true
            }
        }
    }
};