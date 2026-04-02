/* eslint-disable */
/* global WebImporter */
/** Parser for hero-lifestyle. Base: hero. Source: https://wknd-trendsetters.site/. */
export default function parse(element, { document }) {
  // Row 1: Hero images (3 images in grid)
  const images = element.querySelectorAll('.grid-layout.grid-gap-xs img.cover-image');
  const imageContainer = document.createElement('div');
  images.forEach((img) => {
    const pic = img.closest('picture') || img;
    imageContainer.append(pic.cloneNode(true));
  });

  // Row 2: Heading + subheading + CTAs
  const heading = element.querySelector('h1');
  const subheading = element.querySelector('p.subheading');
  const ctaLinks = element.querySelectorAll('.button-group a');

  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  ctaLinks.forEach((link) => contentCell.push(link));

  const cells = [];
  if (images.length > 0) cells.push([imageContainer]);
  cells.push(contentCell);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-lifestyle', cells });
  element.replaceWith(block);
}
