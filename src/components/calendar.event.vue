<template>
    <div :class="[getSize(todoEvent)]" @click="eventClick(todoEvent.id)" :id="`event-${todoEvent.id}`">
        <label>Name</label> 
        <header>{{ todoEvent.title }}</header>
        <label>User</label>
        <user :id="todoEvent.userId"></user>
        <span>
            <label v-if="todoEvent.completed">Completed</label>
            <label v-else>Not completed</label>
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
        'todo-event': Object
    },
    data() {
        return {
             sizes: ["size-1", "size-2", "size-3"]
        }
    },
    methods: {
        getSize(item) {
            return this.sizes[item.title.length % this.sizes.length];
        },
        eventClick(id){
            this.$router.push({ path:`/events/${id}`});
        }
    }
}
</script>

<style >
</style>