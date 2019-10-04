const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

// serve the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, +'public/index.html'));
});

io.on('connection', socket => {
  console.log('a user connected');
});

http.listen(3000, () => {
  console.log('up and running on port 3000');
});
