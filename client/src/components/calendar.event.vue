<template>
  <component
    :is="view"
    :event="event"
    @click.native="eventClick(event.id)"
    :id="`event-${event.id}`"
    :style="styleObj"
    v-cloak
  ></component>
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
    eventId: String,
  },
  data() {
    return {
      currentView: "index",
    };
  },
  computed: {
    view() {
      return events.is(this.event.$type, this.currentView);
    },
    color() {
      return events.typeColorHSL(this.event.$type, 0);
    },
    styleObj() {
      return {
        "--color-h": this.color.h,
        "--color-s": this.color.s+'%',
        "--color-l": this.color.l+'%'
      };
    },
  },
  methods: {
    eventClick(id) {
      const path = `/events/${id}`;
      if (this.$route.path !== path) this.$router.push(path);
    },
  },
};
</script>
<style >
</style>