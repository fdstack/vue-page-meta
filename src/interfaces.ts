import { Route } from 'vue-router';
import { VueRouter } from 'vue-router/types/router';

export interface VuePageMetaOptions {
  router: VueRouter;
  defaultMeta?: RouterMeta;
}

export interface RouterMeta {
  title: string;
  metaTags?: MetaTagDefinition[];
}

export interface MetaTagDefinition {
  [key: string]: string;
}

export type MetaGeneratorFunction = (to: Route) => void;

export interface MetaFactoryOptions {
  title?: string;
  img?: string;
  keywords?: string;
  description?: string;
  metaTags?: MetaTagDefinition[];
  classes?: { [key: string]: string };
}
