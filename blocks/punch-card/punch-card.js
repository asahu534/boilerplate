/**
 * Decorates the punch card block.
 *
 * Authored content model (rows):
 *   Row 1: Title (e.g. "5 Pack Bonus")
 *   Row 2: Description text
 *   Row 3: Punches — "filled / total" (e.g. "2 / 5")
 *   Row 4: Points label (e.g. "+XXX")
 *   Row 5 (optional): Bottom text or link
 *   Row 6 (optional): Tag text (e.g. "NEW") | State ("completed" or "error")
 *
 * @param {Element} block The punch-card block element
 */
export default function decorate(block) {
  const rows = [...block.children];

  // Extract authored content from rows
  const titleRow = rows[0];
  const descRow = rows[1];
  const punchesRow = rows[2];
  const pointsRow = rows[3];
  const bottomRow = rows[4];
  const metaRow = rows[5];

  // Clear block
  block.textContent = '';

  // Parse punches "filled / total"
  let filled = 0;
  let total = 5;
  if (punchesRow) {
    const punchText = punchesRow.textContent.trim();
    const parts = punchText.split('/').map((s) => parseInt(s.trim(), 10));
    if (parts.length === 2 && !Number.isNaN(parts[0]) && !Number.isNaN(parts[1])) {
      [filled, total] = parts;
    }
  }

  // Parse optional meta row for tag and state
  let tag = '';
  let state = '';
  if (metaRow) {
    const cols = [...metaRow.querySelectorAll(':scope > div')];
    if (cols.length >= 1) tag = cols[0].textContent.trim();
    if (cols.length >= 2) state = cols[1].textContent.trim().toLowerCase();
  }

  // Tag element (e.g. "NEW")
  if (tag) {
    const tagEl = document.createElement('span');
    tagEl.className = 'punch-card-tag';
    tagEl.textContent = tag;
    block.append(tagEl);
  }

  // Points badge (top-right)
  if (pointsRow) {
    const pointsText = pointsRow.textContent.trim();
    if (pointsText) {
      const pointsEl = document.createElement('span');
      pointsEl.className = 'punch-card-points';
      pointsEl.textContent = pointsText;
      block.append(pointsEl);
    }
  }

  // Completed check (top-right, replaces points)
  if (state === 'completed') {
    // Remove points if present
    const existingPoints = block.querySelector('.punch-card-points');
    if (existingPoints) existingPoints.remove();
    const checkEl = document.createElement('span');
    checkEl.className = 'punch-card-check';
    checkEl.textContent = '✓';
    block.append(checkEl);
  }

  // Title
  if (titleRow) {
    const heading = document.createElement('h3');
    heading.textContent = titleRow.textContent.trim();
    block.append(heading);
  }

  // Description
  if (descRow) {
    const desc = document.createElement('p');
    desc.textContent = descRow.textContent.trim();
    block.append(desc);
  }

  // Punch circles
  const circlesContainer = document.createElement('div');
  circlesContainer.className = 'punch-card-circles';
  for (let i = 0; i < total; i += 1) {
    const circle = document.createElement('span');
    circle.className = `punch-card-circle${i < filled ? ' filled' : ''}`;
    circlesContainer.append(circle);
  }
  block.append(circlesContainer);

  // Bottom text / link / error
  if (bottomRow) {
    const bottomText = bottomRow.textContent.trim();
    if (state === 'error') {
      const errorEl = document.createElement('div');
      errorEl.className = 'punch-card-error';
      errorEl.textContent = bottomText;
      block.append(errorEl);
    } else if (bottomText) {
      const p = document.createElement('p');
      const bottomContent = bottomRow.querySelector(':scope > div');
      if (bottomContent) {
        p.innerHTML = bottomContent.innerHTML;
      } else {
        p.textContent = bottomText;
      }
      block.append(p);
    }
  }
}
