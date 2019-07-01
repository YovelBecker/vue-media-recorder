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
      isRecording: false, // recording mode identifier
      isFinished: false, // finished recording - action buttons indicator
      recorder: null, // component wide MediaRecorder
      connection: null, // component wide WebSocket
      videoUrl: null // link to video - assigned when done writing video file
    };
  },
  created() {
    this.getWebSocket(); // initialize connection to WebSocket
  },
  mounted() {
    this.resetVideo();
  },
  methods: {
    // reset video display with media device media stream
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
    // start recoording
    record() {
      this.recorder.start();
      this.isRecording = true;
    },
    // stop recording
    stop() {
      this.recorder.stop();
      this.isRecording = false;
      this.isFinished = true;
      this.connection.send("DONE");
    },
    // reset video diaply and emit video file url
    done() {
      this.resetVideo();
      this.$emit("done", this.videoUrl);
    },
    // initialize MediaRecorder and video element source
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
    // handle sending data for writing using the given WebSocket
    videoDataHandler(event) {
      let reader = new FileReader();
      reader.readAsArrayBuffer(event.data);
      reader.onloadend = () => {
        this.connection.send(reader.result);
      };
    },
    // initialize WebSocket
    getWebSocket() {
      var websocketEndpoint = "ws://localhost:3000";
      // var websocketEndpoint = "wss://puki.ninja";
      this.connection = new WebSocket(websocketEndpoint);
      this.connection.binaryType = "arraybuffer";
      this.connection.onmessage = message => {
        this.updateVideoFile(message.data);
      };
    },
    // update video when file written
    updateVideoFile(fileName) {
      this.videoUrl =
        "http://localhost:3000/uploads/" + fileName + ".webm";
      // this.videoUrl = "https://puki.ninja/uploads/" + fileName + ".webm";
      this.toggleVideo();
      this.$refs.videoRec.srcObject = null;
      this.$refs.videoRec.src = this.videoUrl;
    },
    // toggle video display
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
