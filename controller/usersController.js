const User = require("../model/User");

const getAllUsers = async (req, res) => {
	try {
		const allUsers = await User.find({});
		res.status(200).json({ success: true, data: allUsers });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: error.message });
	}
};

module.exports = {
	getAllUsers,
};
