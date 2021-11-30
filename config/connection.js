const { Sequelize } = require('sequelize');

require('dotenv').config();

const sequelize = process.env.JAWSDB_URL
    ? new Sequelize(process.env.JAWSDB_URL)
    : new Sequelize(
        process.env.NAME,
        process.env.USER,
        process.env.PASS,
        {
            host: 'localhost',
            dialect: 'mysql',
        }
    );

module.exports = sequelize;