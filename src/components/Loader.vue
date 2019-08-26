<template>
    <section class="loader">
    </section>
</template>

<script>
export default {
  name:'Loader'
}
</script>

<style>
.loader {
    margin:0 auto;
  border: 16px solid #34495E; /* Light grey */
  border-top: 16px solid #41B883; /* Blue */
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>
