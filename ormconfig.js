const path = require('path');

module.exports = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '6432',
    username: process.env.DB_USER || 'miniapp',
    password: process.env.DB_PASSWORD || 'miniapp',
    database: process.env.DB_NAME || 'miniapp',
    migrationsRun: true,
    logging: true,
    entities: [
        path.join(__dirname, 'build/entities/*'),
    ],
    migrations: [
        path.join(__dirname, 'build/migrations/*'),
    ],
    cli: {
        migrationsDir: 'src/migrations',
    },
};
