<template>
<div id="main">
    <aside>
        <toolbar></toolbar>
    </aside>
    <main>
      <feed :todos="todosFiltered" :selectedEventId="selectedEventId"></feed>
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
      this.$store.commit('populate')
  },
  computed:{
    todos(){ 
         return this.$store.state.todos != null? this.$store.state.todos : []
    },
    todosFiltered() { 
        return this.todos.map(todo => todo) 
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