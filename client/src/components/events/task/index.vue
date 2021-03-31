<template>
  <default-index :event="event" :class="['task-event', statusClass]">
    <template v-slot:content>
      <fieldset>
        <legend>Status</legend>
        <span>{{ event.status }}</span>
      </fieldset>
    </template>
  </default-index>
</template>

<script>
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
    statusClass() {
      const classes = {
        'completed': "complete",
        'in process': "processing",
        'created': "creating",
      };
      return classes[this.event.status];
    },
  },
};
</script>

<style>
.task-event {
  --content: "...";
  grid-row: span 3;
  grid-column: span 3;
}
.task-event.complete{
    --content: "✔";
    --color-s : 40%  !important;
}
.task-event.processing{
    --content: "∼";
}
.task-event.creating{
    --content:"◯"
}
.task-event:not(.selected)::after {
  top: 50%;
  left: 50%;
  content: var(--content);
  position: absolute;
  z-index: 1;
  color: hsla(var(--hsl), .4);
  transform: translate(-50%, -50%);
  font-size: 2em;
}
.task-event:not(.selected):hover::after {
  color: hsla(var(--hsl), .8);
}
</style>