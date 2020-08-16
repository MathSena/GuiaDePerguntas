const Sequelize = require('Sequelize')

const connection = new Sequelize('guiaperguntas', 'root', '41494899',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection