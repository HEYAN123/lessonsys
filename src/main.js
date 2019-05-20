// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import axios from 'axios'
import Cookies from 'js-cookie'
import VueQuillEditor from 'vue-quill-editor'
import './theme/index.css'
import App from './App'
import router from './router'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueQuillEditor);

Vue.prototype.API = "http://139.196.75.14/snow/"
Vue.prototype.axios = axios
Vue.prototype.Cookies = Cookies

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
