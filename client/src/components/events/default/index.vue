<template>
  <article class="event-content">
    <header>
      <fieldset>
        <legend>Name</legend>
        <span>{{ event.name }}</span>
      </fieldset>
    </header>
    <main>
      <slot name="content"></slot>
      <fieldset>
        <legend>Description</legend>
        <textarea :value="event.description" readonly />
      </fieldset>
    </main>
    <aside>
      <section class="dates">
        <main>
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
        </main>
        <aside v-if="hasExceptDates">
          <fieldset>
            <legend>
              Except<badge>{{ exceptDates.length }}</badge>
            </legend>
            <ul>
              <li v-for="(date, index) in exceptDates" :key="index">
                <date :value="date"></date>
              </li>
            </ul>
          </fieldset>
        </aside>
      </section>
      <section>
        <fieldset>
          <legend>Users</legend>
          <subjectsTree :relations="relations" :viewOnly="true"></subjectsTree>
        </fieldset>
      </section>
    </aside>
  </article>
</template>

<script>
import date from "../../dates/base.vue";
import badge from "../../ui/badge.vue";
import subjectsTree from "../../subjects/index-tree.vue";

export default {
  components: {
    date,
    badge,
    subjectsTree,
  },
  props: {
    event: Object,
  },
  data() {
    return {};
  },
  computed: {
    dates() {
      return this.event.dates.filter((x) => !x.isExcept);
    },
    exceptDates() {
      return this.event.dates.filter((x) => x.isExcept);
    },
    hasExceptDates() {
      return this.exceptDates.length > 0;
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
  --hsl: var(--color-h), var(--color-s), var(--color-l);
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 2px solid hsl(var(--hsl));
  margin: 2px;
  position: relative;
  display: flex;
  flex-direction: column;
  transition: 0.5s;
}
.event-content:not(.selected) aside {
  display: none;
}
.event-content:not(.selected) > *:not(header) {
  display: none;
}
.event-content:not(.selected) header {
  font-size: 0.7em;
  letter-spacing: 0px;
  font-weight: 100;
  line-height: 1em;
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
.event-content > header {
  position: sticky;
  top: 0;
  background: rgb(255, 255, 255, 0.7);
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
.event-content:not(.selected):hover {
  box-shadow: hsla(var(--hsl), 0.7) 1px 1px 2px 1px,
    hsla(var(--hsl), 0.7) -1px -1px 2px 1px;
}
.event-content.selected {
  box-shadow: hsla(var(--hsl), 0.6) 3px 3px 4px 2px,
    hsla(var(--hsl), 0.56) -3px -3px 4px 2px;
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
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 0.3em;
}

.dates ul {
  list-style: none;
}
.dates {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 1em;
}
.dates > * {
  width: auto;
}
.dates time {
  font-size: 0.9em;
}
</style>