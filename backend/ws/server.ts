import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', ws => {
  ws.send('connected');
});

console.log('WebSocket server running on port 8080');
