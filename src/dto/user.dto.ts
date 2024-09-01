export interface Iuser {
	username: string
	_id: string
}

export class UserDto {
	username
	id

	constructor(model: Iuser) {
		this.username = model.username
		this.id = model._id
	}
}
