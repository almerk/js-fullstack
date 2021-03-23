<template>
  <article @click="eventClick(event.id)" :id="`event-${event.id}`">
      <component :is="view"></component>
  </article>
</template>

<script>
import user from "./user.vue";
import events from "./events/fabric.js";
export default {
  components: {
    user,
    ...events.all,
  },
  props: {
    event: Object,
  },
  data() {
    return {
        currentView: 'index'
    };
  },
  computed: {
      view() {
          return events.is(this.event.$type, this.currentView);
      }
  },
  methods: {
    eventClick(id) {
        const path = `/events/${id}`;
        if (this.$route.path !== path) this.$router.push(path)
    },
  },
};
</script>

<style >
</style>