require("dotenv").config();
const mongoose = require("mongoose");
const JWT = require("jwt-then");

// * Connection Database
mongoose.connect(process.env.DATABASE, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
mongoose.connection.on("error", (err) => {
	console.log("Mongoose Connection ERROR: " + err.messenge);
});

mongoose.connection.once("open", () => {
	console.log("MongoDB Connection DB Success !");
});

// * require Model
require("./models/User");
require("./models/Chatroom");
require("./models/Messenge");

const app = require("./app");

const server = app.listen(8000, () => {
	console.log("Sever is listening on port 8000");
});

// * Model Message
const Message = mongoose.model("Message");
const User = mongoose.model("User");

// * Setup SOCKET.IO
const io = require("socket.io")(server);

io.use(async (socket, next) => {
	try {
		const token = socket.handshake.query.token;
		const payload = await JWT.verify(token, process.env.SECRET);
		socket.userId = payload.id;
		next();
	} catch (error) {
		console.log(error);
	}
});

// * Socket connection
io.on("connection", (socket) => {
	console.log("Connected: " + socket.userId);

	// * User Disconnection
	socket.on("disconnect", () => {
		console.log("Disconnected: " + socket.userId);
	});

	socket.on("joinRoom", async ({ chatRoomId }) => {
		socket.join(chatRoomId);
		console.log("A User joined chatroom: " + chatRoomId);
	});

	socket.on("leaveRoom", ({ chatRoomId }) => {
		socket.leave(chatRoomId);
		console.log("A User left chatroom: " + chatRoomId);
	});

	socket.on("chatroomMessage", async ({ chatRoomId, message }) => {
		if (message.trim().length > 0) {
			const user = await User.findOne({ _id: socket.userId });
			const newMessage = new Message({
				chatroom: chatRoomId,
				user: socket.userId,
				message,
			});

			io.to(chatRoomId).emit("newMessage", {
				message: newMessage.message,
				_id: newMessage._id,
				name: user.name,
				userId: socket.userId,
			});
			await newMessage.save();
		}
	});
});
