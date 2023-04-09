<template>
    <div class="AddItem">
        <form>
            <div v-for="attribute in entity.attributes" :key="attribute">
                <div v-show="attribute.name.toLowerCase() != 'id'" >
                    <h2>{{attribute.display}}</h2>
                    <select v-if="entity.attributes.find(attr => attr.name === (attribute.name.slice(0,-5) + '_id'))">
                        <option v-for="value in fk_attributes.find(attr => attr.name === entity.attribute.name).values" :key="value">{{ value }}</option>
                    </select>
                    <input v-else
                        :value = "record ? record[attribute.name] : ''"
                        @input = "form[attribute.name] = $event.target.value"
                        type = "text"
                    />
                </div>
            </div>
        </form>
        <div class="buttons">
            <custom-button @click="$emit('back')" class="button">Back</custom-button>
            <custom-button @click="Save" class="button">Save</custom-button>
        </div>
    </div>
</template>
  
<script>
import { mapActions } from 'vuex'
  
export default {
    name: 'table-change-item',
    props: ['entity', 'record'],
    data(){
        return {
            form: {},
            values: [],
            fk_attributes: [] 
        }
    },
    methods:{
        ...mapActions({
            createTableRecord: 'admin/CreateRecord',
            updateTableRecord: 'admin/UpdateRecord',
            getAttributeValues: 'admin/GetAttributeValues'
        }),
        async Save(){
            if(!this.record){
                await this.CreateRecord()
            }
            else{
                await this.UpdateRecord()
            }
        },
        async CreateRecord(){
            const data = {
                tableName: this.entity.name,  
                body: this.form
            }
            this.form = {}
            const record = await this.createTableRecord(data)
            this.$emit('add-record', record)
            this.$emit('back')
        },
        async UpdateRecord(){
            const data = {
                id: this.record.id,
                tableName: this.entity.name,  
                body: this.form
            }
            this.form = {}
            const record = await this.updateTableRecord(data)
            this.$emit('update-record', record)
            this.$emit('back')
        }
    },
    async created() {
        for(const attribute of this.entity.attributes){
            const fk_attribute = this.entity.attributes.find(attr => attr.name === (attribute.name.slice(0,-5) + '_id'))
            if(fk_attribute){
                this.fk_attributes.push({
                    name: attribute.name,
                    values: await this.getAttributeValues({tableName: attribute.name})
                })
            }
        }
        console.log(this.fk_attributes.find(attr => attr.name === this.entity.attribute.name))
    }
}
</script>
  
<style scoped>
    .buttons{
        display: inline-flex;
    }
    .button{
        margin-right: 16px;
    }
</style>