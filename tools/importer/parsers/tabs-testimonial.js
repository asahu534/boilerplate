/* eslint-disable */
/* global WebImporter */
/** Parser for tabs-testimonial. Base: tabs. Source: https://wknd-trendsetters.site/. */
export default function parse(element, { document }) {
  // Tabs block: col1 = tab label, col2 = tab content
  const tabPanes = element.querySelectorAll('.tab-pane');
  const tabButtons = element.querySelectorAll('.tab-menu-link');
  const cells = [];

  tabPanes.forEach((pane, i) => {
    // Tab label: person name from the tab button
    const button = tabButtons[i];
    let label = '';
    if (button) {
      const nameEl = button.querySelector('strong');
      label = nameEl ? nameEl.textContent.trim() : `Tab ${i + 1}`;
    }

    // Tab content: image + name + role + quote
    const contentDiv = document.createElement('div');
    const img = pane.querySelector('img.cover-image');
    if (img) contentDiv.append(img);
    const name = pane.querySelector('.paragraph-xl.utility-margin-bottom-0 strong');
    if (name) {
      const nameP = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = name.textContent;
      nameP.append(strong);
      contentDiv.append(nameP);
    }
    const role = pane.querySelector('.paragraph-xl.utility-margin-bottom-0 + div');
    if (role) {
      const roleP = document.createElement('p');
      roleP.textContent = role.textContent;
      contentDiv.append(roleP);
    }
    const quote = pane.querySelector('p.paragraph-xl');
    if (quote) contentDiv.append(quote);

    cells.push([label, contentDiv]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-testimonial', cells });
  element.replaceWith(block);
}
