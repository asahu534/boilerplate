/**
 * Decorates the bonus-confirmation block.
 *
 * Authored content model (rows):
 *   Row 1: Heading (e.g. "You Earned a Birthday Bonus!")
 *   Row 2: Description text
 *   Row 3: Button label + link (e.g. "Close" as bold link)
 *
 * @param {Element} block The bonus-confirmation block element
 */
export default function decorate(block) {
  const rows = [...block.children];

  const headingRow = rows[0];
  const descRow = rows[1];
  const buttonRow = rows[2];

  // Clear block
  block.textContent = '';

  // Heading
  if (headingRow) {
    const heading = document.createElement('h3');
    heading.textContent = headingRow.textContent.trim();
    block.append(heading);
  }

  // Checkmark icon
  const icon = document.createElement('div');
  icon.className = 'bonus-confirmation-icon';
  block.append(icon);

  // Description
  if (descRow) {
    const p = document.createElement('p');
    p.textContent = descRow.textContent.trim();
    block.append(p);
  }

  // Button
  if (buttonRow) {
    const link = buttonRow.querySelector('a');
    if (link) {
      const wrapper = document.createElement('p');
      wrapper.className = 'button-wrapper';
      const btn = link.cloneNode(true);
      btn.className = 'button';
      wrapper.append(btn);
      block.append(wrapper);
    }
  }
}
