require('dotenv').config();

let config;
if (process.env.DATABASE_URL) {
  config = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    entities: [__dirname + '/**/*.{entity,repository}{.ts,.js}'],
    synchronize: true,
  };
} else {
  config = {
    type: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    entities: [__dirname + '/**/*.{entity,repository}{.ts,.js}'],
    synchronize: true,
    logging: true,
    logger: 'file',
  };
}

module.exports = config;
