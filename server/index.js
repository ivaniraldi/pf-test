const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_URL,
});

const app = express();
app.use(cors());
app.use(express.json());

const server = app.listen(3000, async () => {
  console.log("✅ | Server funcionando");
  try {
    const res = await pool.query("SELECT NOW()");
    console.log(
      "✅ | Base de datos conectada y funcionando en la siguiente fecha: " +
        res.rows[0].now
    );
  } catch (error) {
    console.log("❌ | Error en la conexion con la DB");
  }
});

app.get("/", (req, res) => {
  res.send("Servidor funcionando :)");
});

app.get("/hora", async (req, res) => {
  const response = await pool.query("SELECT NOW()");
  const hora = response.rows[0].now;
  res.json(hora);
});

app.get("/users", async (req, res) => {
  try {
    const resp = await pool.query("SELECT * FROM users");
    const users = resp.rows;
    res.json(users);
  } catch (error) {
    console.log(error);
  }
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *",
      [username, password, "user"]
    );
    res.status(201).json({
      message: "Usuario registrado correctamente",
      user: result.rows[0]
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );
    const user = result.rows[0];
    if (!user) {
      return res.status(400).json({
        error: "Credenciales Invalidas",
      });
    } else {
      const token = jwt.sign(
        {
          userId: user.user_id,
          role: user.role,
        },
        process.env.JWT_SECRET
      );
      res.status(200).json({
        message: "Inicio de sesion exitoso",
        token,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, tokenContent) => {
    if (err) return res.sendStatus(403);
    req.user = tokenContent;
  });
  next();
}

app.get("/protected", authenticateToken, (req, res) => {
  const role = req.user.role
  if(role == "admin"){
    res.json({
    message: "Acceso concedido con rol de administrador",
    user: req.user,
  });
  }else{
    res.json({
    message: "Acceso concedido con rol de usuario",
    user: req.user,
  });
  }
});


module.exports = server