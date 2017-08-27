import 'babel-polyfill';
import Koa from 'koa';
import minimist from 'minimist';
import createLogger from 'koa-logger';

import createSlashRedirect from '../libs/middleware/createSlashRedirect';
import createAssetsServe from '../libs/middleware/createAssetsServe';
import createGetTip from '../libs/middleware/createGetTip';
import createGetIndex from '../libs/middleware/createGetIndex';
import createErrorHandler from '../libs/middleware/createErrorHandler';

const args = minimist(process.argv);
const app = new Koa();

app.use(createErrorHandler());
app.use(createLogger());
app.use(createAssetsServe());
app.use(createSlashRedirect());
app.use(createGetTip());
app.use(createGetIndex());

const {port = 3000} = args;

app.listen(port, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Server is listening on http://localhost:${port}`);
    }
});
