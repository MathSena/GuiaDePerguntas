const Sequelize = require('Sequelize')
const connection = require("./database")

//Define a tabela
const Pergunta = connection.define('pergunta',{
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})

// Força a criação, mas não caso esteja criada
Pergunta.sync({force:false}).then(()=>{

})

module.exports = Pergunta