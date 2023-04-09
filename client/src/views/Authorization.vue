<template>
    <div class="authorization">
        <form v-if="isFormLogin" class="form" @submit.prevent="">
            <h2 class="title">Authorization</h2>
            <h3>Enter email</h3>
            <input 
              :value = "loginForm.email"
              @input = "loginForm.email = $event.target.value"
              type = "email"
            />
            <h3>Enter password</h3>
            <input 
              :value = "loginForm.password"
              @input = "loginForm.password = $event.target.value"
              type = "password"
            />
            <button class="submit-button login" @click="Login">Login</button>
        </form>
        <form v-else class="form" @submit.prevent="">
            <h2 class="title">Registration</h2>
            <h3>Enter email</h3>
            <input 
                :value = "registrationForm.email"
                @input = "registrationForm.email = $event.target.value"
                type = "email"
            />
            <h3>Enter password</h3>
            <input 
                :value = "registrationForm.password"
                @input = "registrationForm.password = $event.target.value"
                type = "password"
            />
            <h3>Repeat password</h3>
            <input 
                :value = "registrationForm.rePassword"
                @input = "registrationForm.rePassword = $event.target.value"
                type = "password"
            />
            <button class="submit-button registration" @click="Registration">Register</button>
        </form>
        <div class="error" v-if="error">{{ error }}</div>
        <a class="turn-form" @click="TurnForm">{{turnText}}</a>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
    name: 'HomeView',
    data() {
        return {
          isFormLogin: true,
          turnText: 'Registration',
          error: '',
          loginForm: {
            email: '',
            password: ''
          },
          registrationForm: {
            email: '',
            password: '',
            rePassword: ''
          }
        }
    },
    computed: {
        ...mapState({
            isLogin: state => state.user.isLogin,
        }),
    },
    methods: {
        ...mapActions({
            registration: 'user/Registration',
            login: 'user/Login',
            logout: 'user/Logout'
        }),
        TurnForm(){
            if(this.isFormLogin){
                this.isFormLogin = false
                this.turnText = "Login"
                this.registrationForm = {
                    email: '',
                    password: '',
                    repassword: ''
                }
            }
            else{
                this.isFormLogin = true
                this.turnText = "Registration"
                this.loginForm = {
                    email: '',
                    password: '',
                }
            }
        },
        async Registration(){
            this.error = ''
            var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            const {...input} = this.registrationForm

            if(!input.email){
                this.error = "Enter email"
                return
            }
            if(!re.test(input.email)){
                this.error = "Invalid email"
                return
            }
            if(!input.password){
                this.error = "Enter password"
                return
            }
            if(input.password.search('^[a-zA-Z0-9]+$')){
                this.error = "Only digits and Latin characters are allowed for the password"
                return
            }
            if(input.password.length < 4 || input.password.length > 10 ){
                this.error = "Password must be between 4 and 10 characters"
                return
            }
            if(!input.rePassword){
                this.error = "Enter repeat password"
                return
            }
            if(input.rePassword != input.password){
                this.error = "Password mismatch"
                return
            }

            const err = this.registration(input)
            err.then(value => {
                if(value){
                    this.error = value
                    return
                }
                else{
                    this.TurnForm()
                }
            })
        },
        async Login(){
            this.error = ''
            const {...input} = this.loginForm

            if(!input.email){
                this.error = "Enter email"
                return
            }
            if(!input.password){
                this.error = "Enter password"
                return
            }
            const err = this.login(input)
            err.then(value => {
                this.error = value
            })
            this.loginForm = {
              email: '',
              password: ''
            }
        },
        async Logout(){
            this.logout()
        },
    },
    created() {
        if(this.isLogin){
            this.$router.push({name: 'user'})
        }
    },
    watch: {
        isLogin: function (){
            if(this.isLogin){
                this.$router.push({name: 'user'})
            }
        }
    }
}
</script>

<style scoped>
    .authorization{
        max-width: 440px;

        display: flex;
        flex-flow: column;
        justify-self: center; 

        margin-left: auto;
        margin-right: auto;
    }
    .form{
        max-width: inherit;

        display: flex;
        flex-flow: column;
        justify-content: center; 
    }
    .title{
        text-align: center;
        font-size: 32px;
    }
    .submit-button{
        margin-top: 28px;

        margin-left: auto;
        margin-right: auto;
        font-size: 16px;
    }
    .login{
        width: 100px;
    }
    .registration{
        width: 120px;
    }
    .error{
        margin-top: 16px;
        text-align: center;
        color: darkred;
    }
    .turn-form{
        margin-top: 16px;

        text-align: center;
        cursor: pointer;
    }
</style>