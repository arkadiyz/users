const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const db = require('./services/db.service');

const app = express();
const http = require('http').createServer(app);

const registerRoutes = require('./api/register/register.routes');
const authRoutes = require('./api/auth/auth.routes');
const usersRoutes = require('./api/users/users.routes');
app.use(express.json());
app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(
//   session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secret: false },
//   })
// );

if (process.env.NODE_ENV === 'prodaction') {
  app.use(express.static(path.resolve(__dirname, 'public')));
} else {
  const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  };
  app.use(cors(corsOptions));
}

app.use('/api/register', registerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

const logger = require('./services/logger.service');
const port = process.env.PORT || 3030;

http.listen(port, () => {
  logger.info('==================================== ');
  logger.info('Server is running on port: ' + port);
  logger.info('/==================================/ ');
  console.log('Server is running on port: ' + port);
});
