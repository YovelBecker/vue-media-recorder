<template>
  <section class="img-gallery-contain">
      <img :key="imgs[currImgIdx]" :src="imgs[currImgIdx]" />
  </section>
</template>

<script>
export default {
  props: {
    imgs: {
      type: Array
    }
  },
  data() {
    return {
        interval:null,
      currImgIdx: 0
    };
  },
  created() {
    this.interval = setInterval(() => {
      if (this.currImgIdx === this.imgs.length - 1) this.currImgIdx = 0;
      else this.currImgIdx++;
    }, 2000);
  },
  destroyed() {
      clearInterval(this.interval)
  },
};
</script>

<style>

</style>