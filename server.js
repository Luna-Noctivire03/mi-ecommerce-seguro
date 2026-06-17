const https = require("https");
const fs = require("fs");
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const productosRoutes = require("./src/routes/productosRoutes");
const authRoutes = require("./src/routes/authRoutes");

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Servir el frontend (index.html)
app.use(express.static(path.join(__dirname)));

// Rutas de la API
app.use("/api", productosRoutes);
app.use("/api", authRoutes);

// Leer certificados SSL
const opciones = {
  key: fs.readFileSync(path.join(__dirname, "certs", "servidor.key")),
  cert: fs.readFileSync(path.join(__dirname, "certs", "servidor.cer")),
};

// Levantar servidor HTTPS en puerto 8443
https.createServer(opciones, app).listen(8443, () => {
  console.log("✅ Servidor HTTPS corriendo en https://localhost:8443");
  console.log("📄 Frontend disponible en https://localhost:8443/index.html");
});