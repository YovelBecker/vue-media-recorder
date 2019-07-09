<template>
  <section class="home">
    <PhotoCapture  v-for="n in 32" :key="n"/>
  </section>
</template>

<script>
// @ is an alias to /src
import PhotoCapture from "@/components/PhotoCapture.vue";

export default {
  name: "home",
  components: {
    PhotoCapture
  },
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
