<template>
  <section class="video-cap-container">
    <video ref="videoRec" autoplay></video>
    <button type="button" @click="startRecording" class="btn rec">
      <i class="fas fa-video"></i>
    </button>
    <button type="button" @click="stopRecording" class="btn stop">
      <i class="fas fa-video"></i>
    </button>
    <video ref="videoPlay"></video>
  </section>
</template>

<script>
export default {
  data() {
    return {
      videElement: null,
      options: { mimeType: "video/webm;codecs=vp9" },
      mediaRecorder: null,
      recordedBlobs: [],
      mediaSource: null,
      sourceBuffer: null
    };
  },
  mounted() {
    this.mediaSource = new MediaSource();
    this.mediaSource.addEventListener("sourceopen", this.handleSourceOpen, false);
    this.videoElement = this.$refs.videoRec;
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(this.gotStream)
      .catch(this.handleError);
  },
  methods: {
    handleSourceOpen(event) {
      console.log("MediaSource opened");
      this.sourceBuffer = this.mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
      console.log("Source buffer: ", this.sourceBuffer);
    },
    handleRecord() {
      if (recordButton.textContent === "Start Recording") {
        startRecording();
      } else {
        stopRecording();
        recordButton.textContent = "Start Recording";
        playButton.disabled = false;
        downloadButton.disabled = false;
      }
    },
    startRecording() {
      // this.handleErrors();
      try {
        this.mediaRecorder = new MediaRecorder(window.stream, this.options);
      } catch (e) {
        console.error("Exception while creating MediaRecorder:", e);
        return;
      }
      console.log("Created this.mediaRecorder", this.mediaRecorder);
      this.mediaRecorder.onstop = event => {
        console.log("Recorder stopped: ", event);
      };
      this.mediaRecorder.ondataavailable = this.handleDataAvailable;
      this.mediaRecorder.start(10); // collect 10ms of data
    },
    handleErrors() {
      if (!this.mediaRecorder.isTypeSupported(this.options.mimeType)) {
        console.error(`${options.mimeType} is not Supported`);
        this.options = { mimeType: "video/webm;codecs=vp8" };
        if (!this.mediaRecorder.isTypeSupported(this.options.mimeType)) {
          console.error(`${this.options.mimeType} is not Supported`);
          errorMsgElement.innerHTML = `${
            this.options.mimeType
          } is not Supported`;
          this.options = { mimeType: "video/webm" };
          if (!this.mediaRecorder.isTypeSupported(this.options.mimeType)) {
            errorMsgElement.innerHTML = `${
              this.options.mimeType
            } is not Supported`;
            this.options = { mimeType: "" };
          }
        }
      }
    },
    handleSuccess(stream) {
      window.stream = stream;

      const gumVideo = document.querySelector("video#gum");
      gumVideo.srcObject = stream;
    },
    stopRecording() {
      this.mediaRecorder.stop();
      console.log("Recorded Blobs: ", this.recordedBlobs);
      this.$refs.videoPlay.srcObject = this.sourceBuffer;
    },
    handleDataAvailable(event) {
      if (event.data && event.data.size > 0) {
        this.recordedBlobs.push(event.data);
      }
    },
    gotStream(stream) {
      window.stream = stream;
      this.videoElement.srcObject = stream;
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
  .btn {
    margin: 10px auto;
    padding: 5px 8px;
    font-size: 30px;
    border-radius: 50%;
  }
  .rec {
    color: #fff;
    background-color: rgb(65, 65, 65);
  }
  .stop {
    color: rgb(65, 65, 65);
    background-color: #fff;
  }
}
</style>
