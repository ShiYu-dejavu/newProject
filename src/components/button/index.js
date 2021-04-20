import './src/scss/index.scss'
import UButton from './src/button';

/* istanbul ignore next */
UButton.install = function(Vue) {
  Vue.component(UButton.name, UButton);
};

export default UButton;
