<template>
    <button>
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'custom-button'
}
</script>

<style scoped>
    button{
        margin-top: 20px;
        padding: 0px 12px;
        height: 32px;
        color:  #818181;
        background-color: #111;
        outline: none;
        border: solid 1px #111;
    }
    button:hover{
        color: #FFFFFF;
    }
</style>