import VueSelectLanguage from "./App.vue";

const vLanguage = {
    install(Vue, options) {
        Vue.component(VueSelectLanguage.name, VueSelectLanguage);
    }
};

export default vLanguage;
