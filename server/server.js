import express from 'express';
import http from 'http';
import cors from 'cors';
import { WebSocketServer, WebSocket } from 'ws';
import tareasRouter, { setWebSocketServer } from './tareas.js';
import usuariosRouter from './usuarios.js';
import autenticarToken from './autenticacion.js';
import dotenv from 'dotenv'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; 

app.use(cors({
    origin: process.env.URLFRONTEND,
    credentials: true
}));
app.use(express.json());

app.use('/api/usuarios', usuariosRouter);
app.use('/api/tareas', autenticarToken, tareasRouter);



const server = http.createServer(app);


const wss = new WebSocketServer({ server });
setWebSocketServer(wss);

wss.on('connection', (ws) => {
    console.log('Cliente conectado via WebSocket');

    ws.on('message', (message) => {
        console.log('Mensaje recibido via WS:', message);
        let datos;
        try {
            datos = JSON.parse(message);
        } catch (e) {
            datos = { mensaje: message.toString() };
        }
        
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(datos));
            }
        });
    });

    ws.send(JSON.stringify({ mensaje: "Bienvenido al chat" }));
});


server.listen(PORT, () => {
    console.log(`Servidor con Websockets corriendo en http://localhost:${PORT}`);
});