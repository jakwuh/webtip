import 'babel-polyfill';
import Koa from 'koa';
import route from 'koa-route';
import serve from 'koa-static';
import mount from 'koa-mount';
import minimist from 'minimist';

import {Document} from '../components/Document/Document';
import {getTip} from '../libs/helpers/getTip';

const app = new Koa();
const args = minimist(process.argv);

app.use(route.get('/t/:id', async (ctx, id) => {
    let document = new Document();
    let tip = await getTip(id);

    if (tip) {
        ctx.body = document.render({content: tip});
    }
}));

app.use(mount('/assets/', serve(ASSETS_PATH)));

const {port = 3000} = args;

app.listen(port, (err) => {
    if (err) {
        console.error(err);
    }

    console.log(`Server is listening on http://localhost:${port}`);
});
