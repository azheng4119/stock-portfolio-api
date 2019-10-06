require('dotenv').config()
const Sequelize = require('sequelize');
const db = new Sequelize(process.env.db,
    {
        dialectOptions: {
            ssl: true
        }
    });

module.exports = db;