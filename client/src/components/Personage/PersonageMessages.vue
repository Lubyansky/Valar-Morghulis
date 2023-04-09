<template>
    <div>
        <h1 class="title">Messages</h1>
        <div class="body-container">
            <div v-if="!isOpenDialogue" class="search">
                <input class="input" placeholder="Search"
                    :value = "query"
                    @input = "query = $event.target.value"
                    type = "text"
                />
            </div>
            <div v-if="!isOpenDialogue && !displayedDialogs.length" class="empty">Currently there are no messages</div>
            <dialogues v-if="!isOpenDialogue && displayedDialogs.length" :dialogues="foundPesonages.length ? foundPesonages : dialogues" @open-dialogue="OpenDialogue"/>
            <dialogue v-if="isOpenDialogue && dialogue" :dialogue="dialogue" @close-dialogue="CloseDialogue" @add-message="AddMessage"/>
        </div>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
    name: 'personage-messages',
    data(){
        return {
            dialogues: [],
            dialogue: [],
            isOpenDialogue: false,
            query: '',
            foundPesonages: [],
            displayedDialogs: []
        }
    },
    computed: {
        ...mapState({
            personage: state => state.personage.body
        })
    },
    methods: {
        ...mapActions({
          getMessages: 'personage/GetMessages',
          findPersonages: 'personage/FindPersonages'
        }),
        OpenDialogue(dialogue){
            this.dialogue = dialogue,
            this.isOpenDialogue = true
            this.query = ''
        },
        CloseDialogue(){
            this.isOpenDialogue = false
        },
        async AddMessage(message){
            var dialogue = this.displayedDialogs.find(dialogue => dialogue.partner.id === message.sender_id || dialogue.partner.id === message.recipient_id)
            dialogue.messageChain.push({
                id: message.id,
                recipient: message.recipient_id,
                sender: message.sender_name,
                text: message.text,
                createdAt: message.createdAt
            })
        },
        async LoadDialogues(messages){
            var dialogues = []
            messages.forEach(message=>{
                var dialogue = dialogues.find(dialogue => dialogue.partner.id === message.sender_id || dialogue.partner.id === message.recipient_id)
                if(!dialogue){
                    const newDialogue = {
                        partner: {
                            id: message.sender_id != this.personage.id ? message.sender_id : message.recipient_id,
                            name: message.sender_name != this.personage.name ? message.sender_name : message.recipient_name
                        },
                        messageChain: []
                    }
                    dialogues.push(newDialogue)
                }
            })
            this.dialogues = dialogues
        }
    },
    async created() {
        const messages = (await this.getMessages()).rows
        await this.LoadDialogues(messages)
        this.displayedDialogs = this.dialogues
        for (const message of messages) {
            await this.AddMessage(message)
        }
    },
    watch: {
        query: async function (val) {
            this.foundPesonages = []
            if(this.query){
                const data = await this.findPersonages(this.query)
                data.rows.forEach(personage=>{
                    var dialogue = this.dialogues.find(dialogue => dialogue.partner.id === personage.id)
                    if(!dialogue){
                        dialogue = {
                            partner: {
                                id: personage.id,
                                name: personage.name
                            },
                            messageChain: []
                        }
                    }
                    this.foundPesonages.push(dialogue)
                })
                this.displayedDialogs = this.foundPesonages
            }
            else{
                this.displayedDialogs = this.dialogues
            }
        }
    },
}
</script>

<style scoped>
    .search{
        width: 100%;
        box-sizing: border-box;
        margin-bottom: 24px;
    }
    .input{
        width: 100%;
        box-sizing: border-box;
        padding: 8px 12px 8px 12px
    }
    .empty{
        padding-top: 60px;
        text-align: center;
        font-size: 20px;
    }
</style>