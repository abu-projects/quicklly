import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { commercePages, renderCommercePage } from './commerce-page-templates.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

function between(source, startMarker, endMarker, label) {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start + startMarker.length);
  if (start < 0 || end < 0) throw new Error(`Could not extract ${label}`);
  return source.slice(start, end).trim();
}

function outerElement(source, startMarker, closingTag, label) {
  const start = source.indexOf(startMarker);
  const end = source.indexOf(closingTag, start);
  if (start < 0 || end < 0) throw new Error(`Could not extract ${label}`);
  return source.slice(start, end + closingTag.length).trim();
}

const head = between(indexHtml, '<head>', '</head>', 'index head').replace(/^<head>\s*/, '');
const sharedTop = between(indexHtml, '<!-- 1. Promotional Strip -->', '<!-- 4. Primary Hero Carousel -->', 'shared header');
const footer = outerElement(indexHtml, '<footer ', '</footer>', 'footer');
const drawer = between(indexHtml, '<!-- Side Navigation Category Drawer -->', '<!-- Prototype Scripts -->', 'side drawer');
const addressModal = between(indexHtml, '<!-- Address Picker Modal System', '<!-- Prototype Scripts -->', 'address modal');

for (const [pageKey, [title]] of Object.entries(commercePages)) {
  const pageContent = renderCommercePage(pageKey);
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
${head.replace(/<title>[^<]*<\/title>/, `<title>${title} | Quicklly</title>`)}
</head>
<body data-page="${pageKey}" class="font-sans antialiased text-neutral-900 bg-white">
  <a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:rounded-lg focus:ring-2 focus:ring-brand-green">Skip to content</a>
  ${sharedTop}
  <div id="main-content">${pageContent}</div>
  ${footer}
  ${drawer}
  ${addressModal}
  <script src="auth-modal.js?v=2026082102"></script>
  <script src="site-links.js?v=20260820"></script>
  <script src="standalone-page.js?v=20260820"></script>
  <script src="commerce-pages.js?v=20260823"></script>
</body>
</html>`;
  fs.writeFileSync(path.join(root, `${pageKey}.html`), html);
}

console.log(`Built ${Object.keys(commercePages).length} commerce and system pages.`);
