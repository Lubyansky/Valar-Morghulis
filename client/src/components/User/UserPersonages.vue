<template>
    <div>
        <div v-if="!isAdd">
            <user-personages-list :personages="personages"/>
            <custom-button @click="isAdd = true">Create a personage</custom-button>
        </div>
        <user-create-personage v-else @back="isAdd = false"/>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
    name: 'user-personages',
    data() {
        return {
            personages: [],
            isAdd: false
        }
    },
    computed: {
        ...mapState({
            user: state => state.user.body,
            isSetPersonage: state => state.personage.isSet
        }),
    },
    methods: {
        ...mapActions({
            getPersonages: 'user/GetPersonages',
        }),
    },
    async created() {
        this.personages = (await this.getPersonages()).rows
    },
    watch: {
        isSetPersonage: function (){
            if(this.isSetPersonage){
                this.$router.push({name: 'main'})
            }
        }
    }
}
</script>

<style scoped>
</style>