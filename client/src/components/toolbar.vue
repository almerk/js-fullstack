<template>
  <div id="toolbar">
      <header>
          {{ header }}
      </header>
      <slot></slot>
  </div>
</template>

<script>
export default {
    data() {
        return {
           header:"📅 Calendario" 
        }      
    }
}
</script>

<style scoped>

</style>
