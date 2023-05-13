import express from 'express'; 
import config from './config';

import containersRoutes from './routes/containers.routes';

const app = express();

let port = 6000;
// settings
app.set('port', config.port);

app.use(containersRoutes);

export default app;