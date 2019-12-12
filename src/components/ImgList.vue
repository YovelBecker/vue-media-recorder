<template>
  <section v-if="imgs" class="img-list-container">
    <img v-for="(imgSrc, idx) in imgs" :key="idx" :src="imgSrc" />
  </section>
</template>

<script>
export default {
  props: {
    imgs: {
      type: Array
    }
  }
};
</script>

<style lang="scss" scoped>
.img-list-container {
  width: 600px;
  max-height: 360px;
  overflow-y: scroll;
  img {
    margin: 5px;
    max-width: 25%;
  }
}
.img-list-container::-webkit-scrollbar {
  display: none;
}
</style>