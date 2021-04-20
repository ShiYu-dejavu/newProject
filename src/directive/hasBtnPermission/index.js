import Vue from 'vue'
import store from '@/store'

const hasBtnPermission = Vue.directive('hasBtnPermission', {
  bind: function(el, binding, vnode) {
    const btnName = binding.value;
    const btnAuth = store.getters.set_btnAuth;
    if (btnAuth.indexOf(btnName) == -1) {
      if (!el.parentNode) {
        el.style.display = 'none';
      } else {
        el.parentNode.removeChild(el);
      }
    }
  }
})

export default hasBtnPermission