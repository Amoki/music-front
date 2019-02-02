<template>
  <div>
    <h1>Select a room</h1>
    <select v-model="selectedRoom">
      <option v-for="room in rooms" :value="room" :key="room.name">{{ room.name }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "chat",
  components: {},
  data() {
    return {
      selectedRoom: null
    };
  },
  watch: {
    selectedRoom(newValue) {
      this.$router.push({
        name: "room",
        params: { id: newValue.id }
      });
    }
  },
  created() {
    this.$store.dispatch("getRoomList");
  },
  computed: {
    rooms() {
      return this.$store.state.roomList;
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
