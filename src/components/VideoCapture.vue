<template>
  <section class="video-cap-container">
    <div class="stream-container">
      <video ref="videoRec" class="camera" loop controls autoplay></video>
      <button v-if="!isRecording" @click="record" class="btn">
        <i class="fas fa-circle"></i>
      </button>
      <button v-else @click="stop" class="btn">
        <i class="far fa-circle"></i>
      </button>
    </div>
    <div v-if="isFinished">
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
export default {
  data() {
    return {
      videoElement: null,
      canvasElement: null,
      isRecording: false,
      recorder: null,
      video: null,
      isFinished: false,
      connection: null,
      fileName: null,
      videoUrl: null,
    };
  },
  created() {
    this.getWebSocket();
  },
  mounted() {
    this.resetVideo();
  },
  methods: {
    resetVideo() {
      this.isFinished = false;
      this.isRecording = false;
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
      this.recorder.stop();
      this.isRecording = false;
      // setTimeout(() => {
      this.isFinished = true;
      this.connection.send("DONE");
      //   this.updateVideoFile();
      // }, 1000);
    },
    onDataAvailable(ev) {
      this.video = URL.createObjectURL(ev.data);
      this.$refs.videoPlay.src = this.video;
    },
    gotStream(mediaStream) {
      this.recorder = new MediaRecorder(mediaStream, {
        mimeType: "video/webm",
        audioBitsPerSecond: 128000
      });
      this.recorder.ondataavailable = this.videoDataHandler;
      this.$refs.videoRec.src = null;
      this.$refs.videoRec.srcObject = mediaStream;
      this.toggleVideo();
    },
    videoDataHandler(event) {
      let reader = new FileReader();
      reader.readAsArrayBuffer(event.data);
      reader.onloadend = () => {
        this.connection.send(reader.result);
      };
    },
    getWebSocket() {
      var websocketEndpoint = "ws://localhost:3000";
      // var websocketEndpoint = "wss://puki.ninja";
      this.connection = new WebSocket(websocketEndpoint);
      this.connection.binaryType = "arraybuffer";
      this.connection.onmessage = message => {
        this.fileName = message.data;
        this.updateVideoFile();
      };
    },
    updateVideoFile() {
      this.videoUrl = "http://localhost:3000/uploads/" + this.fileName + ".webm";
      // this.videoUrl = "https://puki.ninja/uploads/" + this.fileName + ".webm";
      this.toggleVideo();
      this.$refs.videoRec.srcObject = null;
      this.$refs.videoRec.src = this.videoUrl;
    },
    toggleVideo() {
      this.$refs.videoRec.loop = !this.$refs.videoRec.loop;
      this.$refs.videoRec.controls = !this.$refs.videoRec.controls;
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
