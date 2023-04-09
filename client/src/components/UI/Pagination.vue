<template>
    <div class="pagination">
        <button 
            v-for="page in totalPages" :key="page"
            @click="changePage(page)" 
            class="pagination-button" 
            :class="{active: currentPage === page}">
            {{ page }}
        </button>
    </div>
</template>

<script>
export default {
    name: "v-pagination",
    props: ['currentPage', 'total', 'item', 'pageSize'],
    data() {
        return {
           
        }
    },
    computed: {
        totalPages(){
            return Math.ceil(this.total / this.pageSize)
        }
    },
    methods: {
        changePage(pageNumber) {
            this.$emit('page-changed', pageNumber)
        }
    },
    watch: {
        totalPages(){
            if(this.currentPage > this.totalPages && this.currentPage != 1){
                this.$emit('page-changed', this.totalPages)
            }
        }
    }
}
</script>

<style scoped>
    .pagination {
        display: inline-block;
    }

    .pagination-button {
        color: black;
        padding: 8px 16px;
        margin: 0 2px;
        font-size: 14px;
        text-decoration: none;
        border: none;
        outline: none;
    }

    .active {
        background-color: #111;
        color: white;
    }

    .pagination button:hover:not(.active) {background-color: #ddd;}
</style>