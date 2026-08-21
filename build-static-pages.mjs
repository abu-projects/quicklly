import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const pageFiles = [
    'shop-by-stores.html', 'deals.html', 'search-results.html',
    'quicklly-pass.html', 'brand-ambassador.html',
    'student-ambassador.html', 'about.html', 'contact.html',
    'faq.html', 'careers.html', 'blog.html', 'press.html', 'reviews.html',
    'privacy.html', 'terms.html', 'meal-kits.html', 'indian-sweets.html',
    'roti-kit.html', 'organic.html', 'gifting.html', 'aha.html', 'catering.html',
    'events.html', 'astrology.html', 'chai-tea-coffee.html', 'only-luxury.html'
];

const newPageMeta = {
    'meal-kits': ['Indian Meal Kits', 'Ready-to-cook and ready-to-heat Indian meals delivered to your door.'],
    'indian-sweets': ['Indian Sweets', 'Fresh mithai, festive boxes, and regional favorites from trusted makers.'],
    'roti-kit': ['Roti Kit', 'Build a flexible box of fresh rotis, parathas, theplas, and more.'],
    organic: ['Organic Groceries', 'Certified organic pantry staples and fresh Indian grocery essentials.'],
    gifting: ['Gifting', 'Thoughtful gifts for birthdays, festivals, milestones, and everyday moments.'],
    aha: ['Aha Subscription', 'Stream Telugu and Tamil entertainment with a digital Aha subscription.'],
    catering: ['Indian Food Catering', 'Crowd-ready Indian favorites for gatherings, teams, and celebrations.'],
    events: ['Events & Experiences', 'Concerts, festivals, workshops, and South Asian community experiences.'],
    astrology: ['Astrology & Puja', 'Online astrology guidance and guided puja services from trusted practitioners.'],
    'chai-tea-coffee': ['Chai, Tea & Coffee Kits', 'Build a flexible beverage box from trusted Indian and specialty makers.'],
    'only-luxury': ['Only Luxury', 'Premium fashion, gifting, home, and celebration pieces from curated makers.']
};

function between(source, startMarker, endMarker, label) {
    const start = source.indexOf(startMarker);
    const end = source.indexOf(endMarker, start + startMarker.length);
    if (start < 0 || end < 0) throw new Error(`Could not extract ${label}`);
    return source.slice(start, end).trim();
}

function outerElement(source, selectorStart, closingTag, label) {
    const start = source.indexOf(selectorStart);
    const end = source.indexOf(closingTag, start);
    if (start < 0 || end < 0) throw new Error(`Could not extract ${label}`);
    return source.slice(start, end + closingTag.length).trim();
}

const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const templateJs = fs.readFileSync(path.join(root, 'public-pages.js'), 'utf8');

const sharedTop = between(
    indexHtml,
    '<!-- 1. Promotional Strip -->',
    '<!-- 4. Primary Hero Carousel -->',
    'promotional strip and header'
);
const footer = outerElement(indexHtml, '<footer ', '</footer>', 'footer');
const drawer = between(
    indexHtml,
    '<!-- Side Navigation Category Drawer -->',
    '<!-- Prototype Scripts -->',
    'side drawer'
);
const addressModal = between(
    indexHtml,
    '<!-- Address Picker Modal System',
    '<!-- Prototype Scripts -->',
    'address modal'
);

const pureTemplateStart = templateJs.indexOf("    const pageKey");
const pureTemplateEnd = templateJs.indexOf('    function updateLinks');
if (pureTemplateStart < 0 || pureTemplateEnd < 0) throw new Error('Could not extract public page templates');
const pureTemplateSource = templateJs.slice(pureTemplateStart, pureTemplateEnd);

function renderPage(pageKey) {
    const context = {
        document: { body: { dataset: { page: pageKey } } },
        output: ''
    };
    vm.runInNewContext(`${pureTemplateSource}\noutput = renderPage();`, context);
    return context.output
        .replace(/<main(\s[^>]*)?>/g, '<div$1>')
        .replace(/<\/main>/g, '</div>');
}

for (const file of pageFiles) {
    const filePath = path.join(root, file);
    const pageKeyFromFile = path.basename(file, '.html');
    const meta = newPageMeta[pageKeyFromFile];
    const fallback = fs.readFileSync(path.join(root, 'about.html'), 'utf8');
    const current = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : fallback
        .replace(/<title>[^<]*<\/title>/, `<title>${meta?.[0] || pageKeyFromFile} | Quicklly</title>`)
        .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${meta?.[1] || ''}">`)
        .replace(/data-page="[^"]+"/, `data-page="${pageKeyFromFile}"`);
    const head = between(current, '<head>', '</head>', `${file} head`)
        .replace(/^<head>\s*/, '');
    const pageKeyMatch = current.match(/data-page="([^"]+)"/);
    const pageKey = pageKeyMatch?.[1] || path.basename(file, '.html');
    const content = renderPage(pageKey);

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
${head}
</head>
<body data-page="${pageKey}" class="font-sans antialiased text-neutral-900 bg-white">
    <a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:rounded-lg focus:ring-2 focus:ring-brand-green">Skip to content</a>

    ${sharedTop}

    <main id="main-content">
${content}
    </main>

    ${footer}

    ${drawer}

    ${addressModal}

    <script src="auth-modal.js?v=2026082102"></script>
    <script src="site-links.js?v=20260812"></script>
    <script src="standalone-page.js?v=20260812"></script>
    <script src="commerce-pages.js?v=20260823"></script>
</body>
</html>
`;

    fs.writeFileSync(filePath, html);
}

console.log(`Built ${pageFiles.length} standalone HTML pages.`);
