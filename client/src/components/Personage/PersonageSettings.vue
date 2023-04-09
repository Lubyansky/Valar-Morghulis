<template>
    <div>
        <h1 class="title">Settings</h1>
        <div class="body-container">
            <div  v-if="isEdit">
                <form @submit.prevent="">
                    <h2>Name</h2>
                    <input
                        :value = "form.name"
                        @input = "form.name = $event.target.value"
                        type = "text"
                    />
                </form>
                <div class="buttons">
                    <custom-button @click="isEdit = false" class="button">Back</custom-button>
                    <custom-button @click="EditPersonage()" class="button">Save</custom-button>
                </div>
                <div v-if="error" class="error">{{ error }}</div>
            </div>
            <div v-else class="personage-control">
                <custom-button @click="isEdit = true" class="button">Change personage</custom-button>
                <custom-button v-if="!isEdit" @click="showModal = true" class="button">Delete personage</custom-button>
            </div>
        </div>
    </div>
    <modal v-if="showModal" @close="showModal = false" @execute="DeletePersonage()">
        <template v-slot:header>
            <h3>Sure?</h3>
        </template>
    </modal>
</template>
  
<script>
import {mapState, mapActions} from 'vuex'
  
export default {
    name: 'personage-settings',
    emits: ['change-tab'],
    data() {
        return {
            form: {
                name: ''
            },
            isEdit: false,
            error: '',
            showModal: false
        }
    },
    computed: {
        ...mapState({
            personage: state => state.personage.body
        })
    },
    created(){
        this.form.name = this.personage.name
    },
    methods: {
        ...mapActions({
            editPersonage: 'personage/EditPersonage',
            deletePersonage: 'personage/DeletePersonage',
        }),
        async EditPersonage(){
            this.error = ''
            const input = this.form
            if(!input.name.length){
                this.error = "Personage name must not be empty"
                return
            }
            if(input.name.length > 30){
                this.error = "Personage name must not exceed 30 characters"
                return
            }
            if(input.name.search('^[a-zA-Z0-9]+$')){
                this.error = "Personage name must consist of Latin characters or numbers"
                return
            }

            if(!this.error){
                await this.editPersonage(input)
                this.$emit('change-tab', 'personage-main')
            }
        },
        async DeletePersonage(){
            await this.deletePersonage()
            this.$router.push({name: 'user'})
        }
    }
}
</script>
  
<style scoped>
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
    .personage-control{
        display: flex;
        flex-flow: column;
    }
</style>