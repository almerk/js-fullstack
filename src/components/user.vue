<template>
    <a :title="user.username">{{user.name}}</a>
</template>

<script>
export default {
    props: [
        'id'
    ],
    data() {
        return {}
    },
    computed: {
        user() {
            return this.getUser(this.id);
        },
        users(){
            return this.$store.state.users!=null ? this.$store.state.users:[]
        }  
    },
    methods: {
        getUser(id) {
            return this.users.find(x => x.id == this.id);
        }
    }
}
</script>

<style>

</style>