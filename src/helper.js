function withoutRequired(props = {}, removeKeys = []) {
    return Object.keys(props).reduce((prev, curr) => {
        if (removeKeys.indexOf(props[curr]) !== -1) return prev;
        return {
            ...prev,
            [curr]: props.curr,
        };
    }, {});
}

module.exports = {
    withoutRequired,
};
