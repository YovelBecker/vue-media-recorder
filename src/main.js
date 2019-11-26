import Vue from 'vue';
import './assets/scss/main.scss';
import App from './App.vue';
import router from './router';
import './components';

Vue.config.productionTip = false;

new Vue({
  router,
  components: { App },
  render: h => h(App)
}).$mount('#app');
