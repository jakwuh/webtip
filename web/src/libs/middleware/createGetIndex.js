import route from 'koa-route';
import {getReadmeMarkdown} from '../helpers/getMarkdown';
import {Document} from '../../components/Document/Document';

export default function () {
    let document = new Document();

    return route.get('/(t/)?', async (ctx) => {
        let tip = await getReadmeMarkdown();

        if (tip) {
            ctx.body = document.render({content: tip});
        }
    });
}
