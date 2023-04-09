<template>
   <div class="dialogues ">
        <div v-for="dialogue in dialogues" :key="dialogue" class="dialogue" @click="$emit('open-dialogue', dialogue)" title="Go to dialogue">
            <div>{{ dialogue.partner.name }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'dialogues',
    props: ['dialogues']
}
</script>

<style scoped>
    .dialogues{
        display: flex;
        flex-flow: column;
        overflow-y: auto;
        overflow-x: hidden;
        width: 100%;
        max-height: 70vh;
    }
    .dialogue{
        padding: 20px; 
        border: solid 1px #111;
    }
    .dialogue:hover{
        color: #FFFFFF;
        background-color: #111;
    }
</style>