// * Require Model
const mongoose = require("mongoose");
const ChatRoom = mongoose.model("ChatRoom");

// * Get List Chatrooms
const getAllChatRooms = async (req, res) => {
	const chatRooms = await ChatRoom.find({});
	return res.status(200).json({
		chatRooms,
	});
};

// * Create New Chatroom
const createChatRoom = async (req, res) => {
	const { name } = req.body;

	const nameRegex = /^[A-Za-z\s]+$/;

	if (!nameRegex.test(name))
		throw "Chatroom name can contain only alphabets.";

	const chatRoomExist = await ChatRoom.findOne({ name });

	if (chatRoomExist) throw "Chatroom with that name already exists.";

	const chatRoom = new ChatRoom({ name });
	await chatRoom.save();
	return res.json({
		message: "Chat Room created!",
		chatRoom,
	});
};

module.exports = {
	createChatRoom,
	getAllChatRooms,
};
