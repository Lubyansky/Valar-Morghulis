<template>
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">

                <div class="modal-header">
                    <slot name="header">
                        Modal window
                    </slot>
                </div>

                <div class="modal-buttons">
                    <button class="modal-button" @click="$emit('close')">
                        No
                    </button>
                    <button class="modal-button" @click="$emit('execute')">
                        Yes
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'modal',
}
</script>

<style scoped>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: table;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

    .modal-container {
        width: 300px;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
        font-family: Helvetica, Arial, sans-serif;
    }

    .modal-header h3 {
        margin-top: 0;
        color: #42b983;
    }

    .modal-buttons{
        display: inline-flex;
    }

    .modal-button {
        display: block;
        margin-top: 1rem;
        margin-right: 14px;
    }

    .modal-enter-active,
    .modal-leave-active {
        transition: opacity 0.5s ease;
    }

    .modal-enter-from,
    .modal-leave-to {
        opacity: 0;
    }
</style>