<template>
  <form id="toolbar" :class="{folded:folded}">
      <header>
        <label>
          <input type="checkbox" v-model="folded" />
           {{ header }}
        </label>
      </header>
      <slot></slot>
  </form>
</template>

<script>
export default {
  data() { 
    return {
      header: "📅Calendario",
      folded: true,
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
#toolbar {
  max-width: 12em;
}
#toolbar.folded {
  max-width: 1em;
}
#toolbar header {
  font-family: Arial, Helvetica, sans-serif;
  white-space: nowrap;
  overflow: hidden;
}
#toolbar header label{
  text-transform:none;
  font-size:1rem;
}
#toolbar fieldset {
  display: flex;
  flex-direction: column;
  margin: 0.5em 0;
  height: auto;
  min-width: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  border: none;
  flex-shrink: 0;
}
#toolbar label span,
#toolbar legend {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  position: relative;
  width: auto;
  max-width: 100%;
}
#toolbar fieldset legend {
  font-size: 0.7em;
}
#toolbar fieldset label {
  display: flex;
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
