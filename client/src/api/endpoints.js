const SERVER_ADDR = `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`
export default {
    common:{
        subjects: `${SERVER_ADDR}/subjects`,
        objects:`${SERVER_ADDR}/objects`,
        dates:`${SERVER_ADDR}/dates`,
        relations:`${SERVER_ADDR}/relations`
    }
}
