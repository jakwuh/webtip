import route from 'koa-route';
import {Document} from '../../components/Document/Document';
import {Tip} from '../../entities/Tip';

export default function () {
    let document = new Document();

    return route.get('/t/:id/', async (ctx, id) => {
        if (id.includes('-')) {
            let index = Tip.findIndexByDate(id);
            return ctx.redirect(`/t/${index}/`);
        }

        let tip = Tip.fromId(id);

        await tip.fetchContent();

        ctx.body = document.render({tip});
    });
}
