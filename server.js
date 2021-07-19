
const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT || 9000;
const io = require("socket.io")(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: [ "GET", "POST" ]
	}
})

const rooms = {};

io.on("connection", (socket) => {

    // socket.emit("me", socket.id)

	socket.on("join room", roomID => {
        if (rooms[roomID]) {
            rooms[roomID].push(socket.id);
        } else {
            rooms[roomID] = [socket.id];
        }
        const otherUser = rooms[roomID].find(id => id !== socket.id);
        if (otherUser) {
            socket.emit("other user", otherUser);
            socket.to(otherUser).emit("user joined", socket.id);
        }
    });

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
		
	})

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})
})


server.listen(PORT, () => console.log("server is running on port " + PORT))