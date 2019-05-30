<template>
  <section class="single-video">
    <PhotoCapture :isSingle="true" @done="handleDone"/>
    <div v-if="imgs.length" class="thumbnails">
      <img v-for="(imgSrc, idx) in imgs" :key="idx" :src="imgSrc" alt="">
    </div>
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
  data() {
    return {
      imgs:[]
    }
  },
  created(){
    this.imgs = JSON.parse(localStorage.getItem('thumbnails'))
    if(!this.imgs) this.imgs = []
  },
  methods: {
    handleDone(imgBase64) {
      this.imgs.push(imgBase64)
      localStorage.setItem('thumbnails',JSON.stringify(this.imgs))
    },
  }
};
</script>

<style lang="scss" scoped>
.single-video {
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  .thumbnails{
    width:530px;
    display:flex;
    flex-wrap: wrap;
    justify-content: space-between;
    img{
      width:260px;
      height: 200px;
    }
  }
}
</style>
