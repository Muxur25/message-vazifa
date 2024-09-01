import { model, Schema } from 'mongoose'

// id: String, User ID

// userId: Integer, Foreign key to User

// status: String, Default is 'active'

const roomSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		status: {
			type: String,
			enum: ['active', 'busy'],
			default: 'active',
		},
	},
	{ timestamps: true }
)

export default model('Room', roomSchema)
