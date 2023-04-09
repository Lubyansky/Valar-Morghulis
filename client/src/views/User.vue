<template>
    <div class="container">
        <nav class="sidenav">
            <a
                v-for="tab in tabs"
                v-bind:key="tab"
                v-on:click="currentTab = tab.name"
            >
                {{ tab.view }}
            </a>
            <a v-if="role === 'admin'" href="/admin">Admin Panel</a>
            <a @click="Logout">Exit</a>
        </nav>
        <div class="main">
            <component :is="currentTabComponent"></component>
        </div>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
    data() {
        return {
            currentTab: "user-personages",
            tabs: [
                {
                    name: 'user-personages',
                    view: "Personages"
                },
                {
                    name: 'user-settings',
                    view: "Settings"
                } 
            ],
        }
    },
    computed: {
        ...mapState({
            isLogin: state => state.user.isLogin,
            role: state => state.user.body.role
        }),
        currentTabComponent: function() {
            return this.currentTab.toLowerCase();
        }
    },
    methods: {
        ...mapActions({
            logout: 'user/Logout',
        }),
        async Logout(){
            await this.logout()
            this.$router.push({name: 'authorization'})
        },
    },
    async created() {
        if(!this.isLogin){
            this.$router.push({name: 'authorization'})
        }
    }
}
</script>

<style scoped>
</style>