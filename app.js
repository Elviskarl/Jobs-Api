require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');
const authenticatedUser = require('./middleware/authentication');
const helmet = require('helmet');
const cors = require('cors');
const xssClean = require('xss-clean');
const expressRateLimit = require('express-rate-limit');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1);
app.use(expressRateLimit({
  windowMs: 15 * 60 * 1000, //15 minutes
  max: 100 //Limit each ip to 100 requests per windowMs
}));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xssClean());

// extra packages

// routes
app.get('/', (req, res) => {
  res.send('jobs api');
});
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/jobs',authenticatedUser,jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
      )
  } catch (error) {
    console.log(error);
  }
};

start();
