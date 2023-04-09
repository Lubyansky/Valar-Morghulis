<template>
    <h1 class="title">Pesonages</h1>
    <div class="personages">
        <div v-for="personage in personages" :key="personage.id" class="personage">
            <div @click="ChooseChar(personage.id)" class="personage-content">
                {{ personage.name }} ({{ personage.level }} lvl) [{{ personage.personageClass }}]
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    name: 'user-personages-list',
    props: ['personages'],
    methods: {
        ...mapActions({
            getPersonage: 'personage/GetPersonage'
        }),
        ChooseChar(id){
            this.getPersonage(id)
        }
    },
}
</script>

<style scoped>
    .personages{
        margin-top: 60px;
        display: flex;
        flex-flow: column;
        overflow-y: auto;
        overflow-x: hidden;
        width: 100%;
        max-height: 70vh;
    }
    .personage{
        width: 100%;
        border: solid 1px #111;
        box-sizing: border-box;
    }
    .personage:hover{
        background-color: #111;
        color: #FFFFFF;
    }
    .personage-content{
        padding: 15px 30px;
        width: 100%;
        display: inline-flex;
    }
</style>