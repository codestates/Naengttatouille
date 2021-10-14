require('dotenv').config();
const fs = require('fs');
const https = require('https');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const { userRouter, ingredientRouter, refrigeratorRouter } = require('./routes');

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT || true,
    methods: ['GET', 'POST', 'OPTIONS', 'PATCH', 'DELETE'],
    credentials: true,
  })
);
app.use(cookieParser());
app.get('/', (req, res) => res.send('hello world!'));
app.use('/user', userRouter);
app.use('/ingredient', ingredientRouter);
app.use('/refrigerator', refrigeratorRouter);

const PORT = process.env.HTTPS_PORT || process.env.HTTP_PORT;
let server;
if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) {
  const privateKey = fs.readFileSync(__dirname + '/key.pem', 'utf8');
  const certificate = fs.readFileSync(__dirname + '/cert.pem', 'utf8');
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(PORT, () => console.log(`https server runnning PORT ${PORT}`));
} else {
  server = app.listen(PORT, () => console.log(`http server runnning PORT ${PORT}`));
}
module.exports = server;
