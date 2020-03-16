// 加载数据
const addressData = require('china-area-data/v3/data');

import _ from 'lodash';

// 注册Vue组件
Vue.component('select-district', {
    // 定义组件到属性
    props: {
        // 初始化省市区的值，编辑时使用
        initValue: {
            type: Array, // 数组格式
            default: () => ([]), //默认空数组
        }
    },
    // 定义组件内数据
    data() {
        return {
            provinces: addressData['86'], //省列表
            cities: {}, // 城市列表
            districts: {}, // 地区列表
            provinceId: '', // 当前选中的省
            cityId: '', // 当前选中的市
            districtId: '', //当前选中的区
        };
    },
    // 定义观察器，对应属性变更时会触发对应的观察器函数
    watch: {
        // 当选择的省发生改变时触发
        provinceId(newVal) {
            if(!newVal){
                this.cities = {};
                this.cityId = '';
                return;
            }
            // 将城市列表设为当前省的城市
            this.cities = addressData[newVal];
            // 如果当前选中的城市不在当前省下，清空城市
            if(!this.cities[this.cityId]){
                this.cityId = '';
            }
        },
        // 当选择的市发生改变时触发
        cityId(newVal) {
            if(!newVal){
                this.districts = {};
                this.districtId = '';
                return;
            }
            // 将地区列表设为当前城市下的地区
            this.districts = addressData[newVal];
            // 如果当前选中的地区不在当前城市下，清空地区
            if(!this.districts[this.districtId]){
                this.districtId = '';
            }
        },
        // 当选择当区发生改变时触发
        districtId() {
            // 触发change事件，事件的值就是当前选择的省市区名称，数组格式
            this.$emit('change', this.provinces[this.provinceId], this.cities[this.cityId], this.districts[this.districtId]);
        },
    },
    // 初始化调用
    created() {
        this.setFormValue(this.initValue);
    },
    methods: {
        setFormValue(value) {
            // 过滤空值
            value = _.filter(value);
            // 如果数组长度为0，则将省清空
            if(value.length === 0){
                this.provinceId = '';
                return;
            }
            // 从当前省列表找到与数组第一个元素同名的项的索引
            const provinceId = _.findKey(this.provinces, o => o === value[0]);
            // 没找到则清空省的值
            if(!provinceId){
                this.provinceId = '';
                return;
            }
            // 找到则将省设置成对应的ID
            this.provinceId = provinceId;
            // 从当前城市列表找到与数组第二个元素同名的项的索引
            const cityId = _.findKey(addressData[provinceId], o => o === value[1]);
            // 没找到则清空城市的值
            if(!cityId){
                this.cityId = '';
                return;
            }
            // 找到则将当前城市设置成对应的ID
            this.cityId = cityId;
            // 从当前地区列表找到与数组第三个元素同名的项的索引
            const districtId = _.findKey(addressData[cityId], o => o === value[2]);
            // 没找到则清空地区的值
            if(!districtId){
                this.districtId = '';
                return;
            }
            // 找到则将当前地区设置成对应的ID
            this.districtId = districtId;
        }
    }
});