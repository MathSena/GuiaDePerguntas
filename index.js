const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/database")
const Pergunta = require("./database/Pergunta")
const Resposta = require("./database/Resposta")

//Database

connection
    .authenticate()
    .then(()=>{
        console.log("Conectado")

    })
    .catch((msgErro) =>{

    })


app.set('view engine', 'ejs') // Estou dizendo para o Express que estou utilizando o EJS como view engine
app.use(express.static('public')) // Avisando o Express que estou usando arquivos estáticos, imagens, css e afins
///Bodyparser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/", (req, res) =>{
    Pergunta.findAll({raw: true, order:[
        ['id','DESC']
    ]}).then(perguntas => {
        res.render("index",{
            perguntas: perguntas
        })

    }) // Busca os dados
   

})

app.get("/perguntar", (req, res) =>{
    res.render("perguntar")
    
})

app.post("/salvarpergunta", (req, res) =>{ //Receber dados do formulário
    var titulo = req.body.titulo
    var descricao = req.body.descricao
    Pergunta.create({ // Cria o registro na tabela
        titulo: titulo,
        descricao: descricao
    }).then(()=>{
        res.redirect("/")

    }) // Redireciona o usuário
    
})

app.get("/pergunta/:id", (req, res) =>{
    var id = req.params.id
    Pergunta.findOne({ //Procura dado com condição
        where: {id:id}
    }).then(pergunta =>{
        if(pergunta != undefined){ // Encontrada

            Resposta.findAll({
                where: {perguntaId: pergunta.id},
                order:[['id', 'DESC']]
            }).then(respostas =>{
                res.render("pergunta",{
                    pergunta: pergunta,
                    respostas: respostas
                })
            })

           
        }else{ // Não encontrada
            res.redirect("/")
        }

    }) 

})


app.post("/responder", (req, res) => {
    var corpo = req.body.corpo
    var perguntaId = req.body.pergunta
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(()=>{
        res.redirect("/pergunta/"+ perguntaId)
    })
})

app.listen(8081,()=>{
    console.log("App rodando!")
})