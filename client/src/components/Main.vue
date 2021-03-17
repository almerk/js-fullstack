<template>
<div id="main">
    <aside>
        <toolbar>
            <label>Types</label>
            <section v-for="type in types" :key="type.id" ><input type="checkbox" :id="type.id"/><label :for="type.id">{{type.name}}</label></section>
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
      selectedEventId : this.$route.params.eventId
    }
  },
  created(){
      this.$store.commit('initialize')
  },
  computed: {
    types() {
      return this.$store.getters.types;
    },
    events() { 
        return this.$store.getters.events;
    },
  },
    watch: {
        '$route'() {
            this.selectedEventId = this.$route.params.eventId
        }
    }
}
</script>

<style scoped>
    #main {
        display: grid;
        grid-template-columns: auto 1fr;
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
</style>