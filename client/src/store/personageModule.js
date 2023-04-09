import axios from "axios";

export const personageModule = {
    state: () => ({
        body: {},
        isSet: false
    }),
    mutations: {
        setPersonage(state, personage){
            state.body = personage
        },
        setIsSet(state, value){
            state.isSet = value
        }
    },
    actions: {
        async SetPersonage({state, commit}, personage){
            commit('setPersonage', personage)
            commit('setIsSet', true)
        },
        async RemovePersonage({state, commit}){
            commit('setPersonage', {})
            commit('setIsSet', false)
        },
        async GetPersonage({state, commit, rootState}, id){
            try{
                const url = (rootState.URL.API + `/personages/` + id)
                await axios
                .get(url, { withCredentials: true })
                .then(res => {
                    const data = res.data
                    if(data){
                        this.dispatch('personage/SetPersonage', data)
                    }
                });
            }
            catch(e){
                console.log(e)
            }
        },
        async GetItems({state, commit, rootState}){
            try{
                const url = (rootState.URL.API + `/personages/` + state.body.id + `/items`)
                var data = []
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
        },
        async GetMessages({state, commit, rootState}){
            try{
                const url = (rootState.URL.API + `/personages/` + state.body.id + `/messages`)
                var data = []
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
        },
        async GetLocation({state, commit, rootState}){
            try{
                const url = (rootState.URL.API + `/locations/` + state.body.position)
                var data = []
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
        },
        async CreatePersonage({state, commit, rootState}, input){
            try{
                const url = (rootState.URL.API + `/personages`)
                var data = []
                await axios
                .post(url, input, { withCredentials: true })
                .then(res => {
                    const data = res.data
                    if(data){
                        this.dispatch('personage/SetPersonage', data)
                    }
                });
            }
            catch(e){
                console.log(e)
            }
        },
        async EditPersonage({state, commit, rootState}, input){
            try{
                const url = (rootState.URL.API + `/personages/` + state.body.id)
                await axios
                .put(url, input, { withCredentials: true })
                .then(res => {
                    const data = res.data
                    if(data){
                        this.dispatch('personage/SetPersonage', data)
                    }
                });
            }
            catch(e){
                console.log(e)
            }
        },
        async DeletePersonage({state, commit, rootState}){
            try{
                const url = (rootState.URL.API + `/personages/` + state.body.id)
                await axios
                .delete(url, { withCredentials: true })
                .then(res => {
                    this.dispatch('personage/RemovePersonage')
                });
            }
            catch(e){
                console.log(e)
            }
        },
        async SendMessage({state, commit, rootState}, data){
            try{
                const url = (rootState.URL.API + `/messages`)

                const message = {
                    sender_id: state.body.id,
                    recipient_id: data.id,
                    text: data.text
                }
                var data = []
                await axios
                .post(url, message, { withCredentials: true })
                .then(res => {
                    data = res.data
                });
                return data
            }
            catch(e){
                console.log(e)
            }
        },
        async FindPersonages({state, commit, rootState}, query){
            try{
                const url = (rootState.URL.API + `/personages?query=` + query)
                var data = []
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
        },
        async RandomLocationChange({state, commit, rootState}){
            try{
                const url = (rootState.URL.API + `/locations`)
                var locations = []
                await axios
                .get(url, { withCredentials: true })
                .then(res => {
                    locations = res.data.rows
                });
                const location = locations[Math.floor(Math.random() * locations.length)]
                await this.dispatch('personage/EditPersonage', {position: location.id})
                return location
            }
            catch(e){
                console.log(e)
            }
        },
        async AddItem({state, commit, rootState}, item_type){
            try{
                const url = (rootState.URL.API + `/items`)
                const data = {
                    item_type,
                    owner: state.body.id
                }
                var item = {}
                await axios
                .post(url, data, { withCredentials: true })
                .then(res => {
                    item = res.data
                });
                item = await this.dispatch('personage/GetItem', item.id)
                return item
            }
            catch(e){
                console.log(e)
            }
        },
        async GetItem({state, commit, rootState}, id){
            try{
                const url = (rootState.URL.API + `/items/` + id)
                var item = {}
                await axios
                .get(url, { withCredentials: true })
                .then(res => {
                    item = res.data
                });
                return item
            }
            catch(e){
                console.log(e)
            }
        }
    },
    namespaced: true
}
