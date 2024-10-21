//Backend ejemplo con express usando ExpressJS
const express = require('express')
const app = express()
const port = 8000

//Ofrecer un directorio base
app.get("/", (req,res)=>
{
    res.send("Hola Mundo Mundial")
})
//Enviar la respuesta de un archivo JSON en la dirección data
app.get("/data", (req,res)=>
{
    const mensaje={
        message:"Hola mundo",
        token:12345,
        UUID:"34tskj5rj2343kacaslt3195u7",
        payload:[6,5,4,3,2,1,0]
    }
    res.json(mensaje)
})
//generic catch-all
app.use((req,res)=>
{
    const msg = {
        error:"404 not found :("
    }
    res.json(msg)
})

app.listen(port, ()=>
{
    console.log(`servidor escuchando en el puerto ${port}`)
})