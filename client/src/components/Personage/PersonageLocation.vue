<template>
    <div>
        <h1 class="title">{{location.name}}</h1>
        <div>
            <div class="type">{{ location.type }}</div>
            <p class="desc">
                {{ location.description }}
            </p>
        </div>
        <img v-if="image" class="image" :src="image">
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
    name: 'personage-location',
    data(){
        return {
            location: [],
            image: '' 
        }
    },
    methods: {
        ...mapActions({
          getLocation: 'personage/GetLocation'
        }),
    },
    async created() {
        this.location = await this.getLocation()
        this.image = '/assets/images/locations/' + this.location.name.toLowerCase().replace(/ /ig, '_') + '.jpg'
    },
}
</script>

<style scoped>
    .type{
        color: #818181;
        text-align: center;
    }
    .desc{
        text-align: center;
    }
    .image{
        width: 100%;
    }
</style>