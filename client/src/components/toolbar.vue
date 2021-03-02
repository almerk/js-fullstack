<template>
  <div id="toolbar">
      <header>
          {{ header }}
      </header>
      <router-link to="/events/199">199</router-link>
      <router-link to="/events/100">100</router-link>
      <router-link to="/events/1">1</router-link>
  </div>
</template>

<script>
export default {
    data() {
        return {
           header:"📅 Vue todos sample" 
        }      
    }
}
</script>

<style scoped>

</style>
