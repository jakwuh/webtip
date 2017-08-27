import route from 'koa-route';
import compose from 'koa-compose';
import {getReadmeMarkdown} from '../helpers/getMarkdown';
import {Document} from '../../components/Document/Document';

export default function () {
    let document = new Document();

    return compose([
        route.get('/', ctx => ctx.redirect('/t/')),

        route.get('/t/', async (ctx) => {
            let content = await getReadmeMarkdown();

            if (content) {
                ctx.body = document.render({content: content});
            }
        })
    ]);
}
