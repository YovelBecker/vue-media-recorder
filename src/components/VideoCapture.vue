<template>
  <section v-if="isValid">
    <section class="video-cap-container">
      <div v-show="!isUploading" class="stream-container">
        <video ref="videoRec" class="camera" muted loop controls autoplay />
        <template v-if="!isFinished">
          <button v-if="!isRecording" @click="record" class="btn flex-center">{{recordBtnContent}}</button>
          <button v-else @click="stop" class="btn">
            <span style="font-size:3em;">{{stopBtnContent}}</span>
          </button>
        </template>
      </div>
      <Loader v-show="isUploading" />
      <div class="controls" v-if="isFinished && !isUploading && uploadUrl">
        <button type="button" class="btn" @click.prevent="resetVideo">{{cancelBtnContent}}</button>
        <button type="button" class="btn" @click.prevent="done">{{doneBtnContent}}</button>
      </div>
      <h1 class="error-video">{{errText}}</h1>
    </section>
  </section>
</template>

<script>
import Loader from './Loader.vue'
export default {
  name: "VideoCapture",
  props: {
    uploadUrl: {
      default: null
    },
    recordBtnContent: {
      default: 'Record'
    },
    stopBtnContent: {
      default: '◼'
    },
    cancelBtnContent: {
      default: 'Cancel'
    },
    doneBtnContent: {
      default: 'OK'
    }
  },
  components: {
    Loader
  },
  data() {
    return {
      errText: null,
      isValid: true,
      isUploading: false,
      isRecording: false, // recording mode identifier
      isFinished: false, // finished recording - action buttons indicator
      recorder: null, // component wide MediaRecorder
      connection: null, // component wide WebSocket
      videoUrl: null // link to video - assigned when done writing video file
    };
  },
  created() {
    if (!this.uploadUrl) this.errText = 'There is no upload url available'
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
      this.isLoading = true;
      this.$refs.videoRec.muted = true;
      navigator.mediaDevices
        .getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: true
        })
        .then(this.gotStream)
        .catch(() => (this.isValid = false));
    },
    // start recoording
    record() {
      if (!this.uploadUrl) return;
      this.recorder.start();
      this.isRecording = true;
    },
    // stop recording
    stop() {
      this.recorder.stop()
      this.isRecording = false;
      this.isFinished = true;
      this.connection.send("DONE")
    },
    // reset video diaply and emit video file url
    done() {
      this.resetVideo();
      this.$emit("input", this.videoUrl);
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
      this.isUploading = true;
      let reader = new FileReader();
      reader.readAsArrayBuffer(event.data);
      reader.onloadend = () => {
        this.connection.send(reader.result);
      };
    },
    // initialize WebSocket
    getWebSocket() {
      const websocketEndpoint = "wss://mister-recorder.herokuapp.com";
      // const websocketEndpoint = "ws://localhost:3000";
      this.connection = new WebSocket(websocketEndpoint);
      // console.log('connection', this.connection)
      this.connection.binaryType = "arraybuffer";
      this.connection.onmessage = message => {
        // console.log('data available')
        this.updateVideoFile(message.data);
        this.$refs.videoRec.muted = false;
      };
    },
    // update video when file written
    updateVideoFile(fileName) {
      this.videoUrl = this.uploadUrl + fileName + ".webm";
      // console.log(this.videoUrl)
      this.toggleVideo();
      this.$refs.videoRec.srcObject = null;
      this.$refs.videoRec.src = this.videoUrl;
      this.isUploading = false;
    },
    // toggle video display
    toggleVideo() {
      this.$refs.videoRec.loop = !this.$refs.videoRec.loop;
      this.$refs.videoRec.controls = !this.$refs.videoRec.controls;
    }
  }
};
</script>

