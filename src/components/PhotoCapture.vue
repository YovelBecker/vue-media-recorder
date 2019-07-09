<template>
  <section class="photo-capture">
    <video v-show="showVideo" ref="player" class="camera" autoplay playsinline></video>
    <canvas v-show="!showVideo" class="preview" ref="canvas"></canvas>
    <div v-if="isSingle" class="center photo-capture-actions">
      <button type="button" class="btn-capture" @click.prevent="capture" v-if="showVideo">
        <i class="fas fa-camera"></i>
      </button>
      <div v-else>
        <button type="button" class="btn-capture" @click.prevent="cancel">
          <i class="fas fa-undo-alt"></i>
        </button>
        <button type="button" class="btn-capture" @click.prevent="done">
          <i class="fas fa-thumbs-up"></i>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
const EVENTS = {
  ON_DONE: "done",
  ON_CLEAR: "clear"
};

export default {
  props:{
    isSingle: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      showVideo: true,
      picture: null
    };
  },
  mounted() {
    this.videoPlayer = this.$refs.player;
    this.canvasElement = this.$refs.canvas;
    this.streamUserMediaVideo();
  },
  methods: {
    streamUserMediaVideo() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        return;
      }
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(stream => (this.videoPlayer.srcObject = stream))
        .catch(err => {
          console.error("could not open the camera", err);
        });
    },
    capture() {
      this.showVideo = false;
      this.canvasElement.width = this.videoPlayer.videoWidth;
      this.canvasElement.height = this.videoPlayer.videoHeight;

      var context = this.canvasElement.getContext("2d");
      context.translate(this.canvasElement.width, 0);
      context.scale(-1, 1);

      context.drawImage(this.$refs.player, 0, 0);

      this.stopVideoStream();
      this.picture = this.$refs.canvas.toDataURL();
    },
    done() {
      this.$emit(EVENTS.ON_DONE, this.picture);
      this.showVideo = true;
      this.streamUserMediaVideo();
    },
    cancel() {
      this.showVideo = true;
      this.streamUserMediaVideo();
      this.$emit(EVENTS.ON_CLEAR);
    },
    stopVideoStream() {
      if (!(this.$refs.player && this.$refs.player.srcObject)) return;
      this.$refs.player.srcObject.getVideoTracks().forEach(track => {
        track.stop();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.photo-capture {
  border:1px solid rgb(61, 61, 61);
  width: 260px;
  .camera,
  .preview {
    width: 100%;
    object-fit: fill;
  }
  .camera {
    transform: scaleX(-1);
    filter: FlipH;
  }
}
</style>
