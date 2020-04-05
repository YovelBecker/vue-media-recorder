<template>
  <section class="single-video">
    <PhotoCapture :styling="styling" @input="handleDone" />
    <div class="galleries-container">
      <div class="img-list" v-if="imgs.length">
        <span>
          <h1>Look At Yourself!</h1>
          <button @click="clear" class="btn">CLEAR</button>
        </span>
        <ImgList :imgs="imgs" />
      </div>
      <ImgGallery v-if="imgs.length" :imgs="imgs" />
    </div>
  </section>
</template>

<script>
import PhotoCapture from "../components/PhotoCapture.vue";
import ImgList from "../components/ImgList";
import ImgGallery from "../components/ImgGallery";
export default {
  components: {
    PhotoCapture,
    ImgList,
    ImgGallery
  },
  data() {
    return {
      imgs: [],
      styling:{
        'max-width':'60%'
      }
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
      localStorage.clear();
      this.imgs = [];
    }
  }
};
</script>

<style lang="scss" scoped>
.photo-capture {
  max-width: 60% !important;
}
.single-video {
  display: flex;
  flex-direction: column;
  align-items: center;
  // flex-wrap: wrap;
  height:100vh;
  .galleries-container {
    display: flex;
    // flex-direction:column;
    justify-content: center;
    & > * {
      margin: 0 10px;
      box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.5);
      border:1px solid rgba(65,65,65,0.3);
      height:480px;
    }
    .img-list {
      padding:10px;
      span {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        font-size: 1.5rem;
      }
    }
  }
}
</style>
