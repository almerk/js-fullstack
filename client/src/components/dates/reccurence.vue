<template>
  <ul class="reccurence-date">
      <li v-for="(rrule, i) in value.rrules" :key="i">{{transform(rrule)}}</li>
  </ul>
</template>

<script>
import { RRule, RRuleSet, rrulestr } from 'rrule';
export default {
    props:{
        value: Object
    },
    data(){ return{} },
    methods:{
        transform(rrule){
            const rule = RRule.fromString()
            return rule.toText((t)=>{console.log(t)});
        }
    },
    created(){}
    

}
</script>

<style>

</style>