/* eslint-disable */
/* global WebImporter */
/** Parser for columns-article. Base: columns. Source: https://wknd-trendsetters.site/. */
export default function parse(element, { document }) {
  // Column 1: Featured image
  const img = element.querySelector('img.cover-image');

  // Column 2: Breadcrumbs + heading + author info
  const contentDiv = document.createElement('div');

  // Breadcrumbs as text
  const breadcrumbLinks = element.querySelectorAll('.breadcrumbs a.text-link');
  if (breadcrumbLinks.length > 0) {
    const breadcrumbP = document.createElement('p');
    breadcrumbLinks.forEach((link, i) => {
      if (i > 0) breadcrumbP.append(' > ');
      breadcrumbP.append(link.cloneNode(true));
    });
    contentDiv.append(breadcrumbP);
  }

  // H2 heading
  const heading = element.querySelector('h2');
  if (heading) contentDiv.append(heading);

  // Author info
  const authorName = element.querySelector('.utility-text-black');
  const date = element.querySelector('.utility-margin-top-0-5rem .utility-text-secondary');
  if (authorName || date) {
    const infoP = document.createElement('p');
    if (authorName) infoP.append('By ' + authorName.textContent);
    if (date) {
      const dateSpan = document.createElement('span');
      dateSpan.textContent = ' · ' + date.textContent;
      infoP.append(dateSpan);
    }
    contentDiv.append(infoP);
  }

  const cells = [[img || '', contentDiv]];
  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-article', cells });
  element.replaceWith(block);
}
