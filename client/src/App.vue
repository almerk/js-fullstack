<template>
  <router-view></router-view>
</template>
<script>
export default {
  created() {
    this.$store.commit("initialize");
    this.$store.commit("occurencies/retrieve");
  },
  data() {
    return {};
  },
};
</script>
<style>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
:root {
  font-size: 16pt;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
html,
body {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
label {
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.65em;
  text-indent: 0;
}
</style>
