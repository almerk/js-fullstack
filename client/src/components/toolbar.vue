<template>
  <form id="toolbar">
    <header>
      {{ header }}
    </header>
    <slot></slot>
  </form>
</template>

<script>
export default {
  data() {
    return {
      header: "📅 Calendario",
    };
  },
};
</script>

<style>
#toolbar {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
#toolbar header {
  font-family: Arial, Helvetica, sans-serif;
}
#toolbar fieldset {
  display: flex;
  flex-direction: column;
  margin: 0.5em 0;
  height: auto;
  min-width: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  border:none;
}
#toolbar label,
#toolbar legend {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
#toolbar fieldset legend {
  margin-bottom: 0.25em;
}
#toolbar input ~ span {
  font-weight: 500;
}
#toolbar input:checked ~ span {
  font-weight: 700;
}
#toolbar input:disabled ~ span {
  opacity: 0.6;
  cursor: auto;
}
#toolbar input[type="checkbox"] {
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
