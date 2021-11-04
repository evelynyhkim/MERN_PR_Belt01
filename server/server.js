const express = require('express')
const app = express()
const cors = require('cors')
const socket = require('socket.io')

app.use(cors(), express.json(), express.urlencoded({extended:true}))

const server = app.listen(8000, ()=>console.log("Listening on port 8000"))

const io = socket(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true,
    }
})

io.on("connection", socket => {
    console.log('socket id: ' + socket.id)

    socket.on("event_from_client", data => 
        socket.broadcast.emit("event_to_all_other_clients", data)
    )
})