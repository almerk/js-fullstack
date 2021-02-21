<template>
    <router-view></router-view>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      todos: [],
      endpoint: 'https://jsonplaceholder.typicode.com/todos/'
    }
  }
}
</script>

<style>
  *{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  :root{
    font-size: 16pt;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  html, body{
    height:100%;
    width: 100%;
    overflow: hidden;
  }
</style>
