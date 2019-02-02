<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <RoomSelector/>
  </div>
</template>

<script>
// @ is an alias to /src
import RoomSelector from "@/components/RoomSelector.vue";

export default {
  name: "home",
  components: {
    RoomSelector
  }
};
</script>
