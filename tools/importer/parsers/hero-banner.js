/* eslint-disable */
/* global WebImporter */
/** Parser for hero-banner. Base: hero. Source: https://wknd-trendsetters.site/. */
export default function parse(element, { document }) {
  // Row 1: Background image
  const bgImage = element.querySelector('img.cover-image');

  // Row 2: Heading + subheading + CTA
  const heading = element.querySelector('h2, h1');
  const subheading = element.querySelector('p.subheading');
  const ctaLink = element.querySelector('.button-group a');

  const cells = [];
  if (bgImage) cells.push([bgImage]);

  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  if (ctaLink) contentCell.push(ctaLink);
  cells.push(contentCell);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-banner', cells });
  element.replaceWith(block);
}
