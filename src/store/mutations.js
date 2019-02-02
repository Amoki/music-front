export default {
  setCurrentRoom(state, currentRoom) {
    state.currentRoom = currentRoom;
  },
  setRoomList(state, roomList) {
    state.roomList = roomList;
  },
  setUpSocket(state) {
    if (state.socket) {
      state.socket.onclose = () => { };
      state.socket.close();
    }
    function connect() {
      let url = `${process.env.VUE_APP_WEBSOCKET_URL}/ws/room/${state.currentRoom.id}/`
      let socket = new WebSocket(url);

      socket.onmessage = e => {
        console.log(JSON.parse(e.data).message);
        state.currentRoom = JSON.parse(e.data).message;
      };

      socket.onclose = e => {
        console.error("Chat socket closed unexpectedly", e);
        console.log("reconnecting");
        setTimeout(connect, 1000);
      };
      state.socket = socket;
    }
    connect();
  }
};
