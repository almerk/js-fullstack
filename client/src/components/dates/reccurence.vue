<template>
  <div class="reccurence-date">
    <time>
      <template v-if="hasStartDate">
        From <simple :value="startDate"></simple>
      </template>
      {{ text }}</time
    >
  </div>
</template>

<script>
import simple from "./simple.vue";
import { RRule } from "rrule";
export default {
  props: {
    value: Object,
  },
  components: {
    simple,
  },
  data() {
    return {};
  },
  computed: {
    hasStartDate() {
      console.log(this.value.eventId);
      return this.rrule.origOptions.dtstart != undefined;
    },
    rrule() {
      return RRule.fromString(this.value.rrule);
    },
    text() {
      return this.rrule.toText();
    },
    startDate() {
      if (this.hasStartDate) {
        return {
          dateTime: this.rrule.origOptions.dtstart,
          hasTime: this.value.hasTime,
        };
      }
    },
  },
};
</script>

<style>
</style>