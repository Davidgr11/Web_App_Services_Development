const express = require('express');
const app = express();
const port = 8000;
//conectar a la base de datos
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./mydb.sqlite', (err)=>
{
    if(err)
        console.log(err.message);
    console.log('Database conected');
});


// Middleware para analizar los datos del formulario
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ofrecer contenido de la carpeta public
app.use(express.static('public'));

app.post('/submit', (req, res) => {
    console.log("data received: ", req.body);

    // Obtener los datos del formulario
    const { name, sci_name, random_fact } = req.body;

    // Abrir la conexión a la base de datos
    let db = new sqlite3.Database('./mydb.sqlite', (err) => {
        if (err) {
            console.log(err.message);
        }
        console.log('Conexión establecida con la base de datos');
    });

    // Insertar los datos en la tabla fruta
    let query = `INSERT INTO fruta (name, sci_name, random_fact) VALUES (?, ?, ?)`;
    db.run(query, [name, sci_name, random_fact], function(err) {
        if (err) {
            console.log(err.message);
            res.status(500).json({ error: 'Error al insertar el registro en la base de datos' });
        } else {
            console.log(`Se ha insertado la fruta ${name} en la base de datos`);
            res.json({ message: 'Fruta agregada' });
        }
    });

    // Cerrar la conexión a la base de datos
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Conexión cerrada con la base de datos');
    });
});


app.get('/random', (req, res)=>
{
    let query = "SELECT * FROM fruta"
    //db.all para varios resultados (SELECT)
    //db.run para un resultado (INSERT, UPDATE, DELETE, CREATE TABLE)
    db.all(query, (err,rows)=>
    {
        if(err){
            console.log(err.message);
            response.json({error:err.message});
        }else{
            res.json(rows);
        }
    });
});

//resource catch all
app.use((req,res,next)=>
{
    res.status(404).sendFile(__dirname+'/public/404.html');
});

app.listen(port, ()=>
{
    console.log("iniciando servidor web de la api de frutas");
});