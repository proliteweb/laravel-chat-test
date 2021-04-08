import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const ChatUploadFiles = {
    state: () => ({
        hasFiles: false
    }),
    mutations: {
        setHasFiles(state, flag) {
            state.hasFiles = flag
        }
    },
    actions: {},
    getters: {}
}

export default new Vuex.Store({
    modules: {
        ChatUploadFiles
    }
});