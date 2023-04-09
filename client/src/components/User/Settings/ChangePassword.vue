<template>
    <h2>Change password</h2>
    <form class="form">
        <h3>Enter the current password</h3>
        <input 
            :value = "form.oldPassword"
            @input = "form.oldPassword = $event.target.value"
            type = "password"
        >
        <h3>Enter a new password</h3>
        <input 
            :value = "form.newPassword"
            @input = "form.newPassword = $event.target.value"
            type = "password"
        >
        <h3>Repeat new password</h3>
        <input 
            :value = "form.rePassword"
            @input = "form.rePassword = $event.target.value"
            type = "password"
        >
    </form>
    <div class="buttons">
        <custom-button @click="$emit('back')" class="button">Back</custom-button>
        <custom-button @click="ChangePassword" class="button">Save</custom-button>
    </div>
    <div v-if="error" class="error">{{error}}</div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    name: 'user-change-password',
    emits: ['back'],
    data() {
        return {
            error: '',
            form: {
                oldPassword: '',
                newPassword: '',
                rePassword: ''
            }
        }
    },
    methods: {
        ...mapActions({
            changePassword: 'user/ChangePassword'
        }),
        async ChangePassword(){
            this.error = ''
            const {...input} = this.form

            if(!input.oldPassword){
                this.error = "Enter the current password"
                return;
            }
            if(!input.newPassword){
                this.error = "Enter a new password"
                return;
            }
            if(input.newPassword.search('^[a-zA-Z0-9]+$')){
                this.error = "Only digits and Latin characters are allowed for the password"
                return;
            }
            if(input.oldPassword === input.newPassword){
                this.error = "Current and new passwords must be different"
                return;
            }
            if(input.newPassword.length < 4 || input.newPassword.length > 10 ){
                this.error = "Password must be between 4 and 10 characters"
                return;
            }
            if(!input.rePassword){
                this.error = "Enter repeat password"
                return;
            }
            if(input.newPassword != input.rePassword){
                this.error = "New passwords don't match"
                return;
            }

            this.error = await this.changePassword(input)
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