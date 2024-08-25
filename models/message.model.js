// id: Integer, Auto-generated

// roomId: String, Foreign key to Room

// senderId: Integer, Foreign key to User or Call Center Member

// message: String

// timestamp: DateTime

const { model, Schema } = require('mongoose')

const messageSchema = new Schema(
	{
		roomId: {
			type: Schema.ObjectId,
			ref: 'Room',
		},

		message: {
			type: String,
			required: true,
		},
		senderId: { type: Schema.Types.ObjectId, ref: 'User' },
	},
	{ timestamps: true }
)

module.exports = model('Message', messageSchema)
