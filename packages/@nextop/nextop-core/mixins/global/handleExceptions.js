import axios from 'axios';

export const globalHandleException = {
    methods: {
        globalHandleException(err) {
            if (axios.isCancel(err)) {
                return;
            }
            // eslint-disable-next-line no-console
            console.error(`[Vantop Error]: global handle exception caught error: ${err.msg || err}`);
            this.$message.error(err);
        },
    },
};
