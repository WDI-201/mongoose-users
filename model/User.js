const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const userSchema = new mongoose.Schema({
	_id: { type: String, default: () => uuid() },
	name: { type: String, required: true },
	email: {
		type: String,
		required: true,
		maxLength: 320,
		trim: true,
		lowercase: true,
		unique: true,
	},
	password: { type: String, require: true, maxLength: 30 },
	phone: { type: Number, min: 1000000000, max: 9999999999 },
	createAt: { type: Date, default: Date.now },
});

//mongoose.model("Collection Name" singular, schema)
const User = mongoose.model("user", userSchema);
module.exports = User;

//update schema, save
//stop server
//drop collection
//start server

//test postman:
//omit name- what error does it give you?
//use the same email- what error does it give you?
//use phone number less than or greater than 10 digit to see error.
