export const tablePagination = {
    data() {
        return {
            page: {
                size: 20,
                currentPage: 1,
                total: 0,
                sizes: [20, 50, 100, 200],
                layout: 'total, sizes, prev, pager, next, jumper',
            },
        };
    },
    methods: {
        handleSizeChange(size) {
            this.page.currentPage = Math.ceil(this.page.size * this.page.currentPage / size);
            this.page.size = size;
            if (this.load) {
                this.load();
            }
        },
        handleCurrentChange(current) {
            this.page.currentPage = current;
            if (this.load) {
                this.load();
            }
        },
    },
};