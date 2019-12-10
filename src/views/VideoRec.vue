<template>
  <section class="video-rec-container">
    <video-capture :uploadUrl="uploadUrl" v-model="videoUrl" />
    <div v-if="videoUrl" class="video-url-containe">
      <h1>Your Video URL</h1>
      <a :href="videoUrl">
        <h1>Your Video Is Ready!</h1>
      </a>
    </div>
  </section>
</template>

<script>
import VideoCapture from "../components/VideoCapture";

export default {
  components: {
    VideoCapture
  },
  data() {
    return {
      videoUrl: null,
      // uploadUrl: "http://localhost:3000/uploads/"
      uploadUrl: "https://mister-recorder.herokuapp.com/uploads/"
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  color: #049161;
}
</style>
