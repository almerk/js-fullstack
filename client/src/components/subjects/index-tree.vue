<template>
  <div role="tree">
    <tree-item
      :subject="root"
      :groups="groups"
      :users="users"
      :selected="subjectIds"
      @changed="selectionChanged"
    ></tree-item>
  </div>
</template>

<script>
import treeItem from "./tree-item.vue";
export default {
  props: {
    relations: Array,
  },
  components: {
    treeItem,
  },
  data() {
    return {
      subjectIds: [],
    };
  },
  created(){
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
      this.inheritValue(id, value)
    },
    inheritValue(id, value) {
        this.children(id).forEach(x => this.selectionChanged(x, value));
    }
  },
};
</script>

<style>
div[role="tree"] {
  font-size: 12pt;
  overflow: auto;
}
</style>