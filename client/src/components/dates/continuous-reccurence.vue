<template>
  <div class="continuous-reccurence-date">
    <continuous :value="date"></continuous>&ensp;<time>{{ text }}</time>
  </div>
</template>

<script>
import continuous from "./continuous.vue";
import { RRule } from "rrule";
export default {
  props: {
    value: Object,
  },
  components: {
    continuous,
  },
  data() {
    return {};
  },
  computed: {
    rrule() {
      return RRule.fromString(this.value.rrule);
    },
    text() {
      return this.rrule.toText();
    },
    date() {
      return {
        start: this.value.start,
        end: this.value.end,
        hasTime: this.value.hasTime,
      };
    },
  },
};
</script>

<style>
.continuous-reccurence-date {
  display: flex;
  flex-direction: row;
  align-items: baseline;
}
</style>