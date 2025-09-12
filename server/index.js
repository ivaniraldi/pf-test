const express = require("express")
const cors = require("cors")
const { Pool } = require("pg")
require("dotenv").config()

const pool = new Pool({
    connectionString: process.env.DB_CONNECTION_URL
})

const app = express()
app.use(cors())

app.listen(3000, async ()=>{
    console.log("Server funcionando")
    try {
        const res = await pool.query("SELECT NOW()")
        console.log("Base de datos conectada y funcionando en la siguiente fecha: " + JSON.stringify(res.rows[0]))
    } catch (error) {
        console.log("Error en la conexion con la DB")
    }
})


app.get("/", (req, res)=>{
    res.send("Servidor funcionando :)")
})

app.get("/hora", async (req, res) =>{
    const response = await pool.query("SELECT NOW()")
    const hora = response.rows[0].now
    res.json(hora)
})