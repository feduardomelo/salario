const express = require("express")
const server = express()

const db = require("./db")

// p/ usar css e js estaticos
server.use(express.static("public"))

//habilitar req body para receber inputs do usuario
server.use(express.urlencoded({ extended: true }))

const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    //checar se o nocache é necessário
    //noCache: true   
})

server.get("/", function(req, res){
    
    db.all(`SELECT * FROM salarios`, function(err, rows){
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }
    
    

    const reverseSalarios = [...rows].reverse()

    let lastSalarios = []
    for (salario of reverseSalarios) {
        if(lastSalarios.length <2) {
            lastSalarios.push(salario)
        }
    }
    return res.render("index.html", {salarios: lastSalarios})
    
    })
})

server.get("/salarios", function(req, res){

    db.all(`SELECT * FROM salarios`, function(err, rows){
        if(err) {
            console.log(err)
            return res.send("Erro no banco de dados.")
        }

        const reverseSalarios = [...rows].reverse()

        return res.render("salarios.html", {salarios: reverseSalarios})
    })
})

server.post("/", function(req, res){

    const query = `
    INSERT INTO salarios (
        profissao,
        category,
        description,
        salario
    ) VALUES (?,?,?,?);
`
    const values = [
        req.body.profissao,
        req.body.category,
        req.body.description,
        req.body.salario
    ]

    db.run(query, values, function(err){
        if(err) {
            console.log(err)
            return res.send("ero no banco de dados.")
        }
        else {console.log("deu certo")}

        return res.redirect("/salarios")
    })

})


server.listen(process.env.PORT || 3000)