const AWS = require('aws-sdk');
AWS.config();
const fs = require('fs');
const https = require('https');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const {
  userRouter,
  ingredientRouter,
  refrigeratorRouter,
} = require('./routes');

app.use(express.json());
app.use(
  cors({
    origin: AWS.CLIENT,
    methods: ['GET', 'POST', 'OPTIONS', 'PATCH', 'DELETE'],
  })
);
app.use(cookieParser());

app.get('/', (req, res) => {
  res.status(200).send('Hello World');
});

app.use('/user', userRouter);
app.use('/ingredient', ingredientRouter);
app.use('/refrigerator', refrigeratorRouter);

const PORT = AWS.HTTP_PORT || AWS.HTTPS_PORT;
let server;
if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) {
  const privateKey = fs.readFileSync(__dirname + '/key.pem', 'utf8');
  const certificate = fs.readFileSync(__dirname + '/cert.pem', 'utf8');
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(PORT, () => console.log(`https server runnning PORT ${PORT}`));
} else {
  server = app.listen(PORT, () =>
    console.log(`http server runnning PORT ${PORT}`)
  );
}
module.exports = server;
