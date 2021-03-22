<template>
  <sup role="badge">
      <slot></slot>
  </sup>
</template>

<script>
export default {
    data(){
        return {
            
        }
    }
}
</script>

<style>
    [role=badge] {
        font-size: .55em;
        display: inline;
        background: rgba(255,255,255,.8);
        border-radius: 50%;
    }    
</style>