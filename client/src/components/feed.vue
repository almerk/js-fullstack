<template>
  <div id="feed">
    <!-- <test-component/> -->
    <calendar-event
      v-for="event in events"
      :key="event.id"
      v-show="event.isDisplayed"
      :event="event"
      :class="[{ selected: event.id == selectedEventId }, 'item']">
    </calendar-event>
  </div>
</template>

<script>
import calendarEvent from "./calendar.event.vue";
import VueScrollTo from "vue-scrollto";


export default {
  props: {
    events: Array,
    selectedEventId: String,
  },
  components: {
    "calendar-event": calendarEvent,

  },
  data() {
    return { };
  },
  methods: {
  },
  updated() {
    if(this.selectedEventId)
      VueScrollTo.scrollTo(`#event-${this.selectedEventId}`, 500, {
        container: "#feed",
        duration: 2000,
      });
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
</style>