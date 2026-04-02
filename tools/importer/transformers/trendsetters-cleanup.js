/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: WKND Trendsetters cleanup.
 * Removes non-authorable content (navbar, footer, skip-link).
 * Selectors from captured DOM (migration-work/cleaned.html).
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove skip-link (from captured DOM: <a href="#main-content" class="skip-link">)
    WebImporter.DOMUtils.remove(element, ['a.skip-link']);
  }
  if (hookName === H.after) {
    // Remove non-authorable site chrome (from captured DOM)
    // navbar: <div class="navbar">
    // footer: <footer class="footer inverse-footer">
    WebImporter.DOMUtils.remove(element, ['.navbar', 'footer.footer', 'iframe', 'link', 'noscript']);
  }
}
