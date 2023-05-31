var express = require("express");
var router = express.Router();
const User = require("../model/User");

/* GET users listing. */
router.get("/", function (req, res, next) {
	res.send("respond with a resource");
});

router.get("/all-users", async (req, res) => {
	try {
		const allUsers = await User.find({});
		res.status(200).json({ success: true, data: allUsers });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: error.message });
	}
});

router.post("/new-user", async (req, res) => {
	try {
		const { name, email, password, phone } = req.body;
		const user = {
			name: name,
			email: email,
			password: password,
			phone: phone,
		};
		const newUser = await new User(user); // calls User model
		// {
		//     "_id": "cebf44ba-9ebb-4bcb-8f90-c8365ca98350",
		//     "name": "Ginny",
		//     "email": "gg@gmail.com",
		//     "password": "helloWOrld",
		//     "phone": 9171234567,
		//     "createAt": "2023-05-31T14:37:59.165Z",
		// }
		const saveUser = await newUser.save(); // calls line 29 and save
		res.status(200).json({ success: true, data: saveUser });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
});

// create a get route, find by email using the findOne method, use req.params.
router.get("/user/:email", async (req, res) => {
	try {
		const email = req.params.email;
		const user = await User.findOne({ email: email });
		if (!user)
			return res
				.status(400)
				.json({ success: false, message: "User not found" });
		res.status(200).json({ success: true, data: user });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: error.message });
	}
});

//create a get route, find all users with the same name, use req.query

router.get("/user-name", async (req, res) => {
	try {
		//http://localhost:3000/users/user-name?name=Ginny
		const name = req.query.name;
		const users = await User.find({ name: { $regex: new RegExp(name, "i") } });
		if (!users)
			return res
				.status(400)
				.json({ success: false, message: "No users with that name" });
		res.status(200).json({ success: true, data: users });
	} catch (error) {
		console.log(error);
		res.status(500).json({ success: false, message: error.message });
	}
});

router.put("/update-user/:id", async (req, res) => {
	try {
		const updateUser = await User.findOneAndUpdate(
			{ _id: req.params.id },
			req.body
		);
		if (!updateUser)
			return res
				.status(400)
				.json({ success: false, message: "user not found" });
		res.status(200).json({ success: true, data: updateUser });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
});

// create a delete route, takes in id params and deletes one user based on the id.
router.delete("/delete/:id", async (req, res) => {
	try {
		const deleteUser = await User.findByIdAndDelete({ _id: req.params.id });
		if (!deleteUser)
			return res
				.status(400)
				.json({ success: false, message: "user not deleted" });
		res.status(200).json({ success: true, data: deleteUser });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
});

module.exports = router;
