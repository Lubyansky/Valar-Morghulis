import axios from "axios";

export const adminModule = {
    state: () => ({
        entities:[
            {
                name: 'personages', // Соответствие url запросу
                display: 'Personages',
                attributes: [
                    {
                        display:'ID',
                        name: 'id'
                    }, 
                    {
                        display: 'Name',
                        name: 'name'
                    }, 
                    {
                        display: 'Class',
                        name: 'personageClass'
                    },
                    {
                        display: 'Level',
                        name: 'level'
                    }, 
                    {
                        display: 'Location',
                        name: 'position'
                    },
                    {
                        display: 'User',
                        name: 'user_id'
                    }
                ]
            },
            {
                name: 'item-types', // Соответствие url запросу
                display: 'Item Types',
                attributes: [
                    {
                        display:'ID',
                        name: 'id'
                    }, 
                    {
                        display: 'Name',
                        name: 'name'
                    }
                ]
            },
            {
                name: 'items', // Соответствие url запросу
                display: 'Items',
                attributes: [
                        {
                            display: 'ID',
                            name: 'id'
                        },
                        {
                            display:'ID_Type',
                            name: 'item_type_id'
                        }, 
                        {
                            display:'Type',
                            name: 'item_type_name'
                        }, 
                        {
                            display: 'ID_Owner',
                            name: 'owner_id'
                        }, 
                        {
                            display: 'Owner',
                            name: 'owner_name'
                        }, 
                        {
                            display: 'Quality',
                            name: 'quality'
                        }
                ]
            },
            {
                name: 'locations', // Соответствие url запросу
                display: 'Locations',
                attributes: [
                    {
                        display:'ID',
                        name: 'id'
                    }, 
                    {
                        display: 'Name',
                        name: 'name'
                    },
                    {
                        display: 'Description',
                        name: 'description'
                    }, 
                    {
                        display: 'Type',
                        name: 'type'
                    }
                ]
            },
            {
            name: 'messages', // Соответствие url запросу
            display: 'Messages',
                attributes: [
                    {
                        display:'ID',
                        name: 'id'
                    }, 
                    {
                        display: 'Sender',
                        name: 'sender_id'
                    }, 
                    {
                        display: 'Recipient',
                        name: 'recipient_id'
                    },
                    {
                        display: 'Text',
                        name: 'text'
                    }
                ]
            }
        ]
    }),
    mutations: {
    },
    actions: {
        async GetRecords({state, commit, rootState}, params){
            try{
                const url = (rootState.URL.API + `/` + params.tableName + `?page=` + params.currentPage + `&limit=` + params.limit + (params.query ? '&query=' + params.query : '') + `&` + params.sort.direction + `=` + params.sort.attribute)
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
        },
        async CreateRecord({state, commit, rootState}, params){
            try{
                const limit = 5
                const url = (rootState.URL.API + `/` + params.tableName)
                var data = [];
                await axios
                .post(url, params.body, { withCredentials: true })
                .then(res => {
                    data = res.data
                });
                return data
            }
            catch(e){
                console.log(e)
            }
        },
        async UpdateRecord({state, commit, rootState}, params){
            try{
                const limit = 5
                const url = (rootState.URL.API + `/` + params.tableName + `/` + params.id)
                var data = [];
                await axios
                .put(url, params.body, { withCredentials: true })
                .then(res => {
                    data = res.data
                });
                return data
            }
            catch(e){
                console.log(e)
            }
        },
        async DeleteRecord({state, commit, rootState}, params){
            try{
                const limit = 5
                const url = (rootState.URL.API + `/` + params.tableName + `/` + params.id)
                var data = [];
                await axios
                .delete(url, { withCredentials: true })
                .then(res => {
                    data = res.data
                });
                return data
            }
            catch(e){
                console.log(e)
            }
        },
        async GetAttributeValues({state, commit, rootState}, params){
            try{
                const limit = 5
                const url = (rootState.URL.API + `/` + params.tableName)
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
