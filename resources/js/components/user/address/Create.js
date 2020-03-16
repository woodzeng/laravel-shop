Vue.component('user-address-create', {
    data() {
        return {
            province: '',
            city: '',
            district: '',
        }
    },
    methods: {
        // 把选择的省市区数据保存到组件中
        onDistrictChanged(val) {
            if(val.length === 3){
                this.province = val[0];
                this.city = val[1];
                this.district = val[2];
            }
        }
    }
});