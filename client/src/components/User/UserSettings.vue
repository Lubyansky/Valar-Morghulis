<template>
    <div>
        <h1 class="title">Setting</h1>
        <div v-if="!isChangeEmail && !isChangePassword" class="user">
            <user-view/>
            <custom-button @click="isChangeEmail = true">Change email</custom-button>
            <custom-button @click="isChangePassword = true">Change password</custom-button>
        </div>
        <user-change-email v-if="isChangeEmail" @back="isChangeEmail = false"/>
        <user-change-password  v-if="isChangePassword" @back="isChangePassword = false"/>
    </div>
</template>

<script>
export default {
    name: 'user-settings',
    data() {
        return {
            isChangeEmail: false,
            isChangePassword: false,
        }
    },
    methods: {

    }
}
</script>

<style scoped>
    .user{
        display: flex;
        flex-flow: column;
    }
</style>