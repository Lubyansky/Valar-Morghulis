<template>
  <div>
    <div class="body-container">
      <div class="content">
        <div class="event-box">
          <div class="event-text">{{ event }}</div>
        </div>
        <div class="selection-box">
          <div class="options">
            <div class="option" v-for="(option, index) in options" :key="option" @click="Event(option.consequence)">{{index + 1}}. {{option.display}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
    name: 'personage-main',
    data(){
      return{
        event: '$ome text',
        options: [
          {
            display: 'Get sword',
            consequence: 'sword'
          },
          {
            display: 'Random location change',
            consequence: 'location'
          },
          {
            display: 'To up level',
            consequence: 'level'
          },
          {
            display: 'Сhoice nothing',
            consequence: 'nothing'
          }
        ]
      }
    },
    computed: {
        ...mapState({
            level: state => state.personage.body.level,
        }),
    },
    methods: {
      ...mapActions({
        addItem: 'personage/AddItem',
        randomLocationChange: 'personage/RandomLocationChange',
        editPersonage: 'personage/EditPersonage'
      }),
      async Event(value){
        switch(value) {
          case 'sword':
            const item = await this.addItem(5)
            this.event = "Item received: " + item.item_type_name + ' (' + item.quality + '%)'
            break
          case 'location':
            const location = await this.randomLocationChange()
            this.event = "Current location: " + location.name
            break
          case 'level':
            await this.editPersonage({level: this.level + 1})
            this.event = "Current level: " + this.level
            break
          default:
            this.event = value
            break
        }
        console.log(value)
      }
    }
}
</script>

<style scoped>
  .content{
    padding: 40px 0px;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 500px;
    background-color: #868686;
  }
  .event-box{
    width: 80%;
    height: 350px;
    background-color: black;
    color: white;
  }
  .event-text{
    padding: 13px 20px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .selection-box{
    width: 80%;
    height: 100px;
    background-color: black;
    color: white;
  }
  .options{
    padding: 13px 20px;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .option{
    cursor: pointer;
    color: #868686;
  }
  .option:hover{
    color: white
  }
</style>