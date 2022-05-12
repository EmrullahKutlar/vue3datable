import { createApp } from 'vue'
import App from './App.vue'
import VueGoodTablePlugin from 'vue-good-table-next';

// import the styles
import 'vue-good-table-next/dist/vue-good-table-next.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
axios.defaults.baseURL = 'http://localhost:3000'
const app = createApp(App)
app.mount('#app')
app.use(VueAxios, axios)