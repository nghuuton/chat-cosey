// * Require Model
const mongoose = require("mongoose");
const { populate } = require("../models/User");
const Message = mongoose.model("Message");

const getListMessages = async (req, res) => {
	const { chatRoomId } = req.params;
	const listMessages = await Message.find({ chatroom: chatRoomId }).populate(
		"user"
	);

	return res.json({ listMessages });
};

module.exports = {
	getListMessages,
};
