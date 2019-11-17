# @fdstack/vue-page-meta
Navigation guard for the vue-router that handles setting the page title 
and meta on route change.In addition to the guard, some convenient factory 
functions are provided for quick and succinct page meta definition.

## Installation
`npm i -S @fdstack/vue-page-meta`

## Usage
To get started, we will need to register the navigation guard as a global 
before guard. Use either one of the two outlined methods below. After that,
every time you define a route, simply add a meta key with either a `RouterMeta`
definition or a function that returns one. 

#### Register using Vue.use
```typescript
import Vue from 'vue';
import VuePageMeta from 'vue-page-meta';
import { router } from './router';

Vue.use(VuePageMeta, { router });
...
```
#### Register using vue-router
```typescript
import VueRouter from 'vue-router';
import { routes } from './routes';
import { metaGuard }  from 'vue-page-meta';

const router = new VueRouter({
  mode: 'history',
  routes,
});
// The metaGuard function can optionally take a RouterMeta argument to set the default meta
router.beforeEach(metaGuard());
...
```

#### Declare Route
```typescript
import {Route, RouteConfig } from 'vue-router';
import { pageMetaFactory } from 'vue-page-meta';

export const routes: RouteConfig[] = [
  // Use Default Page Meta
  {
    path: '/',
    name: 'home',
    component: () => import('./app-home.vue'),
    meta: pageMetaFactory(),
  },
  // Or override some defaults
  {
    path: '/about',
    name: 'about',
    component: () => import('./app-about.vue'),
    meta: pageMetaFactory({ title: 'About Page', description: 'All about this page' }),
  },
  // A function that receives the route being navigated to also works
  {
    path: '/account/:user',
    name: 'Services',
    component: () => import('./app-services.vue'),
    meta: (to: Route) => pageMetaFactory({ title: `${to.params.user}'s Account` }),
  },
];
```

#### Set Default Meta at Registration (optional but recommended)
```typescript
import Vue from 'vue';
import VuePageMeta, { RouterMeta, metaTagFactory } from 'vue-page-meta';
import { router } from './router';

const title = 'App Title';
const description = 'App description.';
const defaultMeta: RouterMeta = {
  title,
  metaTags: [
    metaTagFactory('og:title', title),
    metaTagFactory('og:description', description),
    metaTagFactory('og:image', require('./some/img.png')),
    metaTagFactory('keywords', 'some, app keywords'),
    metaTagFactory('description', description),
  ]
};

Vue.use(VuePageMeta, { router, defaultMeta });
```





