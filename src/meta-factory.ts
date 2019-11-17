import { MetaTagDefinition, MetaFactoryOptions, RouterMeta } from './interfaces';

export const defaultPageMeta = pageMetaFactory();

export function pageMetaFactory(args: MetaFactoryOptions = {}): RouterMeta {
  let options = {
    title: 'Vue Page Meta',
    img: '',
    keywords: 'vue-router, seo, page title, page meta',
    description: 'Handle dynamic page titles and meta with the vue router',
    metaTags: [] as MetaTagDefinition[],
  };
  options = { ...options, ...args };

  return {
    title: options.title,
    metaTags: options.metaTags,
  };
}

export function metaTagFactory(name: string, content: string): MetaTagDefinition {
  return {
    name,
    content,
  };
}

export function mapMetaTags(tags: MetaTagDefinition[]): HTMLElement[] {
  return tags.map((tagDef: MetaTagDefinition) => {
    const tag = document.createElement('meta');
    const keys = Object.keys(tagDef);
    for (const key of keys) {
      tag.setAttribute(key, tagDef[key]);
    }
    // add tag for tracking.
    tag.setAttribute('data-vue-router-controlled', '');
    return tag;
  });
}
