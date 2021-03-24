const KEY_FORMAT = (pref, current) => `${pref}-${current}`

module.exports = {
    all: getAllFromGlobal(),//should be appended to vue components section
    is(calendarType, viewType) {//dynamic component name retrieving in v-bind:is attr
        const type = calendarType.replace("Event",'');
        if (components[type]) return KEY_FORMAT(type, viewType);
        console.error(`Undefined event component type: ${type}`);
        return KEY_FORMAT("default", viewType);
    }
}

//TODO: Retrieving component by url
function byType(type) {
    const _ = components.default;
    if (!(_.create && _.index && _.update && _.delete))
        throw new Error("Default event components are not defined");
    const ofType = components[type] || _
    return { // This is default value
        create: getComponent((ofType.create || _.create).path),
        index: getComponent((ofType.index || _.index).path),
        update: getComponent((ofType.update || _.update).path),
        delete: getComponent((ofType.delete || _.delete).path),
    }
};

function getAllFromGlobal() {
    const res = {};
    Object.keys(components).forEach(key => {
        Object.assign(res, appendPrefixToProps(byType(key), key))
    });
    return res;
}
function getComponent(path) {
    return (resolve) => ({
        component: require([`${path}`], resolve),
        loading: require('./common/loading.vue'),
        error: require('./common/error.vue'),
    });
}


function appendPrefixToProps(object, prefix) {
    const res = {};
    Object.keys(object).forEach(key => {
        res[KEY_FORMAT(prefix, key)] = object[key];
    });
    return res;
}