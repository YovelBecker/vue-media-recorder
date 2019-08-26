<template>
  <section :style="styling" v-if="isValid" class="photo-capture">
    <video v-show="showVideo" ref="player" class="camera" autoplay playsinline></video>
    <canvas v-show="!showVideo" class="preview" ref="canvas"></canvas>
    <div v-if="isSingle" class="center photo-capture-actions">
      <button type="button" class="btn" @click.prevent="capture" v-if="showVideo">
        <!-- <i class="fas fa-camera"></i> -->
        <h2>Capture</h2>
      </button>
      <div v-else>
        <button type="button" class="btn" @click.prevent="cancel">
          <!-- <i class="fas fa-undo-alt"></i> -->
          <h2>Cancel</h2>
        </button>
        <button type="button" class="btn" @click.prevent="done">
          <!-- <i class="fas fa-thumbs-up"></i> -->
          <h2>OK</h2>
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
  name: "PhotoCapture",
  props: {
    isSingle: {
      type: Boolean,
      default: false
    },
    styling: {
      type: Object,
      isRequired: false
    }
  },
  data() {
    return {
      showVideo: true,
      picture: null,
      isValid: true
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
        .catch(() => {
          this.isValid = false;
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
  padding: 10px;
  margin: 10px;
  width: 300px;
  // height: 300px;
  // background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  .camera,
  .preview {
    margin: 10px;
    width: 100%;
    object-fit: fill;
  }
  .camera {
    transform: scaleX(-1);
    filter: FlipH;
  }
  .btn {
  margin-top: 10px;
  background-color: #34495e;
  color: #049161;
  margin: 0 10px;
  min-width: 65px;
  height: 65px;
  border: none;
  border-radius: 50%;
}

}
</style>
