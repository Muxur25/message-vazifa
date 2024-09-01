const socket = io()

socket.on('message', message => {
	console.log(message)
})

const { username } = Qs.parse(location.search, {
	ignoreQueryPrefix: true, // faqat qiymatini olamiz yani tengdan keyingi
})

socket.emit('join room', username)

socket.on('userchat', data => {
	kirganUserlar(data)
})
