<template>
    <form>
        <input 
            :value = "query"
            @input = "ChangeInput($event.target.value)"
            type = "text"
            placeholder="Search"
        />
    </form>
</template>
  
<script>
export default {
    name: 'table-search',
    props: ['query'],
    methods:{
        ChangeInput(query){
            this.$emit('query-changed', query)
        }
    }

}
</script>
  
<style scoped>
    input { 
        width: 100%;
        box-sizing: border-box;
        padding: 8px 12px 8px 12px;
    }
</style>