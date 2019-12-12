<template>
  <section class="clock-container">{{currTime}}</section>
</template>

<script>
export default {
  data() {
    return {
      time: new Date()
    };
  },
  computed: {
    hours() {
      return this.time.getHours();
    },
    minutes() {
      return this.time.getMinutes();
    },
    seconds() {
      return this.time.getSeconds();
    },
    currTime() {
      let timeOfDay = this.hours < 12 ? "AM" : "PM";
      let currMin = (this.minutes < 10 ? "0" : "") + this.minutes;
      let currSec = (this.seconds < 10 ? "0" : "") + this.seconds;
      return this.hours + ":" + currMin + ":" + currSec + " " + timeOfDay;
    }
  },
  created() {
    setInterval(() => (this.time = new Date()), 1000);
  }
};
</script>

<style lang="scss" scoped>
.clock-container{
    font-family: "Clock";
    font-size:40px;
    font-weight:700;
    color:red;
    background-color: rgb(65,65,65);
    padding:10px;
    border-radius:5px;
    position: absolute;
    left:20px;
}
</style>