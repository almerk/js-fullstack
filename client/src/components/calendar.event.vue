<template>
  <component
    :is="view"
    :event="event"
    @click.native="eventClick(event.id)"
    :id="`event-${this.event.id}`"
    :style="styleObj"
    :class="{ selected: selected }"
    v-cloak
  ></component>
</template>

<script>
import VueScrollTo from "vue-scrollto";
import user from "./user.vue";
import events from "./events/fabric.js";
export default {
  components: {
    user,
    ...events.all,
  },
  props: {
    eventId: String,
    selected: Boolean,
  },
  data() {
    return {
      currentView: "index",
    };
  },
  computed: {
    event() {
      return this.$store.getters.events.find((x) => x.id == this.eventId);
    },
    view() {
      return events.is(this.event.$type, this.currentView);
    },
    color() {
      return events.typeColorHSL(this.event.$type, 0);
    },
    styleObj() {
      return {
        "--color-h": this.color.h,
        "--color-s": this.color.s + "%",
        "--color-l": this.color.l + "%",
      };
    },
  },
  methods: {
    eventClick(id) {
      const path = `/events/${id}`;
      if (this.$route.path !== path) this.$router.push(path);
    },
  },
  updated() {
    if (this.selected) {
      VueScrollTo.scrollTo(`#event-${this.eventId}`, 500, {
        container: "#feed",
        duration: 2000,
      });
    }
  },
};
</script>
<style >
</style>