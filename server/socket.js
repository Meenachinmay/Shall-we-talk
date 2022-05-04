const EVENTS = {
    connection: "connection",
    CLIENT: {
        CREATE_ROOM: 'CREATE_ROOM',
        JOIN_ROOM: 'JOIN_ROOM',
    },
    SERVER: {
        ROOM_CREATED: 'ROOM_CREATED'
    }
}

function socket({ io }) {
    console.log('Sockets enabled')

    io.on(EVENTS.connection, (socket) => {
        console.log(socket.id)

        // socket.on(EVENTS.CLIENT.CREATE_ROOM, (data) => {
        //     console.log(`${data.name} has joined ${data.room}`)

        //     socket.emit(EVENTS.SERVER.ROOM_CREATED, 
        //         {message: `${data.name} has created a room with name ${data.room} at server`})
        // })
    })
}

module.exports = socket