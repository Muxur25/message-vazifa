import { model, Schema } from 'mongoose'

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

export default model('Call', callSchema)
