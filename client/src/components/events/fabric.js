
function getComponent(path) {
    return (resolve) => require([`${path}`], resolve);
}

//TODO: Retrieving component by url

module.exports = function (type) {
    if (!(components.default.create && components.default.index && components.default.update && components.default.delete))
        throw new Error("Default event components are not defined");
    const _ = { // This is default value
        create: getComponent(components.default.create.path),
        index: getComponent(components.default.index.path),
        update: getComponent(components.default.update.path),
        delete: getComponent(components.default.delete.path),
    }
    const ofType = components[type] || _
    return _;
};