<template>
  <div>
    <remote></remote>
    <search></search>
    <h1>{{ currentRoom.name }}</h1>
    <h3 v-if="listeners > 0">Vous êtes {{listeners}} à écouter :)</h3>
    <h2 v-if="!videoId">No music</h2>
    <youtube :player-vars="playerVars" :video-id="videoId" ref="youtube"></youtube>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store";
import Search from "@/components/Search";
import Remote from "@/components/Remote";
export default {
  name: "roomDetail",
  components: {
    Remote,
    Search
  },
  data() {
    return {
      playerVars: {
        autoplay: 1,
        iv_load_policy: "3",
        modestbranding: "1",
        rel: "0"
      }
    };
  },
  created() {},
  methods: {},
  computed: {
    ...mapState({
      currentRoom: state => state.currentRoom,
      listeners: state => state.currentRoom.people_count
    }),
    player() {
      return this.$refs.youtube.player;
    },
    videoId() {
      let id =
        this.currentRoom.music_queue[0] &&
        this.currentRoom.music_queue[0].music.music_id;
      return id;
    }
  },
  async beforeRouteEnter(to, from, next) {
    await store.dispatch("getRoomDetail", to.params.id);
    store.commit("setUpSocket");
    next();
  }
};
</script>
