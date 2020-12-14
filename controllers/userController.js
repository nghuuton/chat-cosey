// * Require Model && Libary
const mongoose = require("mongoose");
const User = mongoose.model("User");
const sha256 = require("js-sha256");
const JWT = require("jwt-then");

// * Register New Account
const register = async (req, res) => {
	const { name, email, password } = req.body;

	const emailRegex = /@gmail.com|@yahoo.com|@hotmail.com|@live.com/;

	if (!emailRegex.test(email))
		throw "Email is not supported from your domain.";
	if (password.length < 6)
		throw "Password must be atleast 6 characters long.";

	const user = new User({
		name,
		email,
		password: sha256(password + process.env.SALT),
	});

	await user.save();

	return res.json({ message: "User [" + name + "] register successfully !" });
};

// * Login Account
const login = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({
		email,
		password: sha256(password + process.env.SALT),
	});

	if (!user) throw "Email and Password did not match.";

	const token = await JWT.sign({ id: user._id }, process.env.SECRET);

	return res.json({
		message: "User logged in successfully",
		token,
	});
};

module.exports = {
	login,
	register,
};
