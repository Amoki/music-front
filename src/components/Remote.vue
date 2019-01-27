<template>
  <div>
    <button v-on:click="next()">next</button>
    <input type="checkbox" id="shuffle" v-model="shuffle">
    <label for="shuffle">Mode aléatoire</label>
  </div>
</template>

<script>
import { API } from "@/utils/api";
import { mapState } from "vuex";
export default {
  name: "remote",
  data() {
    return {};
  },
  created() {},
  methods: {
    next() {
      API.post(`/rooms/${this.$store.state.currentRoom.id}/queue/next`);
    }
  },
  computed: {
    ...mapState({
      currentRoom: state => state.currentRoom
    }),
    shuffle: {
      get: function() {
        return this.$store.state.currentRoom.shuffle;
      },
      set: function(newValue) {
        API.patch(`/rooms/${this.$store.state.currentRoom.id}`, {
          shuffle: newValue
        });
      }
    }
  }
};
</script>
