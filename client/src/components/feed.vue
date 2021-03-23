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
}
.item {
  --s: auto;
  --c: 0, 0, 0;
  overflow: hidden;
  border: 3px solid rgb(var(--c));
  margin: 2px;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: 0.5s;
}
.item.selected label {
  text-indent: 0;
  color: rgb(var(--c));
}
.item.selected > * {
  text-indent: 0.5em;
}
.item.selected {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  grid-column-start: 1;
  grid-column-end: -1;
  grid-row: span 10;
  overflow: initial;
  transition: 0s;
}
.item:not(.selected) > * {
  /* display: none; */
}
.item:not(.selected) > header {
  display: block;
}
</style>