/* eslint-disable */
/* global WebImporter */
/** Parser for columns-faq. Base: columns. Source: https://wknd-trendsetters.site/. */
export default function parse(element, { document }) {
  // Column 1: Heading + subheading
  const col1 = document.createElement('div');
  const heading = element.querySelector('h2');
  const subheading = element.querySelector('p.subheading');
  if (heading) col1.append(heading);
  if (subheading) col1.append(subheading);

  // Column 2: FAQ items as Q&A text pairs
  const col2 = document.createElement('div');
  const faqItems = element.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question span');
    const answer = item.querySelector('.faq-answer p');
    if (question) {
      const qP = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = question.textContent;
      qP.append(strong);
      col2.append(qP);
    }
    if (answer) {
      const aP = document.createElement('p');
      aP.textContent = answer.textContent;
      col2.append(aP);
    }
  });

  const cells = [[col1, col2]];
  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-faq', cells });
  element.replaceWith(block);
}
