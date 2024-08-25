const { model, Schema } = require('mongoose')

// id: String, User ID

// userId: Integer, Foreign key to User

// status: String, Default is 'active'

const roomSchema = new Schema(
	{
		userId: {
			type: Schema.ObjectId,
			ref: 'User',
		},
		status: {
			type: String,
			default: 'active',
		},
	},
	{ timestamps: true }
)

module.exports = model('Room', roomSchema)
