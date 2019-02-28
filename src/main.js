import VueSelectLanguage from "./App.vue";

// import Vue from "vue";
//
// Vue.config.productionTip = false;
//
// new Vue({
//     render: h => h(VueSelectLanguage)
// }).$mount("#app");

const vLanguage = {
    install(Vue, options) {
        Vue.component(VueSelectLanguage.name, VueSelectLanguage);
    }
};

export default vLanguage;
