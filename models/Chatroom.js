const { Schema, model } = require("mongoose");

const chatRoomSchema = new Schema({
    name: {
        type: String,
        required: "Name is required.",
    },
});

module.exports = model("ChatRoom", chatRoomSchema);
