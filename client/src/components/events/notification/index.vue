<template>
  <default-index :event="event" class="notification-event">
      <template v-slot:content>
      </template>
  </default-index>
</template>

<script>
import defaultIndex from "../default/index.vue";
export default {
  components: {
    defaultIndex,
  },
  props: { event: Object },
  data() {
    return {};
  },

};
</script>

<style>
.notification-event{
    grid-row: span 2;
    grid-column: span 2; 
}
</style>