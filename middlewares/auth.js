const JWT = require("jwt-then");

module.exports = async (req, res, next) => {
	try {
		if (!req.headers.authorization) throw "Forbidden!!";
		const token = req.headers.authorization.split(" ")[1];
		// * Bearer askjdsajdkasd
		const payload = await JWT.verify(token, process.env.SECRET);
		req.payload = payload;
		next();
	} catch (error) {
		res.status(401).json({ message: "Forbidden!!" });
	}
};
