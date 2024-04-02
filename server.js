// server.js
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./Routes/usersRoutes')

app.use(bodyParser.json());
app.use(cors())
const port = 3000;

const uri = "mongodb+srv://pawan:Pawan_8520@cluster0.8ut8njf.mongodb.net/";

async function connect(){
  try {
      await mongoose.connect(uri);
      console.log("Connected to MongoDB");
  }
  catch(error) {
      console.log(error);
  }
}
connect();

app.use('/users', userRoutes);
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
