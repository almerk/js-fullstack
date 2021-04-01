<template>
  <default-index :event="event" class="anniversary-event">
    <template v-slot:content v-if="event.date">
      <fieldset>
        <legend>Happened</legend>
        <time>{{ date }}
          <small v-if="yearsCount > 0"
          ><label>In current year:</label>
          <span>{{ yearsCount }}</span></small>
        </time>
      </fieldset>
    </template>
  </default-index>
</template>

<script>
import dateAndTime from "date-and-time";
import defaultIndex from "../default/index.vue";
export default {
  components: {
    defaultIndex,
  },
  props: { event: Object },
  data() {
    return {};
  },
  computed: {
    date() {
      if (this.event.date)
        return dateAndTime.format(new Date(this.event.date), "DD.MM.YYYY");
    },
    yearsCount() {
      if (this.event.date) return new Date().getFullYear() - new Date(this.event.date).getFullYear();
    },
  },
};
</script>

<style>

</style>