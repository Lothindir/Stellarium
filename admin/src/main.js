import Vue from 'vue';
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue';
import VueCompositionAPI from '@vue/composition-api';

import VueAxios from 'vue-axios';
import router from './router';
import store from './store';
import App from './App.vue';
import axios from '@/plugins/axios';

// Global Components
import './global-components';

// 3rd party plugins
import '@/libs/portal-vue';
import '@/libs/toastification';

// BSV Plugin Registration
Vue.use(ToastPlugin);
Vue.use(ModalPlugin);
Vue.use(VueAxios, axios);

// Composition API
Vue.use(VueCompositionAPI);

// import core styles
require('@core/scss/core.scss');

// import assets styles
require('@/assets/scss/style.scss');

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
