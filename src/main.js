import "babel-polyfill";
// import "@fortawesome/fontawesome-free/css/all.css";
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import Vue from "vue";
import "./echarts";
const App = () => import("./App.vue");
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import axios from "axios";
import VueAxios from "vue-axios";
import VueRouter from "vue-router";
import Vuex from "vuex";
import data from "./data";
import "./components";
import EmojiPicker from "vue-emoji-picker";
Vue.config.productionTip = false;

// 使用vue-cookies
import VueCookies from "vue-cookies";

import vuetify from "./plugins/vuetify";
Vue.use(VueCookies);

import Meta from "vue-meta";
Vue.use(Meta);

router.afterEach(function(to) {
  let baseTitle = " - BiliOB观测者 - B站历史数据统计分析站点";
  if (to.name == undefined) {
    to.name = "404";
  }
  window.document.title = to.name + baseTitle;
  function saveToLocal(key) {
    let count = window.localStorage.getItem(key);
    if (count == undefined) {
      count = 0;
    }
    window.localStorage.setItem(key, Number(count) + 1);
  }
  function addVideo(aid) {
    let key = `aid:${aid}`;
    saveToLocal(key);
  }
  function addAuthor(mid) {
    let key = `mid:${mid}`;
    saveToLocal(key);
  }
  var videoPatt = /\/author\/[0-9]*\/video\/[0-9]*/;
  var authorPatt = /\/author\/[0-9]*/;
  if (to.path.match(videoPatt)) {
    let list = to.path.split("/");
    addVideo(list[4]);
    addAuthor(list[2]);
  } else if (to.path.match(authorPatt)) {
    let list = to.path.split("/");
    addAuthor(list[2]);
  }
});
Vue.use(EmojiPicker);
Vue.use(VueRouter);

Vue.prototype.$baseKeywords =
  "B站,b站数据统计,b站数据分析,哔哩哔哩up主,up主排行,数据,观测者,视频,见齐,biliob,bilibili,UP主,粉丝数,粉丝数排行榜,数据可视化,哔哩哔哩,哔哩哔哩观测者,哔哩哔哩ob,bilibiliob";
// 使用axios
axios.defaults.withCredentials = true;

Vue.prototype.$alert = function(res) {
  if (res == undefined) return;
  let msg = res.data.msg;
  if (msg != undefined) {
    data.alert.message = res.data.msg;
    if (res.data.msg.indexOf("成功") != -1) {
      data.alert.type = "success";
    } else if (res.status < 300) {
      data.alert.type = "info";
    } else {
      data.alert.type = "error";
    }
    data.alert.display = true;
  }
};

import { format } from "date-fns";
Vue.prototype.$timeFormat = format;

Vue.prototype.$db = data;
Vue.prototype.$dateParse = require("date-fns/parse");
Vue.dat;
Vue.prototype.$numberFormat = function(num) {
  if (num == undefined) {
    return "0";
  }
  let postfix = "";
  if (num > 100000000) {
    postfix = "亿";
    num /= 100000000;
  } else if (num > 10000) {
    postfix = "万";
    num /= 10000;
  } else {
    return num;
  }
  num = num.toFixed(2);
  let [int, dec] = num.split(".");
  let inter = "";
  while (int != "") {
    inter = int.slice(-3) + "," + inter;
    int = int.slice(0, -3);
  }
  return `${inter.slice(0, -1)}.${dec}${postfix}`;
};

axios.interceptors.response.use(
  function(response) {
    // let path = router.app.$route.path;
    // if (response.config.method != "get") {
    Vue.prototype.$alert(response);
    // }
    return response;
  },
  function(error) {
    Vue.prototype.$alert(error.response);
    return Promise.reject(error);
  }
);

// 环境的切换
if (process.env.NODE_ENV == "development") {
  axios.defaults.baseURL = "//localhost:8081/api";
} else {
  axios.defaults.baseURL = "https://www.biliob.com/api";
}
axios.defaults.headers = {
  "Content-Type": "application/json"
};
Vue.use(VueAxios, axios);
Vue.use(Vuex);
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");

// refresh index.html
caches.open("biliob-precache-https://www.biliob.com/").then(c => {
  c.keys().then(k => {
    k.forEach(e => {
      if (e.url === "https://www.biliob.com/index.html") {
        c.delete(e).then(() => {
          console.log("index.html缓存清除成功");
        });
      }
    });
  });
});

function text() {
  /*
%c 
|                                       ________   ___   ___        ___   ________   ________
| License: MIT License (MIT License)   |\   __  \ |\  \ |\  \      |\  \ |\   __  \ |\   __  \
| Author: Jannchie                     \ \  \|\ /_\ \  \\ \  \     \ \  \\ \  \|\  \\ \  \|\ /_
| Maintainer: Jannchie                  \ \   __  \\ \  \\ \  \     \ \  \\ \  \\\  \\ \   __  \
|                                        \ \  \|\  \\ \  \\ \  \____ \ \  \\ \  \\\  \\ \  \|\  \
| Made with love for Bilibili             \ \_______\\ \__\\ \_______\\ \__\\ \_______\\ \_______\
| I hope this website can help you         \|_______| \|__| \|_______| \|__| \|_______| \|_______|
|                                                                                   
   */
}

function getMultiLine(f) {
  var lines = f.toString();
  return lines.substring(lines.indexOf("/*") + 3, lines.lastIndexOf("*/"));
}
console.log(getMultiLine(text), "color:#337ab7;");
window.$db = data;
