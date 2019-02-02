<template>
  <div>
    <div class="search">
      <label>Search</label>
      <input type="text" v-model="query" placeholder="Search on YouTube">
      <button v-on:click="search(query)">🔍</button>
    </div>
    <div class="complete-result">
      <div v-for="result in completeResults" :key="result" @click="search(result)">
        <p>{{ result }}</p>
      </div>
    </div>
    <div class="search-result">
      <div v-for="(result, index) in searchResults" :key="index" @click="play(result)">
        <img :title="result.name" :alt="result.name" :src="result.thumbnail">
        <p>{{ result.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { API } from "@/utils/api";
export default {
  name: "remote",
  data() {
    return {
      query: "",
      completeResults: [],
      searchResults: []
    };
  },
  watch: {
    async query(newValue) {
      this.searchResults = [];
      if (newValue === "") {
        this.completeResults = [];
      } else {
        const response = await API.get("/search/complete", {
          params: {
            query: newValue
          }
        });
        this.completeResults = response.data;
      }
    }
  },
  methods: {
    async search(query) {
      const response = await API.get("/search", {
        params: {
          service: "youtube",
          query: query
        }
      });
      console.log(response.data);
      this.completeResults = [];
      this.searchResults = response.data;
    },
    async play(music) {
      console.log(music);
      music.service = "youtube";
      const roomId = this.$store.state.currentRoom.id;
      await API.post(`/rooms/${roomId}/musics`, music);
      this.searchResults = [];
    }
  },
  computed: {}
};
</script>
