const { model, Schema } = require('mongoose')

const callSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			uniqe: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
)

module.exports = model('Call', callSchema)
