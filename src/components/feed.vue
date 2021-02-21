<template>
    <div id="feed">
        <calendar-event v-for="todo in todos" :key="todo.id" :todo-event="todo" :class="[{ active:!todo.completed}, {selected:todo.id == selectedEventId}, 'item', getColor(todo)]">
        </calendar-event>
    </div>    
</template>

<script>
import calendarEvent from './calendar.event.vue'
import VueScrollTo from 'vue-scrollto'
export default {
    props:{
        todos: Array,
        selectedEventId: String
    },
    components:{
        "calendar-event":calendarEvent
    },
    data(){
        return {
            colors:["color-1", "color-2", "color-3", "color-4"]
        }
    },
    methods:{
        getColor(item){
            return this.colors[item.title.length % this.colors.length];
        },
    },
    updated(){
        VueScrollTo.scrollTo(`#event-${this.selectedEventId}`, 500, { container:"#feed", duration:2000 })
    }
}
</script>

<style scoped>
    #feed{
        display: grid;
        grid-gap: .3em;
        grid-template-columns: repeat(auto-fit, minmax(2em, auto));
        grid-auto-rows: minmax(2em, 0);
        grid-auto-flow: row;
        height: 100%;
        width: 100%;
        overflow-y: auto;
    }
    .item {
        --s: auto;
        --c:0,0,0;

        overflow: hidden;
        border: 3px solid rgb(var(--c));
        margin:2px;
        position: relative;
    }
    .item:not(.active){
        border-image: linear-gradient(to right bottom,  rgb(var(--c),.65), rgb(var(--c), .15));
        border-image-slice: 1;
    }
    .item:not(.active)::before {
        content: '\2713';
        font-weight: bold;
        position: absolute;
        top: 0;
        z-index: -1;
        background: linear-gradient(to right bottom, rgb(var(--c),.65), rgb(var(--c), .15));
        background-clip: text;
        -webkit-text-fill-color: transparent;
        opacity: .5;
        font-size: var(--s);
    }
    .item.size-1{
        --s:2em;
    }
    .item.size-2{
        grid-column:span 2;
        grid-row: span 2;

    }
    .item.size-3{
        grid-column:span 3;
        grid-row: span 3;
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
    .item.selected{
        box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
        grid-column-start: 1;
        grid-column-end: -1;
        grid-row: span 10;
        overflow: initial;
        transition: 1s;  
    }

    .item a{
        text-overflow: ellipsis;
        word-wrap: none;
        overflow: hidden;
            -webkit-line-clamp: 1;
            display: block;
    }
</style>