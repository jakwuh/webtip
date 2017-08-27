import {NotFoundError} from '../../entities/errors';

export default function () {
    return async (ctx, next) => {
        try {
            await next();
        } catch (e) {
            if (e instanceof NotFoundError) {
                ctx.status = 404;
            } else {
                ctx.status = 500;
                console.error(e);
            }
        }
    }
}
