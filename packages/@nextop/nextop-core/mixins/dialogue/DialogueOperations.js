// handle some normal operations of dialogue
export const DialogueOperations = {
    methods: {
        open() {
            if (this.$refs.modal) {
                this.$refs.modal.open();
            }
            if (this.opened) {
                this.opened();
            }
        },
        handleModalClose() {
            this.$emit('close');
            this._resetData();
        },
        close() {
            if (this.$refs.modal) {
                this.$refs.modal.close();
            }
            this._resetData();
        },
        _resetData() {
            if (this.$refs.form) {
                this.$refs.form.resetFields();
            }
            if (this._clearExtraData) {
                this._clearExtraData();
            }
        },
    },
};
