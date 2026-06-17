const jwt = require("jsonwebtoken");

const JWT_SECRET = "clave_secreta_segura_2024";
const USUARIO_VALIDO = "admin";
const CONTRASENA_VALIDA = "1234";

const login = (req, res) => {
  const { usuario, contrasena } = req.body;

  if (usuario !== USUARIO_VALIDO || contrasena !== CONTRASENA_VALIDA) {
    return res.status(401).json({ mensaje: "Credenciales inválidas" });
  }

  const token = jwt.sign({ usuario }, JWT_SECRET, { expiresIn: "1h" });

  res.cookie("session_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.json({ mensaje: "Login exitoso", token });
};

const checkout = (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ mensaje: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { carro } = req.body;

    if (!carro || !Array.isArray(carro) || carro.length === 0) {
      return res.status(400).json({ mensaje: "Carro inválido o vacío" });
    }

    res.json({
      mensaje: "Pago aprobado por Transbank",
      usuario: decoded.usuario,
      productos_comprados: carro,
      codigo_autorizacion: "TBK-" + Date.now(),
    });

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ mensaje: "Token expirado" });
    }
    return res.status(401).json({ mensaje: "Token inválido o corrupto" });
  }
};

module.exports = { login, checkout };