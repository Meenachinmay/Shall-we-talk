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

module.exports = EVENTS