import route from 'koa-route';
import {Document} from '../../components/Document/Document';
import {Tip} from '../../entities/Tip';

export default function () {
    let document = new Document();

    return route.get('/t/:id/', async (ctx, id) => {
        let tip = Tip.fromId(id),
            content = await tip.getContentPromise();

        ctx.body = document.render({content});
    });
}
