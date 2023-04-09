<template>
    <h1 class="title">Personage creation</h1>
    <form @submit.prevent="CreatePersonage()" class="create-personage">
        <div class="elem">
            <h2>Name</h2>
            <input
                :value = "form.name"
                @input = "form.name = $event.target.value"
                type = "text"
            />
        </div>
        <div class="elem">
            <h2>Class</h2>
            <select v-model="form.personageClass">
                <option>Knigth</option>
                <option>Wizard</option>
                <option>Thief</option>
                <option>Paladin</option>
            </select>
        </div>
    </form>
    <div class="buttons">
        <custom-button @click="$emit('back')" class="button">Back</custom-button>
        <custom-button @click="CreatePersonage()" class="button">Create</custom-button>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name: 'user-create-personage',
    emits: ['back'],
    data(){
        return {
            form: {
                name: '',
                personageClass: ''
            },
            error: ''
        }
    },
    methods: {
        ...mapActions({
            createPersonage: 'personage/CreatePersonage'
        }),

        async CreatePersonage(){
            this.error = ''
            const input = this.form
            if(!input.name.length){
                this.error = "Personage name must not be empty"
                return
            }
            if(input.name.length > 30){
                this.error = "Personage name must not exceed 30 charactersв"
                return
            }
            if(input.name.search('^[a-zA-Z0-9]+$')){
                this.error = "Personage name must consist of Latin characters or numbers"
                return
            }
            if(!input.personageClass){
                this.error = "Choose a personage class"
                return
            }

            if(!this.error){
                this.createPersonage(input)
                this.$router.push({name: 'main'})
            }
        }
    }
}
</script>

<style scoped>
    .create-personage{
        margin-top: 40px;
        display: flex;
        flex-flow: column;
    }
    input{
        width: 99%;
    }
    select{
        width: 100%;
    }
    .buttons{
        display: inline-flex;
    }
    .button{
        margin-right: 16px;
    }
    .error{
        margin-top: 16px;
        text-align: center;
        color: darkred;
    }
</style>