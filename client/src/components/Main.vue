<template>
  <div id="main">
    <aside>
      <toolbar>
        <fieldset>
          <legend @click="showOrHideAllTypes()">Types</legend>
          <ul>
            <li v-for="type in types" :key="type.id">
              <label :style="styleObj(type.name)" class="type">
                <input
                  type="checkbox"
                  :value="type.id"
                  v-model="selectedTypeIds"
                />
                <span>{{ type.name }}</span>
                <badge>{{ calendarsOfType(type.id).length }}</badge>
              </label>
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend @click="showOrHideAllCalendars()">Calendars</legend>
          <ul>
            <li
              v-for="calendar in calendars"
              :key="calendar.id"
              :style="styleObj(getType(calendar.typeId).name)"
            >
              <label class="calendar">
                <input
                  type="checkbox"
                  :value="calendar.id"
                  v-model="selectedCalendarIds"
                  :disabled="!inArray(calendar.typeId, selectedTypeIds)"
                />
                <span>{{ calendar.name }}</span>
                <badge>{{ eventsOfCalendar(calendar.id).length }}</badge>
              </label>
            </li>
          </ul>
        </fieldset>
      </toolbar>
    </aside>
    <main>
      <feed
        :events="displayedEventIds"
        :selectedEventId="selectedEventId"
      ></feed>
      <div id="calendar"></div>
    </main>
  </div>
</template>

<script>
import toolbar from "../components/toolbar.vue";
import feed from "../components/feed.vue";
import badge from "../components/ui/badge";
import events from "../components/events/fabric.js";

export default {
  components: {
    toolbar,
    feed,
    badge,
  },
  data() {
    return {
      selectedEventId: this.$route.params.eventId,
      selectedTypeIds: [],
      selectedCalendarIds: [],
      displayedEventIds: [],
    };
  },
  methods: {
    inArray(value, array) {
      return array.includes(value);
    },
    showOrHideAllTypes() {
      this.selectedTypeIds = this.showOrHide(
        this.selectedTypeIds,
        this.types.map((x) => x.id)
      );
    },
    showOrHideAllCalendars() {
      const canBeDisplayed = this.calendars
        .filter((x) => this.selectedTypeIds.includes(x.typeId))
        .map((x) => x.id);
      this.selectedCalendarIds = this.showOrHide(
        this.selectedCalendarIds,
        canBeDisplayed
      );
    },
    showOrHide(current, full) {
      const notIn = full.filter((x) => !current.includes(x));
      return notIn.length == 0 ? [] : full;
    },
    calendarsOfType(id) {
      return this.calendars.filter((x) => x.typeId == id);
    },
    eventsOfCalendar(id) {
      return this.$store.getters.events.filter((x) => x.calendarId == id);
    },
    color(typeName) {
      return events.typeColorHSL(typeName.toLowerCase(), 0);
    },
    styleObj(typeName) {
      const color = this.color(typeName);
      return {
        "--color-h": color.h,
        "--color-s": color.s + "%",
        "--color-l": color.l + "%",
      };
    },
    getType(id) {
      return this.types.find((x) => x.id == id);
    },
  },
  computed: {
    types() {
      return this.$store.getters.types;
    },
    calendars() {
      return this.$store.getters.calendars;
    },
    events() {
      return this.$store.getters.events;
    },
  },
  watch: {
    $route() {
      this.selectedEventId = this.$route.params.eventId;
    },
    types(newTypes, oldTypes) {
      const added = newTypes.filter((x) => !oldTypes.some((y) => y.id == x.id));
      this.selectedTypeIds = this.selectedTypeIds.concat(
        added.map((x) => x.id)
      );
    },
    calendars(newValue, oldValue) {
      const added = newValue.filter((x) => !oldValue.some((y) => y.id == x.id));
      this.selectedCalendarIds = this.selectedCalendarIds.concat(
        added.map((x) => x.id)
      );
    },
    events(newValue, oldValue) {
      const addedEvents = newValue.filter((x) => !oldValue.includes(x));
      const removedEvents = oldValue.filter((x) => !newValue.includes(x));
      this.displayedEventIds.push(
        ...addedEvents
          .filter((e) => this.selectedCalendarIds.includes(e.calendarId))
          .map((e) => e.id)
      );
      removedEvents.forEach((ev) => {
        this.$delete(this.displayedEventIds, ev.id);
      });
    },
    selectedTypeIds(newValue, oldValue) {
      const addedTypes = newValue.filter((x) => !oldValue.includes(x));
      const canBeDisplayed = this.calendars
        .filter((x) => newValue.includes(x.typeId))
        .map((x) => x.id);
      const mustBeDisplayed = this.calendars
        .filter((x) => addedTypes.includes(x.typeId))
        .map((x) => x.id);
      this.selectedCalendarIds = [
        ...this.selectedCalendarIds.filter((x) => canBeDisplayed.includes(x)),
        ...mustBeDisplayed,
      ];
    },
    selectedCalendarIds(newValue, oldValue) {
      console.log(newValue, oldValue);
      const added = newValue.filter((x) => !oldValue.includes(x));
      const removed = oldValue.filter((x) => !newValue.includes(x));
      console.log('added',added);
      console.log('removed',removed);
      return;
      added.forEach((cId) => {
        const toAdd = this.eventsOfCalendar(cId).map((x) => x.id);
        // console.log('toAdd',toAdd)
        this.displayedEventIds.push(...toAdd);
      });
      removed.forEach((cId) => {
        const toDelete = this.eventsOfCalendar(cId).map((x) => x.id);
        console.log('toDelete',toAdd)
        toDelete.forEach((id) => this.$delete(this.displayedEventIds, id));
      });
    },
  },
};
</script>

<style>
#main {
  display: grid;
  grid-template-columns: minmax(auto, 25%) 1fr;
  grid-row: auto;
  column-gap: 0.5em;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
#main > * {
  overflow: auto;
  height: 100%;
}
#main label.type,
#main label.calendar {
  --hsl: var(--color-h), var(--color-s), var(--color-l);
}
#main label.type span,
#main label.calendar span {
  text-shadow: hsla(var(--hsl), 0.4) 0px 0px 1px,
    hsla(var(--hsl), 0.4) 0px 0px 1px;
}
#main label.type sup,
#main label.calendar sup {
  color: hsl(var(--hsl));
}
</style>  