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
        path:'/events/:id',
        name:'event',
        component: Main,
        params: true
    },
    {
        path:'*',
        component:NotFound
    }
]
