const http = require('http');

const mockPage = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
    <body>

    </body>
</html>
`;

const server = http.createServer((req, res) => {
    const {url, headers: {host}} = req;
    const encodedUrl = encodeURIComponent(url);
    const encodedHost = encodeURIComponent(host);
    const rawDomain = host.replace(/:\d+$/, '');
    const rawPath = url.split('?')[0];

    console.log(encodedHost, encodedUrl);

    const setDomain = /domain\=1/.test(url);
    const setPath = /path\=1/.test(url);
    const cookie = `${encodedHost}${encodedUrl}=1;`
        + (setDomain ? `domain=${rawDomain};` : '')
        + (setPath ? `path=${rawPath};` : '');

    res.writeHead(200, {
        'Set-Cookie': cookie,
        'Content-Type': 'text/plain'
    });

    res.end();
});

const port = 6070;

server.listen(port, () => console.log(`Listening on ${port}`));
