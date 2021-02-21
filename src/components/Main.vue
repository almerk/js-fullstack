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
import axios from 'axios'
import toolbar from '../components/toolbar.vue'
import feed from '../components/feed.vue'
export default {
  components:{
    toolbar : toolbar,
    feed : feed
  },

  data () {
    return {
      todos: [],
      endpoint: 'https://jsonplaceholder.typicode.com/todos/',
      selectedEventId : this.$route.params.id
    }
  },
  created(){
      this.getAllTodos();
  },
  methods:{
    getAllTodos(){
      axios.get(this.endpoint)
      .then(response => {
          this.todos = response.data;
      })
      .catch(err => console.error("Retrieving todos error:", err));
    }
  },
  computed:{
    todosFiltered: function() { 
        return this.todos.map(todo => todo) 
    },
  },
    watch: {
        '$route'() {
            this.selectedEventId = this.$route.params.id
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