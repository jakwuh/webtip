import route from 'koa-route';
import compose from 'koa-compose';
import mount from 'koa-mount';
import serve from 'koa-static';
import send from 'koa-send';
import {Tip} from '../../entities/Tip';

export default function () {
    return compose([
        mount('/speaking/', serve(SPEAKING_ASSETS_PATH)),
        mount('/assets/', serve(ASSETS_PATH)),

        route.get('/t/:id/:asset+', async (ctx, id, asset) => {
            let tip = Tip.fromId(id),
                root = tip.getRoot();

            await send(ctx, asset, {root});
        })
    ]);
}
