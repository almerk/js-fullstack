<template>
  <div role="tree" :class="{ view: viewOnly }">
    <tree-item
      :subject="root"
      :groups="groups"
      :users="users"
      :selected="subjectIds"
      :view-only="viewOnly"
      :roles="roles"
      @changed="selectionChanged"
    ></tree-item>
  </div>
</template>

<script>
import treeItem from "./tree-item.vue";
export default {
  props: {
    relations: Array,
    viewOnly: Boolean,
  },
  components: {
    treeItem,
  },
  data() {
    return {
      subjectIds: [],
    };
  },
  created() {
    this.subjectIds = this.relations.map((x) => x.subjectId);
  },
  computed: {
    groups() {
      return this.$store.getters.groups;
    },
    users() {
      return this.$store.getters.users;
    },
    root() {
      return this.groups.find((x) => !x.parentId);
    },
    roles() {
      return this.relations.map((x) => ({
        subjectId: x.subjectId,
        access: { read: x.canRead, update: x.canUpdate, delete: x.canDelete },
        other: x.characteristics,
      }));
    },
  },
  methods: {
    children(id) {
      return this.groups
        .filter((x) => x.parentId == id)
        .concat(this.users.filter((x) => x.groupId == id))
        .map((x) => x.id);
    },
    selectionChanged(id, value) {
      const index = this.subjectIds.indexOf(id);
      if (value) {
        if (index < 0) this.subjectIds.push(id);
      } else {
        if (index > -1) this.$delete(this.subjectIds, index);
      }
      this.inheritValue(id, value);
    },
    inheritValue(id, value) {
      this.children(id).forEach((x) => this.selectionChanged(x, value));
    },
  },
};
</script>

<style>
div[role="tree"] {
  font-size: 12pt;
  overflow: auto;
  max-width: 100%;
}
div[role="tree"] ul.group:hover {
  box-shadow: inset 1px 0 0 0 black;
}
div[role="tree"].view .indeterminate {
  display: block;
  font-size: 0.8em;
  opacity: 0.7;
}
div[role="tree"].view .indeterminate sup {
  font-weight: 900;
  font-size: 1em;
}
div[role="tree"].view .collapsed.group {
  display: flex;
  flex-direction: row;
  align-items: baseline;
}
div[role="tree"].view .collapsed.group > * {
  display: block;
}
div[role="tree"].view .collapsed.group > .indeterminate {
  max-width: 25%;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  overflow: hidden;
  -webkit-box-orient: vertical;
  position: relative;
  padding-right:.5em;
}
div[role="tree"].view .collapsed.group > .indeterminate [role=badge]{
    visibility: hidden;
}
div[role="tree"].view .collapsed.group > .indeterminate::after {
  position: absolute;
  content: " > ";
  z-index: 1;
  font-weight: 700;
  right: 0;
  top: 0;
}
div[role="tree"] .collapsed.group > ul {
  flex-grow: 1;
}
</style>