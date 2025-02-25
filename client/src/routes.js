import Main from './components/Main.vue'
const NotFound = { template: '<p>Page not found</p>' }
export default
[
    {
        path:'/',
        name:'default',
        component: Main
    },
    {
        path:'/events',
        name:'default with events',
        component: Main
    },
    {
        path:'/events/:eventId',
        name:'event',
        component: Main,
        params: true
    },
    {
        path:'/users/:userName',
        name:'user',
        component: Main,
        params: true
    },
    {
        path:'/users/:userName/events/:eventId',
        name:'user-events',
        component: Main,
        params: true
    },
    {
        path:'*',
        component:NotFound
    }
]
