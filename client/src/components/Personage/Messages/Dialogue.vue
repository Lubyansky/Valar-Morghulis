<template>
    <div class="dialogue">
        <div class="header">
            <div class="partner">{{dialogue.partner.name}}</div>
            <custom-button @click="$emit('close-dialogue')" class="button">Back</custom-button>
        </div>
        <div class="body" ref="messages">
            <div v-for="message in dialogue.messageChain" :key="message" class="message">
                <div class="message-info">
                    <div class="sender">{{ message.sender }}</div>
                    <div class="datetime" :title="new Date(message.createdAt).toLocaleString()">{{ new Date(message.createdAt).toLocaleTimeString() }}</div>
                </div>
                <div class="text">{{ message.text }}</div>
            </div>
        </div>
        <form class="form">
            <div @input="onInput" ref="input" class="textarea" placeholder="Write a message..." contenteditable="true" role="textbox" aria-multiline="true"></div>
        </form>
        <custom-button class="button" @click="SendMessage()">Send</custom-button>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
    name: 'dialogue',
    props: ['dialogue'],
    data(){
        return {
            text: ''
        }
    },
    computed: {
        ...mapState({
            personage: state => state.personage.body
        })
    },
    methods: {
        ...mapActions({
            sendMessage: 'personage/SendMessage'
        }),
        onInput(event) {
            this.text = event.target.innerText;
        },
        async SendMessage(){
            if(!this.text){
                return
            }
            this.text = this.text.substring(0, 999);
            const data = {
                id: this.dialogue.partner.id,
                text: this.text
            }
            const message = await this.sendMessage(data)
            if(message){
                message.sender_name = this.personage.name
                message.recipient_name = this.dialogue.partner.name
                await this.$emit('add-message', message)
                this.scrollToBottom()
            }
            this.text = ""
        },
        scrollToBottom() {
            const messages = this.$refs.messages;
            messages.scrollTop = messages.scrollHeight;
        }
    },
    watch: {
        text: function (val) {
            this.$refs.input.textContent = val; 
        }
    },
    mounted() {
        this.scrollToBottom();
    }
}
</script>

<style scoped>
    .dialogue{
        max-height: 555px;
        box-sizing: border-box;
        position: relative;
        display: flex;
        flex-flow: column;
    }
    .header{
        display: flex;
        flex-flow: row;
        justify-content: space-between;
        border: solid 1px #111;
    }
    .body{
        margin-top: 10px;
        height: 400px;
        min-height: 200px;
        max-width: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
        border: solid 1px #111;
        box-sizing: content-box;
    }
    .partner{
        margin: 16px;
        font-weight: 700;
    }
    .message{
        padding: 15px 30px;
    }
    .message-info{
        display: flex;
        justify-content: space-between;
    }
    .sender{
        padding-right: 12px;
        font-weight: 500;
        color: #3d3da9
    }
    .datetime{
        color: #818181;
    }
    .text{
        padding-top: 10px;
        word-wrap: break-word;
    }
    .form{
        margin-top: 10px;
        margin-bottom: 10px;
        width: 100%;
    }
    .textarea{
        resize: none;
        padding: 9px 13px 10px 13px;
        width: 100%;
        max-height: 140px;
        box-sizing: border-box;
        border: solid 1px #111;
        overflow-y: auto;
        overflow-x: hidden;
    }
    [placeholder]:empty::before {
        content: attr(placeholder);
        color: #555; 
    }

    [placeholder]:empty:focus::before {
        content: "";
    }
    .button{
        display: inline-block;
        margin: 0px;
    }
</style>