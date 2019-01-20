<template>
  <div>
    <h1>Select a room</h1>
    <select v-model="selectedRoom">
      <option v-for="room in rooms" :value="room" :key="room">{{room }}</option>
    </select>
    <span>Sélectionné : {{ selectedRoom }}</span>
    <ChatRoom :roomName="selectedRoom" v-if="selectedRoom"/>
  </div>
</template>

<script>
import ChatRoom from "@/components/ChatRoom.vue";

export default {
  name: "chat",
  components: {
    ChatRoom
  },
  data() {
    return {
      rooms: ["test", "super room"],
      selectedRoom: null
    };
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
