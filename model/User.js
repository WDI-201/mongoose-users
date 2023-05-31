const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const userSchema = new mongoose.Schema({
	_id: { type: String, default: () => uuid() },
	name: String,
	email: {
		type: String,
		require: true,
		maxLength: 320,
		trim: true,
		lowercase: true,
		unique: true,
	},
	password: { type: String, require: true, maxLength: 30 },
	phone: { type: Number, minLength: 10, maxLength: 10 },
	createAt: { type: Date, default: Date.now },
});

//mongoose.model("Collection Name", schema)
const User = mongoose.model("user", userSchema);
module.exports = User;
