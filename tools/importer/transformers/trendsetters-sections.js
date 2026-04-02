/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: WKND Trendsetters section breaks and section-metadata.
 * Adds <hr> section breaks and Section Metadata blocks based on template sections.
 * Runs in afterTransform only. Uses payload.template.sections from page-templates.json.
 * Selectors use nth-of-type for section elements (1-6) and header.section for hero.
 */

export default function transform(hookName, element, payload) {
  if (hookName === 'afterTransform') {
    const { template } = payload;
    if (!template || !template.sections || template.sections.length < 2) return;

    const document = element.ownerDocument;
    const sections = template.sections;

    // Process sections in reverse order to preserve DOM positions
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      const selector = Array.isArray(section.selector) ? section.selector : [section.selector];

      let sectionEl = null;
      for (const sel of selector) {
        sectionEl = element.querySelector(sel);
        if (sectionEl) break;
      }
      if (!sectionEl) continue;

      // Add section-metadata block if section has a style
      if (section.style) {
        const metaBlock = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.append(metaBlock);
      }

      // Add <hr> before section (except the first one, and only if there is content before it)
      if (i > 0) {
        const hr = document.createElement('hr');
        sectionEl.parentElement.insertBefore(hr, sectionEl);
      }
    }
  }
}
