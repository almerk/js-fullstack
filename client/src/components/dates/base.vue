<template>
    <component :is="value.$type" :value="value"/>
</template>

<script>
import simpleDate from './simple.vue'
import continuousDate from './continuous.vue'
import reccurenceDate from './reccurence.vue'
import continuousReccurenceDate from './continuous-reccurence.vue'
export default {
    components:{
        simpleDate,
        continuousDate,
        reccurenceDate,
        continuousReccurenceDate
    },
    props:{
        value:Object
    },
    data(){
        return {

        }
    },
    created(){
    }
}
</script>

<style>

</style>