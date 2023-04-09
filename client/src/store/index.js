import { createStore } from 'vuex'
import {userModule} from "@/store/userModule";
import {personageModule} from "@/store/personageModule";
import {adminModule} from "@/store/adminModule";

export default createStore({
    state: {
        URL:{
            BASE: `http://localhost:5500`,
            API: `http://localhost:5500`,
            AUTH: `http://localhost:5500/auth`,
        }
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        user: userModule,
        personage: personageModule,
        admin: adminModule
    }
})
