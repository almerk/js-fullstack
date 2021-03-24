<template>
  <div class="continuous-date">
    <simple :value="start" /> - <simple :value="end" />
  </div>
</template>

<script>
import simple from './simple.vue';
export default {
    props: { value:Object },
    components: { simple },
    data() {  return {} },
    computed:{
      start(){
          return { dateTime:this.value.start,
              hasTime: this.value.hasTime }
      },
      end(){
          return { dateTime:this.value.end,
              hasTime: this.value.hasTime }
      }
  }
};
</script>

<style>
.continuous-date {
    display:flex;
    flex-direction: row;
    align-items: baseline;
}
</style>