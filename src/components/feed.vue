<template>
    <div id="feed">
        <div v-for="todo in todos" :key="todo.id" :class="[{active:!todo.completed }, 'item', getSize(todo), getColor(todo)]">
            <a>{{ todo.title }}</a>
        </div>
    </div>    
</template>

<script>
export default {
    el:"#feed",
    props:{
        todos: Array
    },
    data(){
        return {
            sizes:["size-1", "size-2", "size-3"],
            colors:["color-1", "color-2", "color-3", "color-4", "color-5"]
        }
    },
    methods:{
        getSize(item) {
            return this.sizes[item.title.length % this.sizes.length];
        },
        getColor(item){
            return this.colors[item.title.length % this.colors.length];
        }
    }
}
</script>

<style scoped>
    #feed{
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
    }
    .item {
        --s: 2em;
        --c:black;
        height: var(--s);
        width: var(--s);
        overflow: hidden;
        border: 5px solid rgb(var(--c));
        border-image: linear-gradient(to right bottom,  rgb(var(--c)), rgb(var(--c), .2));
        border-image-slice: 1;
        margin:2px;
    }
    .item.size-1{
        --s:2em;
    }
    .item.size-2{
        --s:4em;
    }
    .item.size-3{
        --s:8em;
    }
    .item.color-1{
        --c: 192, 9, 9;
    }
    .item.color-2{
        --c:52, 158, 20;
    }
    .item.color-3{
        --c: 236, 221, 6;
    }
    .item.color-4{
        --c: 87, 87, 87;
    }
        .item a{
            text-overflow: ellipsis;
            word-wrap: none;
            overflow: hidden;
             -webkit-line-clamp: 1;
             display: block;
        }
</style>