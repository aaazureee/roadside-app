require('dotenv').config();

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.{entity,repository}{.ts,.js}'],
  synchronize: true,
};
