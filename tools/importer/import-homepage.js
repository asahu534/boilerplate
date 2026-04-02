/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroLifestyleParser from './parsers/hero-lifestyle.js';
import columnsArticleParser from './parsers/columns-article.js';
import cardsGalleryParser from './parsers/cards-gallery.js';
import tabsTestimonialParser from './parsers/tabs-testimonial.js';
import cardsArticleParser from './parsers/cards-article.js';
import columnsFaqParser from './parsers/columns-faq.js';
import heroBannerParser from './parsers/hero-banner.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/trendsetters-cleanup.js';
import sectionsTransformer from './transformers/trendsetters-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-lifestyle': heroLifestyleParser,
  'columns-article': columnsArticleParser,
  'cards-gallery': cardsGalleryParser,
  'tabs-testimonial': tabsTestimonialParser,
  'cards-article': cardsArticleParser,
  'columns-faq': columnsFaqParser,
  'hero-banner': heroBannerParser,
};

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Homepage template for WKND Trendsetters site',
  urls: [
    'https://wknd-trendsetters.site/',
  ],
  blocks: [
    {
      name: 'hero-lifestyle',
      instances: ['header.section.secondary-section'],
    },
    {
      name: 'columns-article',
      instances: ['section:nth-of-type(1) .grid-layout.grid-gap-lg'],
    },
    {
      name: 'cards-gallery',
      instances: ['section:nth-of-type(2) .grid-layout.desktop-4-column.grid-gap-sm'],
    },
    {
      name: 'tabs-testimonial',
      instances: ['section:nth-of-type(3) .tabs-wrapper'],
    },
    {
      name: 'cards-article',
      instances: ['section:nth-of-type(4) .grid-layout.desktop-4-column.grid-gap-md'],
    },
    {
      name: 'columns-faq',
      instances: ['section:nth-of-type(5) .grid-layout.grid-gap-xxl'],
    },
    {
      name: 'hero-banner',
      instances: ['section.inverse-section .grid-layout.desktop-1-column'],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero',
      selector: 'header.section.secondary-section',
      style: 'secondary',
      blocks: ['hero-lifestyle'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'Feature Article',
      selector: 'section:nth-of-type(1)',
      style: null,
      blocks: ['columns-article'],
      defaultContent: [],
    },
    {
      id: 'section-3',
      name: 'Image Gallery',
      selector: 'section:nth-of-type(2)',
      style: 'secondary',
      blocks: ['cards-gallery'],
      defaultContent: ['section:nth-of-type(2) .utility-text-align-center'],
    },
    {
      id: 'section-4',
      name: 'Testimonials',
      selector: 'section:nth-of-type(3)',
      style: null,
      blocks: ['tabs-testimonial'],
      defaultContent: [],
    },
    {
      id: 'section-5',
      name: 'Latest Articles',
      selector: 'section:nth-of-type(4)',
      style: 'secondary',
      blocks: ['cards-article'],
      defaultContent: ['section:nth-of-type(4) .utility-text-align-center'],
    },
    {
      id: 'section-6',
      name: 'FAQ',
      selector: 'section:nth-of-type(5)',
      style: null,
      blocks: ['columns-faq'],
      defaultContent: [],
    },
    {
      id: 'section-7',
      name: 'CTA Banner',
      selector: 'section:nth-of-type(6)',
      style: 'inverse',
      blocks: ['hero-banner'],
      defaultContent: [],
    },
  ],
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };
  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];
  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });
  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, params } = payload;
    const main = document.body;

    // 1. Execute beforeTransform transformers
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index',
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
