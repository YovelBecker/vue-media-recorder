<template>
  <section class="single-video">
    <PhotoCapture  v-model="imgBase64" />
    <div v-if="imgs.length" class="thumbnails">
      <button @click="clear" class="btn">CLEAR</button>
      <img v-for="(imgSrc, idx) in imgs" :key="idx" :src="imgSrc" alt />
    </div>
  </section>
</template>

<script>
import PhotoCapture from "../components/PhotoCapture.vue";

export default {
  name: "home",
  components: {
    PhotoCapture
  },
  data() {
    return {
      imgs: [],
      imgBase64: null
    };
  },
  created() {
    this.imgs = JSON.parse(localStorage.getItem("thumbnails"));
    if (!this.imgs) this.imgs = [];
  },
  methods: {
    handleDone(imgBase64) {
      this.imgs.push(imgBase64);
      localStorage.setItem("thumbnails", JSON.stringify(this.imgs));
    },
    clear() {
      localStorage.clear()
      this.imgs = []
    }
  },
  watch: {
    imgBase64() {
      this.handleDone(this.imgBase64)
    }
  }
};
</script>

<style lang="scss" scoped>
.single-video {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  background-color: rgb(65, 65, 65);

  .thumbnails {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    @media screen and (min-width: 600px) {
      justify-content: space-around;
    }
    img {
      width: 260px;
      height: 200px;
      margin-bottom: 15px;
    }
  }
}
.green {
  background: yellow;
}
</style>
