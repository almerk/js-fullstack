<template>
  <ul>
    <label :class="subject.$type">
      <input type="checkbox" v-model="isChecked" />
      <span>{{ subject.name }}</span>
      <badge v-if="subject.$type == 'group'">{{ selectedUsers }}</badge>
    </label>
    <ul v-if="this.children.length" class="inner">
      <li v-for="child in children" :key="child.id">
        <tree-item
          :subject="child"
          :users="users"
          :groups="groups"
          :selected="selected"
          @changed="emitChanged"
        ></tree-item>
      </li>
    </ul>
  </ul>
</template>

<script>
import badge from "../ui/badge.vue";
export default {
  components: { badge },
  name: "tree-item",
  props: {
    subject: Object,
    users: Array,
    groups: Array,
    selected: Array,
  },
  data() {
    return {};
  },
  computed: {
    children() {
      return this.getChildren(this.subject);
    },
    childUsers() {
      return this.allUsersIn(this.subject);
    },
    selectedUsers() {
      const children = this.getChildren;
      const selected = this.selected;
      const isSelected = (s) => selected.includes(s.id);
      const compute = (s) => {
        if (s.$type == "user") return isSelected(s) ? 1 : 0;
        if (isSelected(s)) return this.allUsersIn(s);
        return children(s)
          .map(compute)
          .reduce((x, y) => x + y);
      };
      return compute(this.subject);
    },
    isChecked: {
      get() {
        return this.selected.includes(this.subject.id);
      },
      set(value) {
        this.emitChanged(this.subject.id, value);
      },
    },
  },

  methods: {
    getChildren(subject) {
      return subject.$type == "user"
        ? []
        : this.users
            .filter((x) => x.groupId == subject.id)
            .concat(this.groups.filter((x) => x.parentId == subject.id));
    },
    emitChanged(id, value) {
      this.$emit("changed", id, value);
    },
    allUsersIn(subj) {
      const children = this.getChildren;
      const compute = (s) => {
        if (s.$type == "user") return 1;
        return children(s)
          .map(compute)
          .reduce((x, y) => x + y);
      };
      return compute(subj);
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
}
ul.inner {
  padding-left: 0.4em;
}
label {
  font-weight: initial;
  font-size: 1em;
  cursor: pointer;
}
label.group {
  font-weight: 600;
}
label.user {
  text-transform: none;
}
</style>