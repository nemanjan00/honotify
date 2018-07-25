const net = require('net');
const spawn = require("child_process").spawn;

let verbose = false;
let ip = "0.0.0.0";
let port = 5900;

const server = net.createServer((socket) => {
	socket.on("error", (error) => {
		if(verbose) {
			console.log(error);
		}
	});

	const address = socket.address().address;

	socket.end();

	console.log("You are being scanned by " + address);
	spawn("notify-send", ["--icon", "/usr/share/icons/Adwaita/64x64/status/dialog-warning-symbolic.symbolic.png", "Honotify", "You are being scanned by " + address]);
});

server.on("listening", () => {
	console.log("Succesfully started listening on "+ip+":"+port);
})

server.on('error', (e) => {
	if (e.code === 'EADDRINUSE') {
		console.log('Address in use, retrying...');
		setTimeout(() => {
			server.close();
			server.listen(port, ip);
		}, 1000);
	}
});

server.listen(5900, '0.0.0.0');

