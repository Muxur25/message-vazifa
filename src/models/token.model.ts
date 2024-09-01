import { model, Schema } from 'mongoose'

const tokenSchema = new Schema({
	user: {
		type: Schema.ObjectId,
		ref: 'User',
	},
	call: {
		type: Schema.ObjectId,
		ref: 'Call',
	},
	refreshToken: {
		type: String,
		required: true,
	},
})

export default model('Token', tokenSchema)
