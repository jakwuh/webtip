import net from 'net';

let client = new net.Socket();
let port = process.env.PORT;

client.connect(port, '127.0.0.1', () => {
	console.log('Connected');
});

client.on('data', data => {
	console.log(Date.now());
	console.log(`Received: ${data}`);
});

client.on('close', () => {
	console.log('Connection closed');
});
