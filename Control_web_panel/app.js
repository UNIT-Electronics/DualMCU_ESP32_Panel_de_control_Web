// const express = require("express");
// const bodyParser = require("body-parser");

// const app = express();
// const port = 3000;

// app.use(bodyParser.json());
// app.use(express.static("public")); // Carpeta para archivos estáticos

// let potentiometerValue = 0;

// app.post("/endpoint", (req, res) => {
//   potentiometerValue = req.body.potentiometer_value;
//   console.log(`Valor del potenciómetro actualizado: ${potentiometerValue}`);
//   res.sendStatus(200);
// });

// app.get("/getPotentiometerValue", (req, res) => {
//   res.json({ value: potentiometerValue });
// });

// app.listen(port, () => {
//   console.log(`Servidor Node.js en ejecución en el puerto ${port}`);
// });
const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const WebSocket = require("websocket").server;

const app = express();
const server = http.createServer(app);
const wsServer = new WebSocket({ httpServer: server });

app.use(bodyParser.json());
app.use(express.static("public")); // Carpeta para archivos estáticos

let potentiometerValue = 0;

app.post("/endpoint", (req, res) => {
  potentiometerValue = req.body.potentiometer_value;
  console.log(`Valor del potenciómetro actualizado: ${potentiometerValue}`);
  res.sendStatus(200);

  // Envía el nuevo valor a todos los clientes WebSocket
  wsServer.broadcast(JSON.stringify({ value: potentiometerValue }));
});

app.get("/getPotentiometerValue", (req, res) => {
  res.json({ value: potentiometerValue });
});

// Configuración del WebSocket
wsServer.on("request", (request) => {
  const connection = request.accept(null, request.origin);

  // Envía el valor del potenciómetro cuando un cliente WebSocket se conecta
  connection.send(JSON.stringify({ value: potentiometerValue }));
});

const listenAddress = '0.0.0.0';
const port = 3000;

server.listen(port, listenAddress, () => {
  console.log(`Servidor en funcionamiento en ${listenAddress}:${port}`);
});
