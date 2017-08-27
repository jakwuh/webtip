export default function () {
    return async (ctx, next) => {
        let {path} = ctx;

        if (!path.endsWith('/')) {
            let url = ctx.origin + ctx.path + '/' + (ctx.querystring ? '?' + ctx.querystring : '');
            ctx.redirect(url);
        } else {
            await next();
        }
    };
}
