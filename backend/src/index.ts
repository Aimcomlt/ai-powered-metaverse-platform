import express from 'express';
import dotenv from 'dotenv';

import deployExecutor from './routes/deployExecutor';
import abiRoute from './routes/abi';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/deploy-executor', deployExecutor);
app.use('/abi', abiRoute);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Backend server listening on ${port}`);
});
