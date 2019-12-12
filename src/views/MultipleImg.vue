<template>
  <section class="home">
    <div class="controls">
      <Clock />
      <vue-slider
        :dotSize="[24,24]"
        :min="5"
        :max="70"
        :height="10"
        :width="500"
        v-model="streamCount"
      />
    </div>

    <div class="streams-container">
      <PhotoCapture :hideBtns="true" :hideButtons="true" v-for="n in streamCount" :key="n" />
    </div>
  </section>
</template>

<script>
import PhotoCapture from "../components/PhotoCapture.vue";
import Clock from "../components/Clock";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";

export default {
  data() {
    return {
      streamCount: 20
    };
  },
  components: {
    PhotoCapture,
    VueSlider,
    Clock
  }
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.controls{
  display:flex;
  align-items:center;
  margin:20px;
  *{
    margin:0 24px;
  }
}
.streams-container {
  margin: 0 auto;
  max-width: 100vw;
  display: flex;
  flex-wrap: wrap;
}
</style>
