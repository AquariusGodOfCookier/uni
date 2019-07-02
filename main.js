import Vue from 'vue'
import App from './App'
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom', cuCustom)
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
Vue.prototype.globalIslogin = function() {
	try {
		var id = uni.getStorageSync('id');
		if(id==''){
			return false;
		}else{
			return id
		}
	} catch (e) {
		//TODO handle the exception
		console.log(e)
		return 'error'
		}
}
app.$mount()
