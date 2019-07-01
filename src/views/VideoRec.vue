<template>
  <section class="video-rec-container">
      <video-capture @done="test"/>
  </section>
</template>

<script>
import VideoCapture from "../components/VideoCapture";

export default {
  components: {
    VideoCapture
  },
  methods: {
    test(videoUrl){
      console.log(videoUrl)
    }
  },
};
</script>

<style>
</style>
