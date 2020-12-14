// * Require Controller && HandlerError && Libary
const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandlers");
const chatRoomController = require("../controllers/chatRoomController");

// * Middleware Auth
const auth = require("../middlewares/auth");

// * Router
router.get("/", auth, catchErrors(chatRoomController.getAllChatRooms));
router.post("/", auth, catchErrors(chatRoomController.createChatRoom));

module.exports = router;
