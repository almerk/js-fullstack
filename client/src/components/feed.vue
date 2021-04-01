<template>
  <div id="feed">
    <h6 class="date-label"
      >#no date<badge>{{ noDateEventIds.length }}</badge></h6
    >
    <template v-for="eventId in noDateEventIds">
      <calendar-event
        :key="eventId"
        :eventId="eventId"
        :class="[{ selected: event.id == selectedEventId }]"
      >
      </calendar-event>
    </template>
  </div>
</template>

<script>
import calendarEvent from "./calendar.event.vue";
import VueScrollTo from "vue-scrollto";
import Badge from "./ui/badge.vue";

export default {
  props: {
    displayedEventIds: Array,
    selectedEventId: String,
  },
  components: {
    "calendar-event": calendarEvent,
    Badge,
  },
  data() {
    return {
      noDateEventIds: [],

    };
  },
  computed: {
    occurencies() {
      return this.$store.getters["occurencies/values"];
    },
  },
  methods: {
    removeFrom(array, ev) {
      const index = array.findIndex((x) => x.objectId == ev.id);
      if (index >= 0) this.$delete(array, index);
    }
  },
  updated() {
    if (this.selectedEventId)
      VueScrollTo.scrollTo(`#event-${this.selectedEventId}`, 500, {
        container: "#feed",
        duration: 2000,
      });
  },
  watch: {
    displayedEventIds(newValue, oldValue) {
      console.log(newValue,'!!!',oldValue)

    }
  },
};
</script>

<style>
#feed {
  display: grid;
  grid-gap: 0.3em;
  grid-template-columns: repeat(auto-fit, minmax(2em, auto));
  grid-auto-rows: minmax(2em, 0);
  grid-auto-flow: row;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  padding: 0.4em;
}
#feed .selected {
  grid-column-start: 1;
  grid-column-end: -1;
  grid-row: span 12;
}
#feed .date-label {
  text-transform: lowercase;
  grid-column-start: 1;
  grid-column: span 2;
}
</style>