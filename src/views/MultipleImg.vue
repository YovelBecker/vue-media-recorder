<template>
  <section class="home">
    <PhotoCapture :hideButtons="true" v-for="n in 10" :key="n" />
  </section>
</template>

<script>
import PhotoCapture from '../components/PhotoCapture.vue';

export default {
  name: "home",
  components: {
    PhotoCapture
  }
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
