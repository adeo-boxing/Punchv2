const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

io.on('connection', (socket) => {
    // Relais générique des messages de signalement WebRTC (offres, réponses, ice candidates)
    socket.on('signal', (data) => {
        socket.broadcast.emit('signal', data);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`\n🥊 Serveur de signalement WebRTC lancé sur http://localhost:${PORT}`);
    console.log(`👉 Connectez les deux smartphones au même Wi-Fi.\n`);
});