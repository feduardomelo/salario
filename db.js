const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database('./salario.db')

db.serialize(function(){

    db.run(`
        CREATE TABLE IF NOT EXISTS salarios(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            profissao TEXT,
            category TEXT,
            description TEXT,
            salario TEXT
        );
    `)

    /*const query = `
            INSERT INTO salarios(
                profissao,
                category,
                description,
                salario
            ) VALUES (?,?,?,?)
    `

    const values = [
        "Contador",
        "Negócios",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad incidunt commodi pariatur, soluta fuga labore optio cumque eos quis voluptatibus aliquam culpa iste tenetur aliquid quia mollitia porro rerum necessitatibus.",
        "R$5500,00"
    ]

    db.run(query, values, function(err){
        if (err) return console.log(err)

        console.log(this)
    })*/

    
})

module.exports = db