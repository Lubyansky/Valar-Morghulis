import axios from "axios";

export const userModule = {
    state: () => ({
        body: {},
        isLogin: false
    }),
    mutations: {
        setIsLogin(state, isLogin){
            state.isLogin = isLogin
        },
        setUser(state, user){
            state.body = user
        }
    },
    actions: {
        async SetUser({state, commit}, user){
            commit('setIsLogin', true)
            commit('setUser', user)
        },
        async RemoveUser({state, commit}){
            commit('setIsLogin', false)
            commit('setUser', {})
        },
        async Registration({state, commit, rootState}, input){
            try {
                const url = (rootState.URL.AUTH + `/registration`)
                var data = []
                await axios.post(url, {email: input.email, password: input.password}, { withCredentials: true })
                .then(res => {
                    data = res
                })
                .then(res => {
                        if(data.status === 200){
                            data = data.data
                            console.log(data)
                            this.dispatch('user/SetUser', data.user)
                        }
                    }
                )
            }
            catch(e) {
                console.log(e)
                var error = ''
                var status = e.toString()
                status = status.substring(status.length - 3)
                if(status === "403"){
                    error = "This email is already reserved"
                }
                else error = "The user has not been registered"
                return error
            }
        },
        async Login({state, commit, rootState}, input){
            try {
                const url = (rootState.URL.AUTH + `/login`)
                var data = [];
                await axios
                .post(url, {email: input.email, password: input.password}, { 
                    withCredentials: true,
                })
                .then(res => {
                    data = res.data
                    console.log(data)
                });
                if(data) {
                    this.dispatch('user/SetUser', data.user)
                }
            }
            catch(e) {
                var error = ''
                var status = e.toString()
                status = status.substring(status.length - 3)
                if(status === "403"){
                    error = "Wrong password entered"
                }
                else if(status === "400") error = "User with this email does not exist"
                else error = "Authorisation Error"
                return error
            }
        },
        async Logout({state, commit, rootState}){
            const url = (rootState.URL.AUTH + `/logout`)
            await axios.post(url, {}, { withCredentials: true })
            this.dispatch('user/RemoveUser')
        },
        async Authorization({state, commit, rootState}){
            const url = (rootState.URL.AUTH + `/user`)
            var data = {};
            await axios.get(url, {withCredentials: true})
            .then(res => {
                data = res.data
                if(data){
                    this.dispatch('user/SetUser', data)
                }
            })
            .catch(e =>{
            })
        },
        async ChangeEmail({state, commit, rootState}, input){
            try {
                const url = (rootState.URL.API + `/users/` + state.body.id)
                var data = [];
                await axios
                .put(url, {...input}, { 
                    withCredentials: true,
                })
                .then(res => {
                    data = res.data
                    console.log(data)
                });
                this.dispatch('user/SetUser', data.user)
            }
            catch(e) {
                var error = 'Email has not been changed'
                return error
            }
        },
        async ChangePassword({state, commit, rootState}, input){
            try {
                const url = (rootState.URL.API + `/users/` + state.body.id)
                var data = [];
                await axios
                .put(url, {...input}, { 
                    withCredentials: true,
                })
                .then(res => {
                    data = res.data
                    console.log(data)
                });
                this.dispatch('user/SetUser', data.user)
            }
            catch(e) {
                var error = 'Password has not been changed'
                return error
            }
        },
        async GetPersonages({state, commit, rootState}){
            try{
                const url = (rootState.URL.API + `/users/` + state.body.id + `/personages`)
                var data = [];
                await axios
                .get(url, { withCredentials: true })
                .then(res => {
                    data = res.data
                });
                return data
            }
            catch(e){
                console.log(e)
            }
        }
    },
    namespaced: true
}
