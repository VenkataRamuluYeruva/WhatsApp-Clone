const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const WebSocket = require('ws');
const url = require('url');
const authentication = require("./routes/Authentication");
const chquery = require("./routes/routes");
const cookieParser = require('cookie-parser');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/authentication", authentication);
app.use("/chat", chquery);
app.use(cookieParser());

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const wss = new WebSocket.Server({ server });

// Map to store connected clients by user ID
let users = {};
wss.on('connection', (ws, req) => {
  const params = new url.URL(req.url, 'http://localhost').searchParams;
  const userId = params.get('userId');
  console.log('Connected:', userId);
  // Store the user's WebSocket connection
  if (userId) {
    users[userId] = ws;

  }

  ws.on('message', (message) => {
    const data = JSON.parse(message);
    if (data.messageType === 'text') {
      handleMessageSend(data);
    }
    // if (messageType === 'notification') {
    //   console.log('Notification received:', data);
    //   handleNotificationSend(user, receiver, content);
    // }
  });
 
  ws.on('close', () => {
    // Remove the user's WebSocket connection when they disconnect
    delete users[userId];
  });
});

