<template>
    <div :class="[getSize(todoEvent)]" @click="eventClick(todoEvent.id)" :id="`event-${todoEvent.id}`">
        <header>{{ todoEvent.title }}</header>
        <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
            Quam, explicabo itaque. Ducimus deserunt beatae dolores maxime aspernatur corporis voluptas aliquid sequi iusto dolore culpa omnis provident magnam, numquam, commodi totam?
        </div>
    </div>
</template>

<script>
export default {
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
            this.$router.push({ path:`/event/${id}`});
        }
    }
}
</script>

<style scoped>
</style>