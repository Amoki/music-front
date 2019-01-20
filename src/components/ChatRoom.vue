<template>
  <div>
    <h1>{{ roomName }}</h1>
    <textarea id="chat-log" cols="100" rows="20" v-model="chatLog"></textarea>
    <br>
    <textarea v-model="message" cols="100" rows="2" placeholder="message..."></textarea>
    <br>
    <button v-on:click="sendMessage">Send</button>
  </div>
</template>

<script>
export default {
  name: "chat",
  data() {
    return {
      message: "",
      chatLog: "",
      chatSocket: null
    };
  },
  props: {
    roomName: String
  },
  watch: {
    roomName: function() {
      this.chatLog = "";
    }
  },
  created() {
    this.chatSocket = new WebSocket(
      process.env.VUE_APP_WEBSOCKET_URL + "/ws/chat/" + this.roomName + "/"
    );

    this.chatSocket.onmessage = e => {
      let data = JSON.parse(e.data);
      let message = data["message"];
      this.chatLog += message + "\n";
    };

    this.chatSocket.onclose = function(e) {
      console.error("Chat socket closed unexpectedly");
    };
  },
  methods: {
    sendMessage: function() {
      this.chatSocket.send(
        JSON.stringify({
          message: this.message
        })
      );
      this.message = "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
