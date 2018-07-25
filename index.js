const net = require('net');
const spawn = require("child_process").spawn;

let verbose = false;

const server = net.createServer((socket) => {
	socket.on("error", (error) => {
		if(verbose) {
			console.log(error);
		}
	});

	const address = socket.address().address;

	socket.end();

	spawn("notify-send", ["--icon", "/usr/share/icons/Adwaita/64x64/status/dialog-warning-symbolic.symbolic.png", "Honotify", "You are being scanned by " + address]);
});

server.listen(5900, '127.0.0.1');

