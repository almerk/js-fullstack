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
        path:'/event/:id',
        name:'event',
        component: Main,
        params: true
    },
    {
        path:'*',
        component:NotFound
    }
]
