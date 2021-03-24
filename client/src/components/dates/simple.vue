<template>
  <time :datetime="date(attrFormat)">
    {{ date(displayFormat) }}
  </time>
</template>

<script>
import dateAndTime from "date-and-time";
export default {
  props: {
    value: Object,
  },
  data() {
    return {};
  },
  computed: {
    displayFormat() {
      return this.value.hasTime ? "DD.MM.YYYY HH:mm" : "DD.MM.YYYY";
    },
    attrFormat() {
      return this.value.hasTime ? "YYYY-MM-DD HH:mm" : "YYYY-MM-DD";
    },
  },
  methods: {
    date(format) {
      return dateAndTime.format(new Date(this.value.dateTime), format);
    },
  },
};
</script>

<style>
</style>