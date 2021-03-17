<template>
    <div  @click="eventClick(event.id)" :id="`event-${event.id}`">
        <label>Name</label> 
        <header>{{ event.name }}</header>
        <!-- <label>User</label> -->
        <!-- <user :id="event.userId"></user> -->
        <span>
            <!-- <label v-if="event.completed">Completed</label>
            <label v-else>Not completed</label> -->
        </span>

    </div>
</template>

<script>
import user from './user.vue'
export default {
    components:{
        user
    },
    props: {
        'event': Object
    },
    data() {
        return {
             sizes: ["size-1", "size-2", "size-3"]
        }
    },
    methods: {
        getSize(item) {
            return this.sizes[item.name.length % this.sizes.length];
        },
        eventClick(id){
            this.$router.push({ path:`/events/${id}`});
        }
    }
}
</script>

<style >
</style>