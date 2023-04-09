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
            <a @click="ExitChar()">Exit</a>
        </nav>
        <div class="main">
            <component :is="currentTabComponent" @change-tab="ChangeTab"></component>
        </div>
    </div>

</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
    data() {
        return {
            currentTab: "personage-main",
            tabs: [
                {
                    name: 'personage-main',
                    view: "MAIN"
                },
                {
                    name: 'personage-view',
                    view: "Personage"
                },
                {
                    name: 'personage-items',
                    view: "Items"
                },
                {
                    name: 'personage-location',
                    view: "Location"
                },
                {
                    name: 'personage-messages',
                    view: "Messages"
                },
                {
                    name: 'personage-settings',
                    view: "Settings"
                }
            ],
        }
    },
    computed: {
        ...mapState({
            isLogin: state => state.user.isLogin,
            isSetPersonage: state => state.personage.isSet
        }),
        currentTabComponent: function() {
            return this.currentTab.toLowerCase();
        }
    },
    methods: {
        ...mapActions({
            removePersonage: 'personage/RemovePersonage'
        }),
        ChangeTab(value){
            this.currentTab = value
        },
        ExitChar(){
            this.removePersonage()
        }
    },
    async created() {
        if(!this.isLogin){
            this.$router.push({name: 'authorization'})
        }
        if(this.isLogin && !this.isSetPersonage){
            this.$router.push({name: 'user'})
        }
    },
    watch: {
        isSetPersonage: function (){
            if(!this.isSetPersonage){
                this.$router.push({name: 'user'})
            }
        }
    }
}
</script>

<style>
    .body-container{
        margin-top: 60px;
    }
</style>