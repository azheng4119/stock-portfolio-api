const sequelize = require('sequelize')
const db = require('../db')

const Users = db.define("Users", {
    firstName: {
        type: sequelize.TEXT,
        allowNull: false
    },
    lastName: {
        type: sequelize.TEXT,
        allowNull: false
    },
    email: {
        type: sequelize.TEXT,
        allowNull: false,
        unique: {
            args: true,
            msg: "Email already taken."
        },
        validate: {
            isEmail: true
        }
    },
    password: {
        type: sequelize.TEXT,
        allowNull: false
    },
    balance: {
        type: sequelize.INTEGER,
        allowNull: false,
        required: true
    },
    history : {
        type : sequelize.ARRAY(sequelize.TEXT),
    },
    stocks : {
        type : sequelize.TEXT
    }
}, {
    timestamps: false
});

module.exports = Users;