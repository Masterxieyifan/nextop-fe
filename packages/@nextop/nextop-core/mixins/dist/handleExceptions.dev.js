'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true,
});
exports.globalHandleException = void 0;
let globalHandleException = {
    methods: {
        globalHandleException: function globalHandleException(err) {
            this.$message.error(err);
        },
    },
};
exports.globalHandleException = globalHandleException;