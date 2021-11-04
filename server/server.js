const express = require('express')
const app = express()
const cors = require('cors')
const socket = require('socket.io')

app.use(cors())
app.use(express.json(), express.urlencoded({extended:true}))

const server = app.listen(8000, ()=>console.log("Listening on port 8000"))

const io = socket(server, {
    cors: {
        origin: 'http://10.191.10.61:3000',
        methods: ['GET', 'POST'],
        allowedHeaders: ['*'],
        credentials: true
    }
})
let interval
io.on("connection", socket => {
    console.log('socket id: ' + socket.id)
    socket.send("Starting chat room")

    //let itv = setInterval(() => socket.send("message", Date.now()), 1000);
    // if (interval) {
    //     clearInterval(interval);
    //   }
      interval = setInterval(() => getApiAndEmit(socket), 1000);
    
    socket.on("event_from_client", data => {

        console.log(data)
        //socket.broadcast.emit("FromAPI", "new chat msg has arrived")

    })

    socket.on("disconnect", () => {
        console.log("Client disconnected")
        clearInterval(interval)
    })
})  
const getApiAndEmit = socket => {
    const response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI", response);
};