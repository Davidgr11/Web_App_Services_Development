//inicializa to base de datos
//incluir la biblioteca de sqlite3

const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./mydb.sqlite', (err)=>
{
    if(err)
        console.log(err.message);
    console.log('Database created');
});


let query = "CREATE TABLE IF NOT EXISTS fruta \
            (id INTEGER PRIMARY KEY AUTOINCREMENT,\
            name TEXT,\
            sci_name TEXT,\
            random_fact TEXT);"
db.run(query, (err)=>
{
    if(err){
        console.log(err.message);}
    else{
        console.log('Tabla fruta creada en la DB');}
});


query = "INSERT INTO fruta (name,sci_name,random_fact) VALUES \
    ('manzana', 'malus domestica', 'Existen mas de 7500 variedades'),\
    ('pera', 'pyrus comunis', 'Tardan semanas en madurar y ser comestibles'),\
    ('naranja', 'citrus sinensis', 'Su nombre viene del sanscrito naranja');"
db.run(query, (err)=>
{
    if(err){
        console.log(err.message);}
    else{
        console.log('Registros insertados');}
});
db.close();