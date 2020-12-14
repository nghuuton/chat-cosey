// * Require Controller && HandlerError && Libary
const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandlers");
const messageController = require("../controllers/messageController");
// * Middleware Auth
const auth = require("../middlewares/auth");
// * Router
router.get(
	"/:chatRoomId",
	auth,
	catchErrors(messageController.getListMessages)
);

module.exports = router;
