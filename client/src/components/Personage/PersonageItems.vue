<template>
    <div>
        <h1 class="title">Items</h1>
        <div class="items body-container">
            <div v-if="items.length">
                <div v-for="item in items" :key="item.id" class="item">
                    <div>{{ item.item_type_name }} ({{ item.quality }}%)</div>
                </div>
            </div>
            <div v-if="!items.length" class="empty">Currently there are no items</div>
        </div> 
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
    name: 'personage-items',
    data(){
        return {
            items: []    
        }
    },
    methods: {
        ...mapActions({
          getItems: 'personage/GetItems'
        }),
    },
    async created() {
        this.items = (await this.getItems()).rows
    },
}
</script>

<style scoped>
    .items{
        display: flex;
        flex-flow: column;
        overflow-y: auto;
        overflow-x: hidden;
        width: 100%;
        max-height: 70vh;
    }
    .item{
        padding: 20px; 
        border: solid 1px #111;
    }
    .item:hover{
        color: #FFFFFF;
        background-color: #111;
    }
    .empty{
        padding-top: 60px;
        text-align: center;
        font-size: 20px;
    }
</style>