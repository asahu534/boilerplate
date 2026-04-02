/* eslint-disable */
/* global WebImporter */
/** Parser for cards-article. Base: cards. Source: https://wknd-trendsetters.site/. */
export default function parse(element, { document }) {
  // Each card is an <a> with class article-card
  const articleCards = element.querySelectorAll('a.article-card');
  const cells = [];

  articleCards.forEach((card) => {
    // Col 1: Image
    const img = card.querySelector('img.cover-image');

    // Col 2: Tag + date + title as linked content
    const contentDiv = document.createElement('div');
    const tag = card.querySelector('.tag');
    const date = card.querySelector('.paragraph-sm.utility-text-secondary');
    const title = card.querySelector('h3');

    if (tag) {
      const tagP = document.createElement('p');
      tagP.textContent = tag.textContent;
      contentDiv.append(tagP);
    }
    if (date) {
      const dateP = document.createElement('p');
      dateP.textContent = date.textContent;
      contentDiv.append(dateP);
    }
    if (title) {
      // Wrap title in a link to preserve the card URL
      const link = document.createElement('a');
      link.href = card.href;
      link.textContent = title.textContent;
      const h3 = document.createElement('h3');
      h3.append(link);
      contentDiv.append(h3);
    }

    cells.push([img || '', contentDiv]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-article', cells });
  element.replaceWith(block);
}
