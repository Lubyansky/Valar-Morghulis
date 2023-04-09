<template>
    <div class="AdminTable" v-if="table.records && table.records.count">
        <table class="table">
            <!--caption>{{table.display}}</caption-->
            <thead>
                <tr>
                    <th v-for="(attribute, index) of table.attributes" :key="index" 
                        :class="[
                            {active: attribute.name === sort.attribute}, 
                            {desc: sort.direction === 'sort_desc' && attribute.name === sort.attribute}, 
                            {asc: sort.direction === 'sort_asc' && attribute.name === sort.attribute} 
                        ]"
                        @click="$emit('sort', attribute.name)">
                        {{attribute.display}}
                    </th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(record, record_index) of table.records.rows" :key="record_index">
                    <td v-for="(attribute, at_index) of table.attributes" :key="at_index" :class="{center: Number.isInteger(record[attribute.name])}">
                        {{ record[attribute.name]}}
                    </td>
                    <div class='buttons'>
                        <custom-button @click="UpdateRecord(record_index, record.id)" class="button">Update</custom-button>
                        <custom-button @click="DeleteRecord(record_index, record.id)" class="button">Delete</custom-button>
                    </div>
                </tr>
            </tbody>
        </table>
    </div>
    <h2 v-else>Entries not found</h2>
</template>
  
<script>
import { mapActions } from 'vuex'

export default {
    name: 'admin-table',
    props: {
        table: {
            type: Object
        },
        sort: {
            type: Object
        }
    },
    data() {
        return {
            searchResults: []
        }
    },
    methods:{
        ...mapActions({
            deleteTableRecord: 'admin/DeleteRecord',
        }),
        async UpdateRecord(index, id){
            this.$emit('update-record', id)
        },
        async DeleteRecord(index, id){
            const data = {
                tableName: this.table.name,
                id
            }
            await this.deleteTableRecord(data)
            this.$emit('delete-record', index)
        }
    }

}
</script>
  
<style scoped>
    .table {
        width: 100%;
        border: none;
        margin-bottom: 20px;
    }
    .table thead th {
        font-weight: bold;
        text-align: left;
        border: none;
        padding: 10px 15px;
        background: #111;
        color: white;
        font-size: 14px;
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
    }
    .table thead th{
        position: relative;
    }
    .table thead th:hover {
        color: #DCA600;
    }
    .table thead th.active{
        color: #DCA600;
    }
    .table thead th.active:hover{
        color: #818181;
    }
    .table thead th.asc::after{
        content: ''; 
        position: absolute;
        top: 6.5px;
        margin-left: 5px;
        border: 7px solid transparent; 
        border-bottom: 10px solid #fff;
    }
    .table thead th.asc:hover::after{
        border-bottom: 10px solid #DCA600;
    }
    .table thead th.active.asc::after{
        border-bottom: 10px solid #DCA600;
    }
    .table thead th.active.asc:hover::after{
        border-bottom: 10px solid #818181;
    }
    .table thead th.desc::after{
        content: ''; 
        bottom: 8px;
        margin-left: 5px;
        position: absolute;
        border: 7px solid transparent; 
        border-top: 10px solid #fff;
    }
    .table thead th.desc:hover::after{
        border-top: 10px solid #DCA600;
    }
    .table thead th.active.desc::after{
        border-top: 10px solid #DCA600;
    }
    .table thead th.active.desc:hover::after{
        border-top: 10px solid #818181;
    }
    .table tbody td {
        text-align: left;
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
        padding: 10px 15px;
        font-size: 14px;
        vertical-align: top;
    }
    .table thead tr th:first-child, .table tbody tr td:first-child {
        border-left: none;
    }
    .table thead tr th:last-child, .table tbody tr td:last-child {
        border-right: none;
    }
    .table tbody tr:nth-child(even){
        background: #f3f3f3;
    }
    .center{
        text-align: center;
    }

    .buttons{
        position: relative;
        display: inline-flex;
        width: 160px;
        justify-content: space-around;
    }
    .button{
        margin-top: 0px;
    }
</style>