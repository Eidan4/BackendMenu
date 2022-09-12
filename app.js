require('dotenv').config();
const mongoose = require('mongoose');
  
const Server = require('./models/server');

const server = new Server();

server.listen();