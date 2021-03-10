const SERVER_ADDR = `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`
export default {
    endpoints:{
        // 'todos':'https://jsonplaceholder.typicode.com/todos/',
        // 'users':'https://jsonplaceholder.typicode.com/users/',
        'subjects': `${SERVER_ADDR}/subjects`
    }
}
