const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
	chatroom: {
		type: Schema.Types.ObjectId,
		required: "Chat Room is required.",
		ref: "ChatRoom",
	},
	user: {
		type: Schema.Types.ObjectId,
		required: "User is required.",
		ref: "User",
	},
	message: {
		type: String,
		required: "Messenge is required.",
	},
});

module.exports = model("Message", messageSchema);
