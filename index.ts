import express from 'express'
import callRouter from './src/routers/call.router'
import userRouter from './src/routers/users.router'
require('dotenv').config()
const app = express()

import { urlencoded } from 'body-parser'
import cookieParser from 'cookie-parser'
import mongoose from 'mongoose'
import path from 'path'
import { Socket, Server as SocketIOServer } from 'socket.io'
import { errorMiddleware } from './src/middleware/error'
// import Message from './src/models/message.model'
// import Room from './src/models/room.model'
// import tokenService from './src/services/token.service'

const http = require('http')
const server = http.createServer(app)
const io = new SocketIOServer(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
})
app.use(express.json())
app.use(express.static(path.join(__dirname, 'src', 'views')))

app.set('view engine', '.ejs')

app.set('views', path.join(__dirname, 'src', 'views'))

app.use(cookieParser())

app.use('/user', userRouter)

app.use('/call', callRouter)

io.on('connection', (socket: Socket) => {
	socket.emit('message', 'Welcome to chat message')
	socket.on('message', data => {
		console.log(data)
	})
	socket.broadcast.emit('message', 'new user joined')
})

//auth
// io.use(async (socket, next) => {
// 	const token = socket.handshake.auth.token
// 	try {
// 		const payload: any = ({} = tokenService.validateToken(token))
// 		if (payload.username) {
// 			if () {

// 			}
// 		} else {
// 			socket.user = await User.findById(payload.id)
// 		}
// 		next()
// 	} catch (err) {
// 		next(new Error('Authentication error'))
// 	}
// })

// io start
// io.on('connection', (socket: Socket) => {
// 	const user = (socket as any).user
// 	console.log(`User connected: ${user.id}, role: ${user.role}`)

// 	if (user.role === 'user') {
// Foydalanuvchini o'z xonasiga qo'shish
// 		socket.join(user.id)
// 		console.log(`User ${user.id} joined room ${user.id}`)
// 	}

// 	socket.on('admin-join-room', async (roomId: string) => {
// 		if (user.role !== 'admin') return

// 		const room = await Room.findOne({ userId: roomId })
// 		if (!room) return socket.emit('error', 'Room not found')

// 		if (room.status === 'busy')
// 			return socket.emit('error', 'Room is already occupied')

// 		// Xona statusini 'busy' ga o'zgartirish
// 		room.status = 'busy'
// 		await room.save()

// 		socket.join(roomId)
// 		console.log(`Admin ${user.id} joined room ${roomId}`)

// 		// Foydalanuvchiga admin qo'shilgani haqida xabar yuborish
// 		io.to(roomId).emit('admin-joined', { adminId: user.id })
// 	})

// 	socket.on(
// 		'send-message',
// 		async (data: { roomId: string; message: string }) => {
// 			const senderRole = user.role
// 			const { roomId, message } = data

// 			const room = await Room.findOne({ userId: roomId })
// 			if (!room) return socket.emit('error', 'Room not found')

// 			const newMessage = new Message({
// 				roomId: room._id,
// 				sender: senderRole,
// 				message,
// 			})
// 			await newMessage.save()

// 			io.to(roomId).emit('new-message', {
// 				sender: senderRole,
// 				message,
// 				timestamp: newMessage.createdAt,
// 			})
// 		}
// 	)

// 	socket.on('disconnect', () => {
// 		console.log(`User disconnected: ${user.id}`)
// 	})
// })

app.use(errorMiddleware)

app.use(urlencoded({ extended: true }))

const bootstrap = async () => {
	server.listen(process.env.PORT, () => {
		console.log('Server listened to 3000')
	})

	await mongoose.connect(process.env.DB_URL as string).then(() => {
		console.log('DB connection')
	})
}

bootstrap()
