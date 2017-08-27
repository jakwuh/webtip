export default function () {
    return async (ctx, next) => {
        let {path} = ctx;

        if (!path.endsWith('/')) {
            let url = ctx.origin + ctx.path + '/' + (ctx.querystring ? '?' + ctx.querystring : '');
            return ctx.redirect(url);
        }

        await next();
    };
}
