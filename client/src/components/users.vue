<template>
  <div>
      <h1>Subjects list</h1>
    <div v-for="subj in subjects" :key="subj.id">
        {{ subj.name }}
    </div>
  </div>
</template>

<script>
export default {
    computed:{
        subjects(){
            return this.$store.state.subjects ? this.$store.state.subjects : []
        }
    },
    created(){
       this.$store.commit('populate')
    }
}
</script>

<style>

</style>