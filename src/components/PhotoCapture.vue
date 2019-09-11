<template>
  <section :style="styling" v-if="isValid" class="photo-capture">
    <video v-show="showVideo" ref="player" class="camera" autoplay playsinline></video>
    <canvas v-show="!showVideo" class="preview" ref="canvas"></canvas>
    <div class="center photo-capture-actions">
      <button type="button" class="btn" @click.prevent="capture" v-if="showVideo">
        <i class="fas fa-camera" />
      </button>
      <div v-else>
        <button type="button" class="btn" @click.prevent="cancel">
          <i class="fas fa-undo-alt" />
        </button>
        <button type="button" class="btn" @click.prevent="done">
          <i class="fas fa-check" />
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "PhotoCapture",
  props: {
    styling: {
      type: Object,
      isRequired: false
    },
    value: {
      default: null
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
      this.$emit('input', this.picture );
      this.showVideo = true;
      this.streamUserMediaVideo();
    },
    cancel() {
      this.showVideo = true;
      this.streamUserMediaVideo();
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


