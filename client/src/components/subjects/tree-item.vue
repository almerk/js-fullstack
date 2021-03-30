<template>
  <ul
    v-if="showCase"
    :class="[{ collapsed: selectedUsers == 1 }, subject.$type]"
  >
    <label :class="[{ indeterminate: containsSelected }]">
      <input
        type="checkbox"
        v-model="isChecked"
        :indeterminate="containsSelected"
        :disabled="viewOnly"
      />
      <span>{{ subject.name }}</span>
      <badge v-if="subject.$type == 'group'">{{ selectedUsers }}</badge>
      <span v-if="viewOnly && currentRoles">
        <span
          v-for="(role, i) in currentRoles.other"
          :key="i"
          class="role"
          :title="role"
        >
          {{ getRoleView(role) }}
        </span>
      </span>
    </label>
    <ul v-if="this.children.length" class="inner">
      <li v-for="child in children" :key="child.id">
        <tree-item
          :subject="child"
          :users="users"
          :groups="groups"
          :selected="selected"
          :view-only="viewOnly"
          :roles="roles"
          @changed="emitChanged"
        ></tree-item>
      </li>
    </ul>
  </ul>
</template>

<script>
import badge from "../ui/badge.vue";
const roles = {
  acceptor: "👌",
  perfomer: "✍️",
  owner: "🔑",
};
export default {
  components: { badge },
  name: "tree-item",
  props: {
    subject: Object,
    users: Array,
    groups: Array,
    selected: Array,
    viewOnly: Boolean,
    roles: Array,
  },
  data() {
    return {};
  },
  computed: {
    showCase() {
      if (!this.viewOnly) return true;
      if (this.isChecked) return true;
      if (this.containsSelected) return true;
      return false;
    },
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
    containsSelected() {
      if (this.isChecked) return false;
      if (this.subject.$type == "user") return false;

      const compute = (s) => {
        if (s.$type == "user") return [s.id];
        return this.getChildren(s)
          .map((x) => compute(x))
          .reduce((x, y) => x.concat(y), []);
      };
      const allUsersIds = compute(this.subject).reduce(
        (x, y) => x.concat(y),
        []
      );
      return allUsersIds.some((x) => this.selected.includes(x));
    },
    currentRoles() {
      return this.roles.find((x) => x.subjectId == this.subject.id);
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
    getRoleView(role) {
      return roles[role] || role;
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
  font-weight: 100;
  font-size: 1em;
  cursor: pointer;
  text-transform: none;
}
ul.group > label {
  text-transform: uppercase;
}
input:checked ~ span {
  font-weight: 600;
}
input[indeterminate] ~ span {
  font-weight: 400;
}
input[type="checkbox"] {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  white-space: nowrap;
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
}
</style>