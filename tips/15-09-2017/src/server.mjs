import net from 'net';

let port = process.env.PORT;
let noDelay = Boolean(process.env.TCP_NODELAY);

let server = net.createServer(socket => {
	socket.setNoDelay(noDelay);
	for (let i = 0; i < 10; i++)
		socket.write('' + i);
	console.log(Date.now());
});

server.listen(port, '127.0.0.1', () => {
	console.log('Server is running...');
});
