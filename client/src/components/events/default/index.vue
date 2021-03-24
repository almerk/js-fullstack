<template>
  <article class="event-content">
    <main>
      <fieldset>
        <legend>Name</legend>
        <header>{{ event.name }}</header>
      </fieldset>
      <slot name="content"></slot>
      <fieldset>
        <legend>Description</legend>
        <textarea :value="event.description" readonly />
      </fieldset>
    </main>
    <aside>
      <section class="dates">
        <fieldset>
          <legend>
            Dates<badge>{{ dates.length }}</badge>
          </legend>
          <ul>
            <li v-for="(date, index) in dates" :key="index">
              <date :value="date"></date>
            </li>
          </ul>
        </fieldset>
      </section>
      <section>
        <fieldset><legend>Users</legend></fieldset>
      </section>
    </aside>
  </article>
</template>

<script>
import date from "../../dates/base.vue";
import badge from "../../ui/badge.vue";

export default {
  components: {
    date,
    badge,
  },
  props: {
    event: Object,
  },
  data() {
    return {};
  },
  computed: {
    dates() {
      return this.$store.getters.dates.filter(
        (x) => x.eventId == this.event.id
      );
    },
    relations() {
      return this.$store.getters.relations.filter(
        (x) => x.objectId == this.event.id
      );
    },
  },
  created() {},
};
</script>

<style>
.event-content {
  width: 100%;
  height: 100%;
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
.event-content.selected {
  overflow: auto;
}
.event-content fieldset {
  border: none;
  display: flex;
  flex-direction: column;
  margin: 0.4em 0;
}
.event-content.selected fieldset:first-child {
  margin-top: 0;
}
.event-content.selected fieldset > :not(legend) {
  margin: 0 0.2em;
}
.event-content legend {
  font-size: 0.6em;
  text-transform: uppercase;
  margin: 0;
  font-weight: 700;
}

.event-content.selected legend {
  text-indent: 0;
  margin: 0;
}
.event-content:not(.selected) legend {
  display: none;
}
.event-content.selected {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}
.event-content textarea {
  outline: none;
  resize: none;
  overflow: auto;
  font-family: inherit;
  height: auto;
  min-height: 5em;
  max-height: 10em;
}
.event-content > aside {
  font-size: 0.95em;
}
.dates time{
    font-size: .9em;
}
</style>