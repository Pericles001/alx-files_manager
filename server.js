import express from 'express';
import { env } from 'process';
import router from './routes/index';

const app = express();
const port = env.PORT || 5000;
const routes = require('./routes/index');

app.use(express.json());
app.use(router);
app.listen(port, '127.0.0.1', () => console.log(`Server started on port ${port}`));


export default app;
