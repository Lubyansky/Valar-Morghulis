<template>
    <div>
        <h1 class="title">Personage</h1>
        <div class="body-container">
            <div>
                <h2>Name</h2>
                <div>{{ personage.name }}</div>
            </div>
            <div>
                <h2>Class</h2>
                <div>{{ personage.personageClass }}</div>
            </div>
            <div>
                <h2>Level</h2>
                <div>{{ personage.level }}</div>
            </div>
            <div>
                <h2>Location</h2>
                <div>{{ personage.location }}</div>
            </div>
        </div>
    </div>
        
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
    name: 'personage-view',
    computed: {
        ...mapState({
            personage: state => state.personage.body
        }),
    },
    methods: {
        ...mapActions({
            getPersonage: 'personage/GetPersonage'
        })
    },
    created() {
        this.getPersonage(this.personage.id)
    }
}
</script>

<style scoped>

</style>