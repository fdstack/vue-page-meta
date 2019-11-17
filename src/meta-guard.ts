import { defaultPageMeta, mapMetaTags } from './meta-factory';
import { RouterMeta } from './interfaces';
import { NavigationGuard } from 'vue-router';

export function metaGuard(defaultMeta: RouterMeta = defaultPageMeta): NavigationGuard {
  return (to, from, next) => {
    // Remove any stale meta tags
    Array.from(document.querySelectorAll('[data-vue-router-controlled]'))
      .map((el: Node) => el.parentNode ? el.parentNode.removeChild(el) : null);

    // Find nearest route with meta
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta !== undefined);

    let routerMeta: RouterMeta;
    // Use default meta if none found
    if (!nearestWithMeta) {
      routerMeta = defaultMeta;
    } else if (nearestWithMeta.meta instanceof Function) {
      routerMeta = nearestWithMeta.meta(to);
    } else {
      routerMeta = nearestWithMeta.meta;
    }
    // Use default title if not set
    document.title = routerMeta.title || defaultMeta.title;

    // create elements with the meta tags
    const tags = mapMetaTags(routerMeta.metaTags);

    // Add the tags
    for (const tag of tags) {
      document.head.appendChild(tag);
    }
    next();
  }
}
