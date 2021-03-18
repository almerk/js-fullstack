<template>
<div id="main">
    <aside>
        <toolbar>
            <label>Types</label>
            <nav>
                <label v-for="type in types" :key="type.id">
                  <input type="checkbox" :value="type.id" v-model="selectedTypeIds"/>
                  <span>{{type.name}}</span>
                </label>
            </nav>
            <label>Calendars</label>
            <nav>
                <label v-for="calendar in calendars" :key="calendar.id">
                  <input type="checkbox" :value="calendar.id" v-model="selectedCalendarIds" :disabled="!inArray(calendar.typeId, selectedTypeIds)"/>
                  <span>{{calendar.name}}</span>
                </label>
            </nav>
        </toolbar>
    </aside>
    <main>
      <feed :events="events" :selectedEventId="selectedEventId"></feed>
      <div id="calendar">
      </div>
    </main>
</div>

</template>

<script>
import toolbar from '../components/toolbar.vue'
import feed from '../components/feed.vue'
export default {
  components:{
    toolbar, 
    feed 
  },
  data () {
    return {
      selectedEventId : this.$route.params.eventId,
      selectedTypeIds: [],
      selectedCalendarIds: []
    }
  },
  methods: {
    inArray(value, array){
      return array.includes(value);
    }
  },
  created(){
      this.$store.commit('initialize')
  },
  computed: {
    types() {
      return this.$store.getters.types;
    },
    calendars(){
      return this.$store.getters.calendars;
    },
    events() { 
        return this.$store.getters.events;
    },
  },
    watch: {
        '$route'() {
            this.selectedEventId = this.$route.params.eventId
        },
        types(newTypes, oldTypes) {
          const added = newTypes.filter(x => !oldTypes.some(y => y.id == x.id))
          this.selectedTypeIds = this.selectedTypeIds.concat(added.map(x => x.id))
        },
        calendars(newValue, oldValue){
          const added = newValue.filter(x => !oldValue.some(y => y.id == x.id));
          this.selectedCalendarIds = this.selectedCalendarIds.concat(added.map(x => x.id));
        }, 
        selectedTypeIds(newValue, oldValue) {
          const addedTypes = newValue.filter(x => !oldValue.includes(x))
          const canBeDisplayed =  this.calendars.filter(x => newValue.includes(x.typeId)).map(x => x.id);
          const mustBeDisplayed =  this.calendars.filter(x => addedTypes.includes(x.typeId)).map(x => x.id);
          this.selectedCalendarIds = [...this.selectedCalendarIds.filter(x => canBeDisplayed.includes(x)), ...mustBeDisplayed];
        }
    }
}
</script>

<style>
    #main {
        display: grid;
        grid-template-columns: minmax(auto, 25%) 1fr;
        grid-row: auto;
        column-gap: .5em;
        overflow: hidden;
        width:100%;
        height: 100%;
    }
    #main > *{
        overflow:auto;
        height: 100%;
    }
    #toolbar nav {
      display: flex;
      flex-direction: column;
    }
    
   
</style>  