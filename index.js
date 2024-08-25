const express = require('express')
require('dotenv').config()
const app = express()

const path = require('path')
const socketio = require('socket.io')
const http = require('http')
const { default: mongoose } = require('mongoose')
const error = require('./middleware/error')
const server = http.createServer(app)
const io = socketio(server)
const User = require('./models/user.model')
const Call = require('./models/callCenter.model')
const Message = require('./models/message.model')
const Room = require('./models/room.model')

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/user', require('./routers/users.router'))

app.use('/call', require('./routers/call.router'))

io.use(async (socket, next) => {
	try {
		const token = socket.handshake.auth.token
		if (!token) throw new Error('No token provided')
		const decoded = jwt.verify(token, process.env.SECRET_JWD)
		socket.user = decoded
		next()
	} catch (error) {
		next(new Error('Authentication error'))
	}
})

io.on('connection', socket => {
	
})

app.use(error)

const bootstrap = async () => {
	server.listen(process.env.PORT, () => {
		console.log('Server listened to 3000')
	})

	await mongoose.connect(process.env.DB_URL).then(() => {
		console.log('DB connection')
	})
}

bootstrap()
