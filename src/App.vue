<template>
  <div id="app">
    <aside>
        <toolbar></toolbar>
    </aside>
    <main>
      <feed :todos="todos"></feed>
      <div id="calendar">

      </div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
import toolbar from './components/toolbar.vue'
import feed from './components/feed.vue'
export default {
  name: 'app',
  components:{
    toolbar : toolbar,
    feed : feed
  },

  data () {
    return {
      todos: [],
      endpoint: 'https://jsonplaceholder.typicode.com/todos/'
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
  }
}
</script>

<style>
  *{
    box-sizing: border-box; 
  }
  :root{
    font-size: 16pt;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  html, body{
    height:100%;
    width: 100%;
  }
  #app{
    height: 100%;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-row: auto;
    column-gap: .5em;
  }
</style>
