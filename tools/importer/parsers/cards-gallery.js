/* eslint-disable */
/* global WebImporter */
/** Parser for cards-gallery. Base: cards. Source: https://wknd-trendsetters.site/. */
export default function parse(element, { document }) {
  // Each card is a div with utility-aspect-1x1 containing an image
  const imageItems = element.querySelectorAll('.utility-aspect-1x1');
  const cells = [];

  imageItems.forEach((item) => {
    const img = item.querySelector('img.cover-image');
    if (img) {
      // Cards block: col1 = image, col2 = text (empty for gallery)
      cells.push([img, '']);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-gallery', cells });
  element.replaceWith(block);
}
