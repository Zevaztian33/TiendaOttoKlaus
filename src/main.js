import Vue from 'vue'
import App from './App.vue';
import router from './router/router';
import store from './store/store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import { firebaseConfig } from "./config/firebaseConfig";
import firebase from 'firebase';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit, faPlus, faTimes, faSave, faTrashAlt, faHome, faShoppingCart, faMinus } from '@fortawesome/free-solid-svg-icons';
import { faGithubSquare, faTumblrSquare } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

firebase.initializeApp(firebaseConfig);

library.add(faEdit, faPlus, faGithubSquare, faTumblrSquare, faTimes, faSave, faTrashAlt, faHome, faShoppingCart, faMinus);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
