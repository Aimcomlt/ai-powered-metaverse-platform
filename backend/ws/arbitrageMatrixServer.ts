import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8081 });

wss.on('connection', ws => {
  // placeholder stream of arbitrage matrix
  ws.send(JSON.stringify({ matrix: [] }));
});

console.log('Arbitrage matrix WebSocket server running on port 8081');
