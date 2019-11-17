import { Vue as _Vue } from 'vue/types/vue'
import { VuePageMetaOptions } from './interfaces';
import { metaGuard } from './meta-guard';

let installed = false;
function install(Vue: typeof _Vue, options: VuePageMetaOptions) {
  if (installed) return;
  installed = true;
  // Register Guard
  options.router.beforeEach(metaGuard(options.defaultMeta));
}

const plugin = {
  install,
};

let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  // @ts-ignore
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

export default plugin;
export * from './interfaces';
export * from './meta-factory';
export * from './meta-guard';
