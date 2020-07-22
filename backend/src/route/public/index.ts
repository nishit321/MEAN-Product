import Express from 'express';

// create router instance
const router = Express.Router();

import register from './register.route';
register(router);

import login from './login.route';
login(router);

export default router;
