import Vue from 'vue';
import herajsPlugin from '@herajs/vue-plugin';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

Vue.use(herajsPlugin, {
  deploymentInfoPath: '../../.aergo',
  chains: [
    {
      chainId: 'dev.chain',
      nodeUrl: 'http://127.0.0.1:7845',
    },
    {
      chainId: 'testnet.aergo.io',
      nodeUrl: 'https://testnet-api-http.aergo.io',
    },
    {
      chainId: 'aergo.io',
      nodeUrl: 'https://mainnet-api-http.aergo.io',
    },
  ],
});

Vue.directive('highlightjs', {
  deep: true,
  bind(el, binding) {
    const targets = el.querySelectorAll('code');
    targets.forEach((target) => {
      if (binding.value) {
        // eslint-disable-next-line no-param-reassign
        target.textContent = binding.value;
      }
      hljs.highlightBlock(target);
    });
  },
  componentUpdated(el, binding) {
    const targets = el.querySelectorAll('code');
    targets.forEach((target) => {
      if (binding.value) {
        // eslint-disable-next-line no-param-reassign
        target.textContent = binding.value;
        hljs.highlightBlock(target);
      }
    });
  },
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
