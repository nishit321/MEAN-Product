import Express from 'express';

import dashboard from './dashboard.route';
import fileUpload from './fileupload.route';
import product from './product.route';

// create router instance
const router = Express.Router();

dashboard(router);

product(router);

fileUpload(router);
export default router;
