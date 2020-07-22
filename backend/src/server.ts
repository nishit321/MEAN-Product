import App from './app';

// file containing security! check .gitignore to exclude all security concerning files from committing!!
const envs = require('../.env/envs');

const app = new App(envs.host.port, envs.host.address);
// start App
app.listen();
