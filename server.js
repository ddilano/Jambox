// import io from 'socket.io-client';
// let serverUrl = 'localhost:3000';
// let socket = io(serverUrl);

const io = require('socket.io')();

io.on('connection', (client) => {
  client.on('subscribeToTimer', (interval) => {
    console.log('client is subcribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });
});

io.listen(8000);
console.log('listening on port 8000');
