<template>
  <section class="video-cap-container">
    <div v-if="!isFinished" class="stream-container">
      <video ref="videoRec" class="camera" autoplay></video>
      <button v-if="!isRecording" @click="record" class="btn">
        <i class="fas fa-circle"></i>
      </button>
      <button v-else @click="stop" class="btn">
        <i class="far fa-circle"></i>
      </button>
    </div>
    <div v-if="isFinished">
      <video ref="videoPlay" class="camera" controls loop autoplay></video>
      <button type="button" class="btn-capture" @click.prevent="resetVideo">
        <i class="fas fa-undo-alt"></i>
      </button>
      <button type="button" class="btn-capture" @click.prevent="done">
        <i class="fas fa-thumbs-up"></i>
      </button>
    </div>
  </section>
</template>

<script>
import MediaService from "../services/MediaService";

export default {
  data() {
    return {
      videoElement: null,
      canvasElement: null,
      isRecording: false,
      recorder: null,
      video: null,
      isFinished: false
    };
  },
  mounted() {
    this.resetVideo();
  },
  methods: {
    resetVideo() {
      this.isFinished = false;
      navigator.mediaDevices
        .getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: true
        })
        .then(this.gotStream)
        .catch(this.handleError);
    },
    record() {
      this.recorder.start();
      this.isRecording = true;
    },
    stop() {
      this.isRecording = false;
      this.recorder.stop();
      this.isFinished = true;
    },
    done(){
      this.$emit('done', this.video)
    },
    onDataAvailable(ev) {
      this.video = URL.createObjectURL(ev.data)
      this.$refs.videoPlay.src = this.video;
    },
    gotStream(mediaStream) {
      this.recorder = new MediaRecorder(mediaStream);
      this.recorder.ondataavailable = this.onDataAvailable;
      this.videoElement = this.$refs.videoRec;
      this.videoElement.srcObject = mediaStream;
    },
    handleError(error) {
      console.error("Error: ", error);
    }
  }
};
</script>

<style lang="scss" scoped>
.video-cap-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .stream-container {
    display: flex;
    flex-direction: column;
  }
  .btn {
    margin: 10px auto;
    padding: 5px 8px;
    font-size: 30px;
    border-radius: 50%;
    background-color: #fff;
    color: red;
  }
  .camera,
  .preview {
    object-fit: fill;
  }
  .camera {
    border: 1px solid red;
    width: 500px;
    transform: scaleX(-1);
    filter: FlipH;
  }
}
</style>
