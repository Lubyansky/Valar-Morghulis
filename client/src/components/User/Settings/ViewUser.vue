<template>
    <div>
        <h2>Email</h2>
        <div v-if="user">{{user.email}}</div>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'user-view',
    computed: {
        ...mapState({
            user: state => state.user.body,
        }),
    }
}
</script>

<style scoped>

</style>