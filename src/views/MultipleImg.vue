<template>
  <section class="home">
    <PhotoCapture />
    <PhotoCapture />
    <PhotoCapture />
    <PhotoCapture />
    <PhotoCapture />
    <PhotoCapture />
    <PhotoCapture />
    <PhotoCapture />
    <PhotoCapture />
    <PhotoCapture />
    <PhotoCapture />
    <PhotoCapture />
    <PhotoCapture />
    <PhotoCapture />
    <PhotoCapture />
    <PhotoCapture />
    <PhotoCapture />
    <PhotoCapture />
    <PhotoCapture />
    <PhotoCapture />
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
  border: 1px solid red;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
