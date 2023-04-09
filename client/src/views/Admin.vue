<template>
    <div class="admin">
        <nav class="sidenav">
            <a
                v-for="entity in entities"
                v-bind:key="entity"
                v-on:click="currentTable = entity.name"
            >
                {{ entity.display }}
            </a>
            <a @click="ExitAdminPanel()">Exit</a>
        </nav>
        <div class="main">
            <h1 class="title">{{table.display}}</h1>
            <div v-if="!isChange">
                <table-search :query="query" @query-changed="ChangeQuery"/>
                <div class="per-page-selector">
                    <div>Item per page</div>
                    <select v-model="currentPageSize">
                        <option disabled value="">Choose one of the options</option>
                        <option v-for="pageSize in pageSizes" :key="pageSize">{{pageSize}}</option>
                    </select>
                </div>
                <admin-table :table="table" :sort="sort" @update-record="SetRecordToUpdate" @delete-record="DeleteRecord" @sort="ChangeSort"/>
                <v-pagination v-if="table.records" 
                    :currentPage="currentPage"
                    :total="table.records.count" 
                    :item="table.records.rows.length" 
                    :pageSize="currentPageSize"
                    @page-changed="ChangePage"
                />
            </div>
            <table-change-item v-else 
                :entity="this.entities.find(entity => entity.name === this.currentTable)" 
                :record="record" 
                @back="Back" 
                @add-record="AddRecord"
                @update-record="UpdateRecord"
            />
            <custom-button v-if="!isChange" @click="isChange = true">Add</custom-button>
        </div>
    </div>
</template>
  
<script>
import { mapState, mapActions } from 'vuex'
  
export default {
    name: 'Admin',
    data () {
        return {
            table: {},
            currentTable: 'personages',
            currentPage: 1,
            currentPageSize: 5,
            pageSizes: [5, 10, 20, 50, 100],
            query: null,
            isChange: false,
            record: null,
            sort:{
                attribute: 'id',
                direction: 'sort_asc'
            }
        }
    },
    computed: {
        ...mapState({
            URL: state => state.URL,
            entities: state => state.admin.entities,
            isLogin: state => state.user.isLogin,
            role: state => state.user.body.role
        }),
    },
    methods:{
        ...mapActions({
            getTableRecords: 'admin/GetRecords',
            createTableRecord: 'admin/CreateRecord'
        }),
        async loadTable(){
            const table = this.entities.find(entity => entity.name === this.currentTable)
            const tableParams = {
                tableName: table.name,
                currentPage: this.currentPage,
                query: this.query,
                sort: this.sort,
                limit: this.currentPageSize
            }
            table.records = await this.getTableRecords(tableParams)
            this.table = table
        },
        async AddRecord(record){
            this.table.records.count += 1
            if(this.table.records.rows.length < this.currentPageSize){
                this.table.records.rows.push(record)
            }
            else{
                this.ChangePage(this.currentPage + 1)
            }
        },
        async SetRecordToUpdate(id){
            this.record = this.table.records.rows.find(record => record.id === id)
            this.isChange = true
        },
        async UpdateRecord(record){
            const row = this.table.records.rows.find(row => row.id === record.id)
            Object.assign(row, record);
        },
        async DeleteRecord(index){
            this.table.records.count -= 1
            this.table.records.rows.splice(index, 1)
        },
        Back(){
            this.record = null
            this.isChange = false
        },
        async ChangePage(value){
            this.currentPage = value
            await this.loadTable()
        },
        async ChangeQuery(value){
            this.query = value
            await this.loadTable()
        },
        async ChangeSort(value){
            if(this.sort.attribute === value){
                this.sort.direction = this.sort.direction === 'sort_asc' ? 'sort_desc' : 'sort_asc' 
            }
            else{
                this.sort = {
                    attribute: value, 
                    direction: 'sort_asc'
                }
            }
            await this.loadTable()
        },
        ExitAdminPanel(){
            this.$router.push({name: 'user'})
        },
    },
    async created(){
        if(this.role != 'admin'){
            this.$router.push({name: 'user'})
        }
        await this.loadTable()
    },
    watch: {
        currentTable(){
            this.currentPage = 1
            this.isChange = false
            this.query = ''
            this.sort = {
                attribute: 'id',
                direction: 'sort_asc'
            }
            this.loadTable()
        },
        currentPageSize(){
            this.loadTable()
        }
    }
}
</script>
  
<style scoped>
    .admin{
        padding: 0px 160px;
    }
    .per-page-selector{
        display: flex;
        flex-flow: row;
    }
    .per-page-selector select{
        width: 50px;
        padding: 2px 3px 2px 3px;
    }
</style>