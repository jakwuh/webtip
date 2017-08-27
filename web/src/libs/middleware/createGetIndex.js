import route from 'koa-route';
import {getReadmeMarkdown} from '../helpers/getMarkdown';
import {Document} from '../../components/Document/Document';

export default function () {
    let document = new Document();

    return route.get('/(t/)?', async (ctx) => {
        let content = await getReadmeMarkdown();

        if (content) {
            ctx.body = document.render({content: content});
        }
    });
}
