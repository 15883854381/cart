import { createApp } from 'vue'
import App from './App.vue'
import 'vant/lib/index.css';

import vant from 'vant';
import 'amfe-flexible'
import router from './router/index' //引入

import axios from './utils/http'


const app = createApp(App)
app.use(vant);
app.use(router);
app.provide('$axios', axios)

app.mount('#app');