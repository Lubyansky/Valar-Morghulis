<template>
    <h2>Change email</h2>
    <form class="form">
        <input 
            :value = "form.email"
            @input = "form.email = $event.target.value"
            type = "text"
        >
    </form>
    <div class="buttons">
        <custom-button @click="$emit('back')" class="button">Back</custom-button>
        <custom-button @click="ChangEmail" class="button">Save</custom-button>
    </div>
    <div v-if="error" class="error">{{error}}</div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
    name: 'user-change-email',
    emits: ['back'],
    data() {
        return {
            error: '',
            form: {
                email: ''
            }
        }
    },
    computed: {
        ...mapState({
            user: state => state.user.body,
        }),
    },
    created() {
        this.form.email =  this.user.email
    },
    methods: {
        ...mapActions({
            changeEmail: 'user/ChangeEmail',
        }),
        async ChangEmail(){
            this.error = ''
            const {...input} = this.form
            var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

            if(!input.email){
                this.error = "Enter a new email"
                return
            }
            if(!re.test(input.email)){
                this.error = "Invalid email"
                return
            }
            this.error = await this.changeEmail(input)
            if(!this.error){
                this.$emit('back')
            }  
        },
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
</style>