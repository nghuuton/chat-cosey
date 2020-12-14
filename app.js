require("dotenv").config();
const express = require("express");

const app = express();
const cors = require("cors");

// * Use Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// * Routes
app.use("/user", require("./routes/user"));
app.use("/chatroom", require("./routes/chatRoom"));
app.use("/message", require("./routes/message"));
// * Error handlers
const errorHandlers = require("./handlers/errorHandlers");
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoseErrors);
if (process.env.ENV === "DEVELOPMENT") {
	app.use(errorHandlers.developmentErrors);
} else {
	app.use(errorHandlers.productionErrors);
}

module.exports = app;
