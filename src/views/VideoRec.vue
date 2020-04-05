<template>
  <section class="video-rec-container">
    <VideoCapture :uploadUrl="uploadUrl" v-model="videoUrl" />
    <div v-if="videoUrl" class="video-url-container">
      <a class="btn" :href="shareUrl">Share Your Video</a>
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
      uploadUrl: "mister-recorder.herokuapp.com"
    };
  },
  computed: {
    shareUrl() {
      return `mailto:example@example.com?subject=Look At My Cool Video&body=Hey! i recorder a video For you!%0D%0A
look at it Here%0D%0A
${this.videoUrl} %0D%0A%0D%0A
I used https://yovelbecker.github.io/vue-media-recorder/ for it.`;
    }
  }
};
</script>

<style lang="scss" scoped>
.video-url-container {
  margin: 0 auto;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  a.btn {
    width: 200px;
    text-align: center;
    display: flex;
    justify-content: center;
  }
}
</style>
