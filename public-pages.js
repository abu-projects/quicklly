(function () {
    'use strict';

    const pageKey = document.body.dataset.page || 'about';
    const image = (id, width = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=82&w=${width}`;

    const pageMeta = {
        'shop-by-stores': ['Shop by stores', 'Local favorites and nationwide specialists, all in one place.'],
        deals: ['Deals & promotions', 'Fresh picks and pantry staples at prices worth planning around.'],
        'search-results': ['Search results', 'Find products, stores, and meal kits across Quicklly.'],
        'quicklly-pass': ['Quicklly Pass', 'Delivery savings and member benefits for people who order often.'],
        'refer-a-friend': ['Refer a friend', 'Give $10. Get $10. Bring good food closer to your people.'],
        'brand-ambassador': ['Brand ambassador', 'Share the flavors you love and grow with Quicklly.'],
        'student-ambassador': ['Student ambassador', 'Build community on campus through food, culture, and events.'],
        'be-a-hero': ['Be a Hero', 'Help families celebrate traditions, wherever they live.'],
        about: ['About Quicklly', 'Built to connect multicultural households with the products and flavors they know.'],
        contact: ['Contact Quicklly', 'Tell us what you need. We’ll route it to the right team.'],
        faq: ['Help center', 'Straight answers about ordering, delivery, membership, and support.'],
        careers: ['Careers at Quicklly', 'Help make culturally relevant commerce work better for everyone.'],
        blog: ['The Quicklly journal', 'Recipes, practical guides, and stories from our food communities.'],
        press: ['Newsroom', 'Company updates, partnerships, and Quicklly in the news.'],
        reviews: ['Loved by our community', 'Real stories from customers across the United States.'],
        'meal-kits': ['Indian meal kits', 'Ready-to-cook and ready-to-heat Indian meals delivered to your door.'],
        'indian-sweets': ['Indian sweets', 'Fresh mithai, festive boxes, and regional favorites from trusted makers.'],
        'roti-kit': ['Roti kit', 'Build a flexible box of fresh rotis, parathas, theplas, and more.'],
        organic: ['Organic groceries', 'Certified organic pantry staples and fresh Indian grocery essentials.'],
        gifting: ['Quicklly gifting', 'Thoughtful gifts for birthdays, festivals, milestones, and everyday moments.'],
        aha: ['Aha subscription', 'Stream Telugu and Tamil entertainment with a digital Aha subscription.'],
        catering: ['Indian food catering', 'Crowd-ready Indian favorites for gatherings, teams, and celebrations.'],
        events: ['Events & experiences', 'Celebrate South Asian culture through concerts, festivals, workshops, and community gatherings.'],
        astrology: ['Astrology & puja', 'Book trusted astrologers and guided puja services online.'],
        'chai-tea-coffee': ['Chai, tea & coffee kits', 'Build a flexible beverage box from trusted Indian and specialty makers.'],
        'only-luxury': ['Only Luxury', 'Premium fashion, gifting, home, and celebration pieces from curated makers.'],
        privacy: ['Privacy policy', 'How Quicklly handles and protects your information.'],
        terms: ['Terms of service', 'The rules that apply when you use Quicklly.']
    };

    const products = [
        ['imgs/aashirvaad_atta.png', 'Aashirvaad Whole Wheat Atta', '10 lbs', '$12.99'],
        ['imgs/haldiram_aloo_bhujia.png', 'Haldiram’s Aloo Bhujia', '400 g', '$4.49'],
        ['imgs/taj_mahal_tea.png', 'Brooke Bond Taj Mahal Tea', '900 g', '$13.59'],
        ['imgs/royal_basmati_rice.png', 'Royal Basmati Rice', '10 lbs', '$18.99'],
        ['imgs/mdh_garam_masala.png', 'MDH Garam Masala', '100 g', '$2.99'],
        ['imgs/kaju_katli_sweets.png', 'Premium Kaju Katli', '1 lb', '$14.99']
    ];

    const productGrid = (limit = 6) => `<div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-${Math.min(limit, 6)} gap-x-4 gap-y-8">${products.slice(0, limit).map((product, index) => `
        <article class="group min-w-0">
            <div class="relative aspect-square bg-neutral-50 overflow-hidden mb-4"><img src="${product[0]}" alt="${product[1]}" class="size-full object-contain p-5 group-hover:scale-105 transition-transform duration-200"><button type="button" class="absolute right-3 bottom-3 size-10 rounded-full bg-white border border-neutral-200 grid place-items-center hover:bg-brand-green hover:text-white hover:border-brand-green transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green" aria-label="Add ${product[1]} to cart"><iconify-icon icon="solar:add-circle-linear" width="21"></iconify-icon></button>${index < 2 ? '<span class="absolute top-3 left-3 text-[11px] font-semibold text-red-800 bg-red-100 rounded-full px-2.5 py-1">Save 15%</span>' : ''}</div>
            <p class="text-xs text-neutral-500 mb-1">Quicklly Market</p><h3 class="text-sm font-semibold text-neutral-900 line-clamp-2 text-pretty">${product[1]}</h3><p class="text-xs text-neutral-500 mt-1">${product[2]}</p><p class="text-sm font-semibold tabular-nums mt-2">${product[3]}</p>
        </article>`).join('')}</div>`;

    function breadcrumb(label) {
        return `<nav aria-label="Breadcrumb" class="max-w-[1360px] mx-auto px-4 md:px-8 pt-5"><ol class="flex items-center gap-2 text-xs text-neutral-500"><li><a href="index.html" class="hover:text-brand-green transition-colors">Home</a></li><li aria-hidden="true"><iconify-icon icon="solar:alt-arrow-right-linear" width="12"></iconify-icon></li><li class="font-medium text-neutral-900">${label}</li></ol></nav>`;
    }

    function editorialHero(eyebrow, title, copy, img, cta = '') {
        return `<section class="max-w-[1360px] mx-auto px-4 md:px-8 py-10 md:py-16"><div class="grid lg:grid-cols-2 items-stretch bg-neutral-50"><div class="px-6 py-12 md:px-12 md:py-16 lg:px-16 flex flex-col justify-center"><span class="inline-flex items-center gap-2 text-xs font-semibold text-brand-dark mb-5"><span class="size-2 rounded-full bg-brand-green"></span>${eyebrow}</span><h1 class="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.04] text-neutral-950 text-balance">${title}</h1><p class="mt-6 text-base md:text-lg leading-8 text-neutral-600 max-w-[56ch] text-pretty">${copy}</p>${cta ? `<div class="mt-8">${cta}</div>` : ''}</div><div class="min-h-[340px] lg:min-h-[520px]"><img src="${img}" alt="${eyebrow.toLowerCase()}" class="size-full object-cover" fetchpriority="high"></div></div></section>`;
    }

    function renderStores() {
        const stores = [
            ['Patel Brothers', 'Same-day delivery', '4.8', image('photo-1542838132-92c53300491e', 700)],
            ['Quicklly Indian Grocery', 'Nationwide shipping', '4.7', image('photo-1604719312566-8912e9227c6a', 700)],
            ['Fresh Farms', 'Fresh produce & pantry', '4.6', image('photo-1578916171728-46686eac8d58', 700)],
            ['Kamdar Plaza', 'Chicago favorites', '4.7', image('photo-1610348725531-843dff563e2c', 700)],
            ['Very Much Indian', 'Specialty groceries', '4.5', image('photo-1534723452862-4c874018d66d', 700)],
            ['Almond House', 'Sweets & gifting', '4.9', image('photo-1579113800032-c38bd7635818', 700)]
        ];
        return `${breadcrumb('Shop by stores')}<main><section class="max-w-[1360px] mx-auto px-4 md:px-8 py-10 md:py-14"><div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-9"><div><span class="text-xs font-semibold text-brand-dark">STORES NEAR 60601</span><h1 class="text-4xl md:text-5xl font-semibold mt-3 text-balance">Shop beyond grocery</h1><p class="mt-4 text-neutral-600 max-w-2xl text-pretty">Browse trusted local stores and nationwide specialists selected for quality, range, and reliable fulfillment.</p></div><label class="relative w-full lg:w-80"><span class="sr-only">Search stores</span><iconify-icon icon="solar:magnifer-linear" width="19" class="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"></iconify-icon><input type="search" placeholder="Search stores" class="w-full pl-11 pr-4 py-3 rounded-xl bg-neutral-100 border border-transparent focus:bg-white focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none"></label></div><div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">${stores.map(store => `<a href="category.html" class="group block"><div class="aspect-[4/3] bg-neutral-100 overflow-hidden"><img src="${store[3]}" alt="${store[0]} storefront" class="size-full object-cover group-hover:scale-105 transition-transform duration-200"></div><div class="pt-4 flex justify-between gap-4"><div><h2 class="text-lg font-semibold group-hover:text-brand-dark transition-colors">${store[0]}</h2><p class="text-sm text-neutral-500 mt-1">${store[1]}</p></div><span class="text-sm font-semibold tabular-nums flex items-start gap-1"><iconify-icon icon="solar:star-bold" class="text-brand-green" width="16"></iconify-icon>${store[2]}</span></div></a>`).join('')}</div></section><section class="bg-neutral-950 text-white"><div class="max-w-[1360px] mx-auto px-4 md:px-8 py-12 flex flex-col md:flex-row md:items-center justify-between gap-6"><div><h2 class="text-2xl md:text-3xl font-semibold text-balance">Can’t find your neighborhood store?</h2><p class="text-neutral-400 mt-2">Tell us which store you want to see on Quicklly.</p></div><a href="contact.html" class="inline-flex justify-center rounded-full bg-brand-green hover:bg-brand-dark px-6 py-3 text-sm font-semibold transition-colors duration-150">Suggest a store</a></div></section></main>`;
    }

    function renderDeals(searchMode = false) {
        const title = searchMode ? 'Results for “basmati”' : 'Fresh deals, no coupon clipping';
        const copy = searchMode ? '24 products from 7 stores near 60601.' : 'Weekly savings across pantry essentials, snacks, tea, and ready-to-eat favorites.';
        return `${breadcrumb(searchMode ? 'Search results' : 'Deals')}<main><section class="max-w-[1360px] mx-auto px-4 md:px-8 py-10 md:py-14"><div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-neutral-200"><div><span class="text-xs font-semibold text-brand-dark">${searchMode ? 'SEARCH' : 'THIS WEEK'}</span><h1 class="text-4xl md:text-5xl font-semibold mt-3 text-balance">${title}</h1><p class="mt-4 text-neutral-600 text-pretty">${copy}</p></div><div class="flex flex-wrap gap-2" aria-label="Product filters">${['All products','Grocery','Meals','Under $10'].map((label,index)=>`<button data-filter-chip aria-pressed="${index===0}" class="rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-150 ${index===0?'bg-neutral-950 text-white border-neutral-950':'border-neutral-300 hover:border-brand-green'}">${label}</button>`).join('')}</div></div><div class="grid lg:grid-cols-[220px_1fr] gap-8 pt-8"><aside class="hidden lg:block sticky top-32 self-start"><h2 class="text-sm font-semibold mb-4">Filter results</h2>${['Category','Brand','Delivery','Dietary'].map(item => `<button data-filter-section aria-expanded="false" class="w-full flex items-center justify-between py-3 border-b border-neutral-200 text-sm text-neutral-700 hover:text-brand-dark transition-colors duration-150">${item}<iconify-icon icon="solar:add-linear" width="16"></iconify-icon></button>`).join('')}</aside><section aria-label="Products">${productGrid(6)}<button data-load-more class="mx-auto mt-12 block rounded-full bg-neutral-950 text-white px-7 py-3 text-sm font-semibold hover:bg-neutral-800 transition-colors duration-150">Load more products</button></section></div></section></main>`;
    }

    function renderPass() {
        const perks = [['solar:delivery-bold','Unlimited eligible deliveries','Skip delivery fees on qualifying grocery and meal orders.'],['solar:tag-price-bold','Members-only prices','Unlock rotating offers across pantry, meals, and gifting.'],['solar:chat-round-check-bold','Priority support','Get faster help when an order needs attention.']];
        return `${editorialHero('QUICKLLY PASS','Your everyday orders should work harder for you.','One membership for delivery savings, member pricing, and priority support across the Quicklly marketplace.',image('photo-1601599561213-832382fd07ba'),'<button data-auth-open class="rounded-full bg-neutral-950 text-white px-7 py-3.5 text-sm font-semibold hover:bg-neutral-800 transition-colors duration-150">Start your membership</button>')}<main><section class="max-w-[1360px] mx-auto px-4 md:px-8 py-10 md:py-16"><div class="grid md:grid-cols-3 border-y border-neutral-200">${perks.map(perk => `<article class="py-8 md:px-8 first:pl-0 border-b md:border-b-0 md:border-r border-neutral-200 last:border-0"><iconify-icon icon="${perk[0]}" width="28" class="text-brand-green"></iconify-icon><h2 class="text-xl font-semibold mt-5">${perk[1]}</h2><p class="text-sm text-neutral-600 leading-6 mt-3 text-pretty">${perk[2]}</p></article>`).join('')}</div><div class="mt-16 grid lg:grid-cols-[1fr_1.2fr] gap-8 items-start"><div><span class="text-xs font-semibold text-brand-dark">MEMBERSHIP</span><h2 class="text-3xl md:text-4xl font-semibold mt-3 text-balance">Simple monthly value</h2><p class="text-neutral-600 mt-4 max-w-md text-pretty">Best for households ordering twice a month or more. Cancel anytime from your account.</p></div><div class="bg-neutral-950 text-white p-8 md:p-10"><div class="flex items-start justify-between gap-6"><div><p class="text-sm text-neutral-400">Monthly plan</p><p class="text-5xl font-semibold tabular-nums mt-2">$9.99</p><p class="text-sm text-neutral-400 mt-2">per month</p></div><span class="rounded-full bg-brand-green px-3 py-1 text-xs font-semibold">Most flexible</span></div><ul class="mt-8 space-y-3 text-sm text-neutral-200"><li>✓ No long-term commitment</li><li>✓ Benefits apply automatically</li><li>✓ Member offers refreshed regularly</li></ul><button data-auth-open class="w-full mt-8 rounded-full bg-brand-green hover:bg-brand-dark py-3.5 text-sm font-semibold transition-colors duration-150">Join Quicklly Pass</button></div></div></section></main>`;
    }

    function renderProgram(type) {
        const configs = {
            'refer-a-friend': ['REFER A FRIEND','Good food is better shared.','Give a friend $10 off their first qualifying order. You’ll get $10 after their delivery.','Copy referral link','solar:users-group-two-rounded-bold',image('photo-1529156069898-49953e39b3ac')],
            'brand-ambassador': ['COMMUNITY PROGRAM','Turn your food knowledge into influence.','Create useful content, host tastings, and introduce more people to culturally authentic products.','Apply to join','solar:camera-bold',image('photo-1521737711867-e3b97375f902')],
            'student-ambassador': ['CAMPUS PROGRAM','Bring more flavor to campus life.','Plan cultural food moments, grow a local Quicklly community, and build real brand experience.','Apply for your campus','solar:square-academic-cap-bold',image('photo-1523240795612-9a054b0db644')],
            'be-a-hero': ['COMMUNITY GIVING','Help a family feel closer to home.','Support food access and cultural celebrations through community-led Quicklly initiatives.','Get involved','solar:heart-bold',image('photo-1469571486292-0ba58a3f068b')]
        };
        const item = configs[type];
        const action = type === 'refer-a-friend' ? `<button data-copy-referral class="rounded-full bg-brand-green hover:bg-brand-dark text-white px-7 py-3.5 text-sm font-semibold transition-colors duration-150">${item[3]}</button><p data-copy-status class="text-sm text-brand-dark mt-3 min-h-5" aria-live="polite"></p>` : `<button data-auth-open class="rounded-full bg-brand-green hover:bg-brand-dark text-white px-7 py-3.5 text-sm font-semibold transition-colors duration-150">${item[3]}</button>`;
        return `${editorialHero(item[0],item[1],item[2],item[5],action)}<main><section class="max-w-[1360px] mx-auto px-4 md:px-8 py-12 md:py-20"><div class="grid md:grid-cols-3 gap-8">${[['01','Start','Tell us about your community and what you want to build.'],['02','Create','Use practical resources, campaign ideas, and support from our team.'],['03','Grow','Track your impact and unlock new opportunities over time.']].map(step => `<article class="border-t-2 border-neutral-950 pt-6"><span class="text-sm font-semibold text-brand-dark tabular-nums">${step[0]}</span><h2 class="text-2xl font-semibold mt-8">${step[1]}</h2><p class="text-neutral-600 text-sm leading-6 mt-3 text-pretty">${step[2]}</p></article>`).join('')}</div></section></main>`;
    }

    function renderAbout() {
        return `${editorialHero('ABOUT QUICKLLY','A marketplace built around the flavors people actually cook with.','Quicklly connects multicultural households with trusted local stores, specialty products, and food experiences that mainstream shelves often miss.',image('photo-1556742049-0cfed4f6a45d'))}<main><section class="max-w-[1360px] mx-auto px-4 md:px-8 py-12 md:py-20"><div class="grid lg:grid-cols-[.8fr_1.2fr] gap-12"><div><span class="text-xs font-semibold text-brand-dark">OUR PURPOSE</span><h2 class="text-3xl md:text-4xl font-semibold mt-3 text-balance">Culture belongs in the cart.</h2></div><div class="grid sm:grid-cols-2 gap-8 text-neutral-600 leading-7"><p class="text-pretty">A neighborhood store can carry years of knowledge in its aisles. We help those stores reach customers beyond a few city blocks without losing the specificity that makes them valuable.</p><p class="text-pretty">For shoppers, that means easier access to regional ingredients, familiar brands, and meals that taste like home—delivered locally or shipped nationwide.</p></div></div><div class="grid grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 mt-16 border border-neutral-200">${[['500+','local store partners'],['500K+','products across the marketplace'],['2M+','orders delivered'],['Nationwide','shipping coverage']].map(stat => `<div class="bg-white p-6 md:p-8"><p class="text-3xl md:text-4xl font-semibold tabular-nums">${stat[0]}</p><p class="text-sm text-neutral-500 mt-2">${stat[1]}</p></div>`).join('')}</div></section></main>`;
    }

    function renderContact() {
        return `${breadcrumb('Contact')}<main class="max-w-[1360px] mx-auto px-4 md:px-8 py-10 md:py-16"><div class="grid lg:grid-cols-[.8fr_1.2fr] gap-12 lg:gap-20"><section><span class="text-xs font-semibold text-brand-dark">CONTACT</span><h1 class="text-4xl md:text-5xl font-semibold mt-3 text-balance">How can we help?</h1><p class="mt-5 text-neutral-600 leading-7 max-w-md text-pretty">Choose the topic that best fits your question. Our support team will route it to the right place.</p><div class="mt-10 space-y-6">${[['solar:phone-calling-linear','Phone support','+1 (708) 406-9922'],['solar:letter-linear','General inquiries','care@quicklly.com'],['solar:box-linear','Order support','support@quicklly.com']].map(item => `<div class="flex gap-4"><div class="size-11 rounded-full bg-brand-light text-brand-dark grid place-items-center shrink-0"><iconify-icon icon="${item[0]}" width="21"></iconify-icon></div><div><h2 class="text-sm font-semibold">${item[1]}</h2><p class="text-sm text-neutral-500 mt-1">${item[2]}</p></div></div>`).join('')}</div></section><section class="bg-neutral-50 p-6 md:p-10"><form id="contact-form" class="grid sm:grid-cols-2 gap-5" novalidate><div><label for="contact-name" class="block text-sm font-medium mb-2">Name</label><input id="contact-name" class="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20" autocomplete="name"></div><div><label for="contact-email" class="block text-sm font-medium mb-2">Email</label><input id="contact-email" type="email" class="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20" autocomplete="email"></div><div class="sm:col-span-2"><label for="contact-topic" class="block text-sm font-medium mb-2">Topic</label><select id="contact-topic" class="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"><option>Order support</option><option>Store partnership</option><option>General inquiry</option><option>Press</option></select></div><div class="sm:col-span-2"><label for="contact-message" class="block text-sm font-medium mb-2">Message</label><textarea id="contact-message" rows="6" class="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"></textarea></div><p id="contact-error" class="sm:col-span-2 hidden text-sm text-red-700" role="alert"></p><div class="sm:col-span-2"><button type="submit" class="rounded-full bg-neutral-950 text-white px-7 py-3.5 text-sm font-semibold hover:bg-neutral-800 transition-colors duration-150">Send message</button></div></form></section></div></main>`;
    }

    function renderFaq() {
        const faqs = [['Where does Quicklly deliver?','Availability depends on your ZIP code. Local stores may offer same-day delivery, while selected products ship nationwide.'],['How do I change my delivery address?','Use the delivery location control in the header. Product and store availability updates for the selected address.'],['What is Quicklly Pass?','Quicklly Pass is a paid membership that can include delivery savings, member prices, and priority support on eligible orders.'],['Can I order from more than one store?','Yes. Your cart groups products by store so you can review minimums, delivery fees, and timing before checkout.'],['How can I get help with an order?','Contact order support with your order number. For urgent delivery issues, phone support is the fastest route.'],['Do you ship refrigerated products nationwide?','Shipping eligibility is shown on each product and store page. Temperature-sensitive items may have limited delivery coverage.']];
        return `${breadcrumb('Help center')}<main><section class="max-w-[900px] mx-auto px-4 md:px-8 py-12 md:py-16 text-center"><span class="text-xs font-semibold text-brand-dark">HELP CENTER</span><h1 class="text-4xl md:text-5xl font-semibold mt-3 text-balance">What can we help you find?</h1><label class="relative block mt-8"><span class="sr-only">Search frequently asked questions</span><iconify-icon icon="solar:magnifer-linear" width="20" class="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none"></iconify-icon><input id="faq-search" type="search" placeholder="Search delivery, orders, membership..." class="w-full pl-14 pr-5 py-4 rounded-xl bg-neutral-100 border border-transparent focus:bg-white focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none"></label></section><section class="max-w-[900px] mx-auto px-4 md:px-8 pb-20"><div id="faq-list" class="border-t border-neutral-200">${faqs.map((faq,index) => `<details class="group border-b border-neutral-200" data-faq-item><summary class="list-none cursor-pointer py-6 flex items-center justify-between gap-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"><span class="text-base md:text-lg font-semibold">${faq[0]}</span><span class="size-8 rounded-full bg-neutral-100 grid place-items-center shrink-0 group-open:rotate-45 transition-transform duration-150"><iconify-icon icon="solar:add-linear" width="17"></iconify-icon></span></summary><p class="pb-6 pr-12 text-sm md:text-base leading-7 text-neutral-600 text-pretty">${faq[1]}</p></details>`).join('')}</div><div id="faq-empty" class="hidden py-12 text-center"><iconify-icon icon="solar:magnifer-linear" width="30" class="text-neutral-400"></iconify-icon><h2 class="text-xl font-semibold mt-4">No matching answers</h2><p class="text-sm text-neutral-500 mt-2">Try a shorter search or contact support.</p><a href="contact.html" class="inline-flex mt-5 rounded-full bg-neutral-950 text-white px-5 py-2.5 text-sm font-semibold">Contact support</a></div><div class="mt-12 bg-neutral-950 text-white p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5"><div><h2 class="text-2xl font-semibold">Still need a hand?</h2><p class="text-neutral-400 mt-2 text-sm">Our support team can help with account and order questions.</p></div><a href="contact.html" class="rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-center hover:bg-brand-dark transition-colors duration-150">Contact support</a></div></section></main>`;
    }

    function renderCareers() {
        const jobs = [['Senior Product Designer','Chicago / Hybrid','Product'],['Marketplace Operations Manager','Chicago / Hybrid','Operations'],['Senior Full-stack Engineer','Remote, US','Engineering'],['Retail Partnerships Lead','New York / Remote','Growth']];
        return `${editorialHero('CAREERS','Build the infrastructure behind culturally relevant commerce.','Join a team working across marketplace technology, food operations, and local-store partnerships.',image('photo-1522071820081-009f0129c71c'),'<a href="#open-roles" class="inline-flex rounded-full bg-neutral-950 text-white px-7 py-3.5 text-sm font-semibold hover:bg-neutral-800 transition-colors duration-150">See open roles</a>')}<main><section id="open-roles" class="max-w-[1100px] mx-auto px-4 md:px-8 py-14 md:py-20"><div class="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8"><div><span class="text-xs font-semibold text-brand-dark">OPEN ROLES</span><h2 class="text-3xl md:text-4xl font-semibold mt-3">Find your place here</h2></div><p class="text-sm text-neutral-500">4 current openings</p></div><div class="border-t border-neutral-300">${jobs.map(job => `<a href="contact.html" class="group grid md:grid-cols-[1.5fr_1fr_.8fr_auto] gap-2 md:gap-6 py-6 border-b border-neutral-200 items-center"><h3 class="text-lg font-semibold group-hover:text-brand-dark transition-colors">${job[0]}</h3><p class="text-sm text-neutral-500">${job[1]}</p><p class="text-sm text-neutral-500">${job[2]}</p><iconify-icon icon="solar:arrow-right-up-linear" width="20" class="text-neutral-400 group-hover:text-brand-dark"></iconify-icon></a>`).join('')}</div></section></main>`;
    }

    const articles = [
        ['Recipes','A pantry-first guide to weeknight dal','Build a flexible dal routine with the lentils, tempering spices, and toppings you already have.',image('photo-1546833999-b9f581a1996d',700),'Aug 7, 2026'],
        ['Guide','How to choose basmati rice','A practical look at grain length, aging, aroma, and the right rice for biryani or everyday meals.',image('photo-1536304993881-ff6e9eefa2a6',700),'Jul 29, 2026'],
        ['Culture','Why regional snacks matter','The small, specific foods that keep family traditions and regional memories close.',image('photo-1601050690597-df0568f70950',700),'Jul 16, 2026'],
        ['Kitchen','Build your first masala dabba','Seven versatile spices, how to store them, and what to cook first.',image('photo-1596040033229-a9821ebd058d',700),'Jun 30, 2026'],
        ['Meals','A better frozen-paratha lunch','Three quick combinations that turn pantry staples into a complete meal.',image('photo-1601050690117-94f5f6fa8bd7',700),'Jun 18, 2026'],
        ['Gifting','A thoughtful South Asian host gift','Sweets, tea, and pantry treats that travel well and feel personal.',image('photo-1549465220-1a8b9238cd48',700),'Jun 4, 2026']
    ];

    function renderEditorial(type) {
        const pressItems = [['Quicklly expands access to multicultural grocery nationwide','Company update','Aug 5, 2026'],['Just By Quicklly adds new retail partners across the Midwest','Retail partnership','Jul 22, 2026'],['Quicklly recognized for local-store marketplace innovation','In the news','Jun 12, 2026'],['New campus meal program brings regional Indian food to students','Program launch','May 28, 2026']];
        if (type === 'press') return `${breadcrumb('Newsroom')}<main class="max-w-[1100px] mx-auto px-4 md:px-8 py-12 md:py-16"><div class="grid lg:grid-cols-[.8fr_1.2fr] gap-10 mb-14"><div><span class="text-xs font-semibold text-brand-dark">NEWSROOM</span><h1 class="text-4xl md:text-5xl font-semibold mt-3 text-balance">Quicklly news and company updates</h1></div><p class="text-neutral-600 leading-7 lg:pt-8 text-pretty">Follow product launches, retail partnerships, community programs, and coverage of Quicklly’s work across multicultural commerce.</p></div><div class="border-t border-neutral-300">${pressItems.map(item => `<article class="grid md:grid-cols-[1.5fr_.6fr_.4fr_auto] gap-3 md:gap-6 py-7 border-b border-neutral-200 items-center"><h2 class="text-lg font-semibold text-pretty">${item[0]}</h2><span class="text-sm text-neutral-500">${item[1]}</span><time class="text-sm text-neutral-500 tabular-nums">${item[2]}</time><a href="contact.html" aria-label="Read ${item[0]}" class="size-10 rounded-full border border-neutral-300 grid place-items-center hover:border-brand-green hover:text-brand-dark transition-colors"><iconify-icon icon="solar:arrow-right-linear" width="18"></iconify-icon></a></article>`).join('')}</div><section class="mt-16 bg-neutral-950 text-white p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6"><div><h2 class="text-2xl font-semibold">Media inquiries</h2><p class="text-neutral-400 text-sm mt-2">For interviews, company background, or brand assets.</p></div><a href="contact.html" class="rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-center hover:bg-brand-dark transition-colors">Contact the press team</a></section></main>`;
        return `${breadcrumb('Blog')}<main class="max-w-[1360px] mx-auto px-4 md:px-8 py-12 md:py-16"><div class="max-w-3xl"><span class="text-xs font-semibold text-brand-dark">THE QUICKLLY JOURNAL</span><h1 class="text-4xl md:text-5xl font-semibold mt-3 text-balance">Recipes, guides, and food stories worth saving</h1><p class="text-neutral-600 mt-5 leading-7 text-pretty">Useful ideas for getting more from the ingredients, meals, and traditions you already love.</p></div><div id="featured" class="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 mt-12">${articles.map((article, index) => `<article id="article-${index + 1}" class="group"><a href="#article-${index + 1}" class="block"><div class="aspect-[4/3] overflow-hidden bg-neutral-100"><img src="${article[3]}" alt="${article[1]}" class="size-full object-cover group-hover:scale-105 transition-transform duration-200"></div><div class="pt-5"><div class="flex items-center justify-between text-xs"><span class="font-semibold text-brand-dark">${article[0]}</span><time class="text-neutral-500 tabular-nums">${article[4]}</time></div><h2 class="text-xl font-semibold mt-3 group-hover:text-brand-dark transition-colors text-balance">${article[1]}</h2><p class="text-sm text-neutral-600 leading-6 mt-3 line-clamp-2 text-pretty">${article[2]}</p></div></a></article>`).join('')}</div></main>`;
    }

    function renderReviews() {
        const reviews = [['Priya M.','Texas','Finding authentic Indian groceries in my small town was hard. Quicklly delivers the brands I know, packed carefully and on time.'],['Rahul S.','New York','The Diwali sweets arrived fresh and beautifully packed. Pass pays for itself for our household.'],['Anita K.','California','I can shop local stores and nationwide products in one place. Support was quick when I needed an address change.'],['Muhammad A.','Illinois','Good halal selection, fair prices, and dependable delivery windows.'],['Lipi S.','New Jersey','Roti kits make busy weeks much easier. The instructions are clear and the flavors feel familiar.'],['Vignesh A.','New York','The variety surprised me, especially regional pantry products I usually cannot find nearby.']];
        return `${breadcrumb('Reviews')}<main><section class="max-w-[1360px] mx-auto px-4 md:px-8 py-12 md:py-16"><div class="grid lg:grid-cols-[.8fr_1.2fr] gap-10 items-end mb-12"><div><span class="text-xs font-semibold text-brand-dark">4.8 AVERAGE RATING</span><h1 class="text-4xl md:text-5xl font-semibold mt-3 text-balance">Loved by our community</h1></div><p class="text-neutral-600 leading-7 text-pretty">Stories from people using Quicklly to find regional ingredients, send gifts, and put familiar meals on the table.</p></div><div class="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200 border border-neutral-200">${reviews.map((review,index) => `<article class="bg-white p-7 md:p-8"><div class="flex gap-1 text-brand-green" aria-label="5 out of 5 stars">${'<iconify-icon icon="solar:star-bold" width="16"></iconify-icon>'.repeat(index === 4 ? 4 : 5)}</div><blockquote class="text-neutral-700 leading-7 mt-6 text-pretty">“${review[2]}”</blockquote><div class="mt-8 flex items-center gap-3"><div class="size-10 rounded-full bg-neutral-950 text-white grid place-items-center font-semibold">${review[0][0]}</div><div><p class="text-sm font-semibold">${review[0]}</p><p class="text-xs text-neutral-500 mt-0.5">${review[1]}</p></div></div></article>`).join('')}</div></section></main>`;
    }

    function renderLegal(type) {
        const privacy = type === 'privacy';
        return `${breadcrumb(privacy ? 'Privacy policy' : 'Terms of service')}<main class="max-w-[1040px] mx-auto px-4 md:px-8 py-12 md:py-16"><div class="grid lg:grid-cols-[240px_1fr] gap-12"><aside class="hidden lg:block sticky top-32 self-start"><p class="text-xs font-semibold text-brand-dark">LAST UPDATED</p><p class="text-sm mt-2 tabular-nums">August 11, 2026</p><nav class="mt-8 space-y-3 text-sm text-neutral-500" aria-label="On this page"><a href="#overview" class="block hover:text-brand-dark">Overview</a><a href="#information" class="block hover:text-brand-dark">Information</a><a href="#choices" class="block hover:text-brand-dark">Your choices</a><a href="#contact" class="block hover:text-brand-dark">Contact</a></nav></aside><article class="legal-copy"><span class="text-xs font-semibold text-brand-dark">LEGAL</span><h1 class="text-4xl md:text-5xl font-semibold mt-3 text-balance">${privacy ? 'Privacy policy' : 'Terms of service'}</h1><p class="mt-5 text-base">${privacy ? 'This policy explains what information Quicklly collects, why we use it, and the choices available to you.' : 'These terms govern your access to and use of Quicklly’s marketplace, applications, and related services.'}</p><h2 id="overview">1. Overview</h2><p>${privacy ? 'Quicklly provides a marketplace that connects customers with stores, products, and delivery services. We process information needed to operate the service, fulfill orders, prevent fraud, and improve the customer experience.' : 'By using Quicklly, you agree to these terms and the policies referenced here. You must be able to form a binding contract in your jurisdiction and provide accurate account and order information.'}</p><h2 id="information">2. ${privacy ? 'Information we collect' : 'Orders and marketplace services'}</h2><p>${privacy ? 'We may collect account details, contact information, delivery addresses, order history, support communications, and technical information about how you use the service.' : 'Product availability, pricing, delivery windows, fees, and minimums may vary by store and location. Your order is confirmed only after the applicable store accepts it.'}</p><ul><li>${privacy ? 'Information you provide directly.' : 'Review your cart before placing an order.'}</li><li>${privacy ? 'Order and transaction information.' : 'Follow store-specific return and substitution policies.'}</li><li>${privacy ? 'Device and usage data needed for security and performance.' : 'Contact support promptly if an order has a problem.'}</li></ul><h2 id="choices">3. Your choices</h2><p>${privacy ? 'You can update account details, manage communication preferences, and request access to or deletion of certain information, subject to legal and operational requirements.' : 'You may stop using the service at any time. Memberships renew according to the plan selected unless canceled before the next billing date.'}</p><h2 id="contact">4. Contact us</h2><p>Questions about this document can be sent through our <a href="contact.html" class="text-brand-dark underline">contact page</a>. This prototype copy should be reviewed by qualified legal counsel before production use.</p></article></div></main>`;
    }

    const categoryImages = {
        meal: image('photo-1589302168068-964664d93dc0', 1400),
        sweets: 'imgs/kaju_katli_sweets.png',
        roti: image('photo-1624300629298-e9de39c13be5', 1200),
        organic: 'https://cdn.quicklly.com/upload_images/product/thumb/1625754511-organic-grocery-box.png',
        gifting: image('photo-1549465220-1a8b9238cd48', 1200),
        aha: 'https://www.quicklly.com/images/aha/topannerwebsite1.webp'
    };

    function categoryHero(label, title, copy, heroImage, actionLabel = 'Shop the collection') {
        return `${breadcrumb(label)}<section class="max-w-[1360px] mx-auto px-4 md:px-8 py-8 md:py-12"><div class="grid lg:grid-cols-[.92fr_1.08fr] bg-neutral-50 min-h-[470px]"><div class="p-7 md:p-12 lg:p-16 flex flex-col justify-center"><span class="text-xs font-semibold tracking-wide text-brand-dark">${label.toUpperCase()}</span><h1 class="text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.04] mt-4 text-balance">${title}</h1><p class="text-neutral-600 text-base md:text-lg leading-8 mt-6 max-w-[55ch] text-pretty">${copy}</p><div class="mt-8"><a href="#shop" class="inline-flex rounded-full bg-neutral-950 text-white px-7 py-3.5 text-sm font-semibold hover:bg-neutral-800 transition-colors duration-150">${actionLabel}</a></div></div><div class="min-h-[340px]"><img src="${heroImage}" alt="${label}" class="size-full object-cover"></div></div></section>`;
    }

    function featureStrip(items) {
        return `<section class="border-y border-neutral-200"><div class="max-w-[1360px] mx-auto px-4 md:px-8 grid sm:grid-cols-2 lg:grid-cols-${items.length} divide-y sm:divide-y-0 sm:divide-x divide-neutral-200">${items.map(item => `<div class="py-6 sm:px-6 first:pl-0 flex gap-3"><iconify-icon icon="${item[0]}" width="23" class="text-brand-green shrink-0"></iconify-icon><div><h2 class="text-sm font-semibold">${item[1]}</h2><p class="text-xs text-neutral-500 mt-1 leading-5 text-pretty">${item[2]}</p></div></div>`).join('')}</div></section>`;
    }

    function commerceGrid(items, sectionTitle, sectionCopy = '') {
        return `<section id="shop" class="max-w-[1360px] mx-auto px-4 md:px-8 py-12 md:py-18"><div class="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-9"><div><span class="text-xs font-semibold text-brand-dark">SHOP THE RANGE</span><h2 class="text-3xl md:text-4xl font-semibold mt-3 text-balance">${sectionTitle}</h2>${sectionCopy ? `<p class="text-neutral-600 mt-3 text-pretty">${sectionCopy}</p>` : ''}</div><a href="shop-by-stores.html" class="self-start md:self-auto inline-flex items-center gap-2 rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold hover:border-brand-green transition-colors duration-150">Browse stores <iconify-icon icon="solar:arrow-right-linear" width="17"></iconify-icon></a></div><div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-10">${items.map((item, index) => `<article class="group min-w-0"><div class="relative aspect-square overflow-hidden bg-neutral-50"><img src="${item[0]}" alt="${item[1]}" class="size-full object-cover group-hover:scale-105 transition-transform duration-200" loading="lazy" decoding="async">${index < 2 ? '<span class="absolute top-3 left-3 rounded-full bg-white px-3 py-1 text-[11px] font-semibold">Popular</span>' : ''}<button type="button" data-quick-add class="absolute right-3 bottom-3 size-10 rounded-full bg-white border border-neutral-200 grid place-items-center hover:bg-brand-green hover:text-white hover:border-brand-green transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green" aria-label="Add ${item[1]} to cart"><iconify-icon icon="solar:add-circle-linear" width="21"></iconify-icon></button></div><p class="text-xs text-neutral-500 mt-4">${item[2]}</p><h3 class="text-sm md:text-base font-semibold mt-1 text-pretty">${item[1]}</h3><div class="flex items-center justify-between gap-3 mt-2"><p class="text-sm font-semibold tabular-nums">${item[3]}</p><span class="text-xs text-neutral-500">${item[4] || 'Delivery available'}</span></div></article>`).join('')}</div></section>`;
    }

    function renderMealKits() {
        const items = [
            [image('photo-1565557623262-b51c2513a641',700),'Butter Chicken with Pea Pilaf','Just Indian Meals','$14.99','2–3 days'],
            [image('photo-1589302168068-964664d93dc0',700),'Hyderabadi Chicken Biryani','Just Indian Meals','$14.99','2–3 days'],
            [image('photo-1631452180519-c014fe946bc7',700),'Paneer Tikka Masala','Just Indian Meals','$14.99','2–3 days'],
            [image('photo-1585937421612-70a008356fbe',700),'Chana Masala','Just Indian Meals','$14.99','2–3 days'],
            [image('photo-1626777552726-4a6b54c97e46',700),'Dal Makhani Meal','The Cumin Club','$7.99','Ships nationwide'],
            [image('photo-1596797038530-2c107229654b',700),'Palak Paneer Meal','The Cumin Club','$8.49','Ships nationwide'],
            [image('photo-1601050690597-df0568f70950',700),'Vegetable Samosa Kit','Just Indian Meals','$10.99','2–3 days'],
            [image('photo-1603894584373-5ac82b2ae398',700),'Chicken Tikka Masala','Just Indian Meals','$14.99','2–3 days']
        ];
        return `${categoryHero('Meal Kits','Real Indian meals. Weeknight effort.','Discover chef-prepared meal kits, complete thalis, and pantry-friendly regional meals from trusted Indian kitchens across the country.',categoryImages.meal,'Explore meal kits')}<main>${featureStrip([['solar:chef-hat-linear','Chef prepared','Balanced recipes and authentic flavors.'],['solar:clock-circle-linear','Ready in minutes','Easy cooking and reheating instructions.'],['solar:delivery-linear','Nationwide options','Select kits ship anywhere in the US.']])}${commerceGrid(items,'Popular Indian meal kits','Start with customer favorites from Just Indian Meals and The Cumin Club.')}<section class="bg-neutral-950 text-white"><div class="max-w-[1360px] mx-auto px-4 md:px-8 py-12 md:py-16 grid lg:grid-cols-[1fr_auto] gap-7 items-center"><div><span class="text-xs font-semibold text-brand-green">DINNER, SORTED</span><h2 class="text-3xl md:text-4xl font-semibold mt-3 text-balance">Stock the freezer with something worth looking forward to.</h2></div><a href="#shop" class="rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-center hover:bg-brand-dark transition-colors duration-150">Build your meal plan</a></div></section></main>`;
    }

    function renderIndianSweets() {
        const items = [
            ['imgs/kaju_katli_sweets.png','Premium Kaju Katli','Sukhadia','$14.99','Freshly packed'],
            [categoryImages.sweets,'Radiance Gift Box','Sukhadia','$28.79','Gift ready'],
            [image('photo-1579113800032-c38bd7635818',700),'Motichoor Laddoo','Fresh Mithai','$16.19','1 lb'],
            [image('photo-1601050690117-94f5f6fa8bd7',700),'Milk Cake','Fresh Mithai','$15.49','1 lb'],
            [image('photo-1626132647523-66f5bf380027',700),'Kaju Pista Roll','Premium Sweets','$18.99','1 lb'],
            [image('photo-1601050690117-94f5f6fa8bd7',700),'Besan Ladoo','Sukhadia','$16.19','1 lb'],
            [image('photo-1549465220-1a8b9238cd48',700),'Floral Gift Box','Sukhadia','$28.79','Gift ready'],
            [image('photo-1579113800032-c38bd7635818',700),'Assorted Fancy Sweet Box','Sukhadia','$14.99','6 pieces']
        ];
        return `${categoryHero('Indian Sweets','A sweeter way to celebrate.','Shop fresh mithai, regional classics, and beautifully packed gift boxes for festivals, family milestones, or an ordinary Tuesday.',categoryImages.sweets,'Shop Indian sweets')}<main>${featureStrip([['solar:verified-check-linear','Trusted sweet makers','Selected stores with fresh, careful packing.'],['solar:gift-linear','Ready to gift','Boxes for festivals and special occasions.'],['solar:box-linear','Shipped with care','Protective packing for nationwide delivery.']])}<section class="max-w-[1360px] mx-auto px-4 md:px-8 pt-12"><div class="flex gap-2 overflow-x-auto hide-scrollbar pb-2">${['All sweets','Festive specials','Burfi','Milk mithai','Laddoo','Dry fruit sweets'].map((label,index)=>`<button class="shrink-0 rounded-full px-5 py-2.5 text-sm font-medium ${index === 0 ? 'bg-neutral-950 text-white' : 'border border-neutral-300 hover:border-brand-green'} transition-colors duration-150">${label}</button>`).join('')}</div></section>${commerceGrid(items,'Fresh favorites and gift boxes','Traditional sweets from makers known for quality and freshness.')}</main>`;
    }

    function buildBoxPage(kind) {
        const roti = kind === 'roti-kit';
        const config = roti ? {
            label:'Roti Kit', title:'Fresh rotis, on your schedule.', copy:'Build a one-time or recurring box with tawa roti, paratha, thepla, bhakhri, and specialty flatbreads.', image:categoryImages.roti,
            categories:[['Fresh Tawa Roti','Soft everyday rotis'],['Whole Wheat Roti','Classic atta recipe'],['Multigrain Roti','A hearty grain blend'],['Paratha','Layered and flaky'],['Thepla','Spiced Gujarati flatbread'],['Bhakhri','Crisp, rustic rounds']]
        } : {
            label:'Organic', title:'Your organic pantry, built your way.', copy:'Choose certified organic Indian grocery essentials and set the delivery rhythm that fits your kitchen.', image:categoryImages.organic,
            categories:[['Organic Atta','Whole-grain flours'],['Rice & Grains','Basmati, millet, and more'],['Dals & Pulses','Everyday protein staples'],['Spices','Clean, aromatic essentials'],['Tea & Beverages','Organic daily favorites'],['Pantry Staples','Oils, snacks, and basics']]
        };
        return `${categoryHero(config.label,config.title,config.copy,config.image,'Build a box')}<main>${featureStrip([['solar:calendar-linear','Flexible frequency','One-time, weekly, bi-weekly, or monthly.'],['solar:box-linear','Build it your way','Choose the products your household uses.'],['solar:delivery-linear','Free standard shipping','$30 minimum; standard terms apply.']])}<section id="shop" class="max-w-[1360px] mx-auto px-4 md:px-8 py-12 md:py-18"><div class="grid lg:grid-cols-[.7fr_1.3fr] gap-10"><div><span class="text-xs font-semibold text-brand-dark">BUILD YOUR BOX</span><h2 class="text-3xl md:text-4xl font-semibold mt-3 text-balance">Start with what belongs in your kitchen.</h2><p class="text-neutral-600 leading-7 mt-4 text-pretty">Add favorites, select a frequency, and adjust or skip future boxes from your account.</p><a href="#box-options" class="inline-flex mt-7 rounded-full bg-neutral-950 text-white px-6 py-3 text-sm font-semibold hover:bg-neutral-800 transition-colors duration-150">Choose products</a></div><div id="box-options" class="grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-neutral-200 border border-neutral-200">${config.categories.map((item,index)=>`<article class="bg-white p-6"><span class="text-xs font-semibold text-brand-green tabular-nums">0${index+1}</span><h3 class="text-lg font-semibold mt-8">${item[0]}</h3><p class="text-sm text-neutral-500 mt-2">${item[1]}</p><button data-quick-add class="mt-6 text-sm font-semibold inline-flex items-center gap-2 hover:text-brand-dark transition-colors duration-150">Add to box <iconify-icon icon="solar:add-circle-linear" width="18"></iconify-icon></button></article>`).join('')}</div></div></section><section class="bg-neutral-50"><div class="max-w-[1360px] mx-auto px-4 md:px-8 py-12 md:py-16"><div class="grid md:grid-cols-3 gap-8">${[['01','Choose products','Pick the breads or pantry staples you use most.'],['02','Set a frequency','Select one-time, weekly, bi-weekly, or monthly.'],['03','We deliver','Your box is packed carefully and sent to your door.']].map(step=>`<article class="border-t-2 border-neutral-950 pt-6"><span class="text-sm font-semibold text-brand-dark">${step[0]}</span><h2 class="text-xl font-semibold mt-7">${step[1]}</h2><p class="text-sm text-neutral-600 leading-6 mt-2 text-pretty">${step[2]}</p></article>`).join('')}</div></div></section></main>`;
    }

    function renderGifting() {
        const gifts = [
            [image('photo-1549465220-1a8b9238cd48',700),'Radiance Celebration Box','Quicklly Moments','$69.00','Gift ready'],
            [image('photo-1513883049090-d0b7439799bf',700),'Red Wine & Roses','Quicklly Moments','$98.00','Scheduled delivery'],
            [image('photo-1522673607200-164d1b6ce486',700),'Birthday Treat Box','Quicklly Moments','$54.99','Personalizable'],
            [image('photo-1607344645866-009c320b63e0',700),'Tea & Mithai Hamper','Quicklly Moments','$42.99','Ships nationwide']
        ];
        return `${categoryHero('Gifting','A thoughtful surprise for every celebration.','Send sweets, flowers, personalized keepsakes, and curated food gifts for birthdays, festivals, anniversaries, and just-because moments.',categoryImages.gifting,'Find a gift')}<main>${featureStrip([['solar:pen-new-square-linear','Add a personal note','Make the moment feel unmistakably theirs.'],['solar:calendar-mark-linear','Schedule delivery','Choose the date that matters.'],['solar:map-point-linear','Send nationwide','Reach loved ones across the United States.']])}${commerceGrid(gifts,'Best-selling gifts','Curated moments designed to be easy to send and lovely to receive.')}<section class="max-w-[1360px] mx-auto px-4 md:px-8 pb-16"><div class="grid md:grid-cols-3 gap-px bg-neutral-200 border border-neutral-200">${[['Birthday','Bright, joyful gifts for their day.'],['Anniversary','A thoughtful way to mark the years.'],['Festival','Sweets and keepsakes for shared traditions.']].map((item,index)=>`<a href="#shop" class="bg-white p-7 md:p-9 group"><span class="text-xs font-semibold text-brand-dark">0${index+1}</span><h2 class="text-2xl font-semibold mt-10 group-hover:text-brand-dark transition-colors duration-150">${item[0]}</h2><p class="text-sm text-neutral-500 mt-2">${item[1]}</p></a>`).join('')}</div></section></main>`;
    }

    function renderAha() {
        const plans = [['Gold — 1 Year','$47.99','$59.99','20% off'],['Gold — 1 Month','$12.99','$14.99','Flexible'],['Telugu — 1 Year','$31.99','$39.99','20% off'],['Telugu — 1 Month','$6.99','$7.99','Flexible']];
        return `${breadcrumb('Aha')}<section class="max-w-[1360px] mx-auto px-4 md:px-8 py-8 md:py-12"><div class="relative min-h-[500px] bg-neutral-950 overflow-hidden"><img src="${categoryImages.aha}" alt="Aha streaming entertainment" class="absolute inset-0 size-full object-cover opacity-55"><div class="absolute inset-0 bg-black/35"></div><div class="relative min-h-[500px] p-7 md:p-14 lg:p-16 flex flex-col justify-end text-white max-w-3xl"><span class="text-xs font-semibold text-brand-green">AHA SUBSCRIPTION</span><h1 class="text-4xl md:text-6xl font-semibold leading-[1.04] mt-4 text-balance">Big stories. One simple subscription.</h1><p class="text-neutral-200 text-lg leading-8 mt-6 max-w-[54ch] text-pretty">Stream Telugu and Tamil movies, originals, and shows with a digital subscription code delivered after purchase.</p><a href="#plans" class="self-start mt-8 rounded-full bg-brand-green px-7 py-3.5 text-sm font-semibold hover:bg-brand-dark transition-colors duration-150">Choose a plan</a></div></div></section><main><section id="plans" class="max-w-[1360px] mx-auto px-4 md:px-8 py-12 md:py-16"><div class="max-w-2xl"><span class="text-xs font-semibold text-brand-dark">SUBSCRIPTION PLANS</span><h2 class="text-3xl md:text-4xl font-semibold mt-3 text-balance">Pick the access that fits.</h2></div><div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200 border border-neutral-200 mt-9">${plans.map((plan,index)=>`<article class="bg-white p-7"><span class="inline-flex rounded-full ${index===0?'bg-brand-light text-brand-dark':'bg-neutral-100 text-neutral-600'} px-3 py-1 text-xs font-semibold">${plan[3]}</span><h3 class="text-lg font-semibold mt-8">${plan[0]}</h3><p class="text-3xl font-semibold tabular-nums mt-5">${plan[1]}</p><p class="text-sm text-neutral-400 line-through tabular-nums mt-1">${plan[2]}</p><button data-quick-add class="w-full mt-7 rounded-full bg-neutral-950 text-white py-3 text-sm font-semibold hover:bg-neutral-800 transition-colors duration-150">Select plan</button></article>`).join('')}</div></section><section class="bg-neutral-50"><div class="max-w-[1360px] mx-auto px-4 md:px-8 py-12 md:py-16"><h2 class="text-3xl font-semibold text-balance">How to redeem</h2><div class="grid md:grid-cols-4 gap-8 mt-9">${[['01','Choose a plan'],['02','Receive your code'],['03','Redeem it on Aha'],['04','Start streaming']].map(step=>`<div class="border-t-2 border-neutral-950 pt-5"><span class="text-xs font-semibold text-brand-dark">${step[0]}</span><h3 class="text-lg font-semibold mt-7">${step[1]}</h3></div>`).join('')}</div></div></section></main>`;
    }

    function renderCatering() {
        const items = [
            [image('photo-1565557623262-b51c2513a641',700),'Butter Chicken','Quicklly Catering','$119.99','Serves 8–10'],
            [image('photo-1603894584373-5ac82b2ae398',700),'Chicken Tikka','Quicklly Catering','$119.99','Serves 8–10'],
            [image('photo-1631452180519-c014fe946bc7',700),'Paneer Tikka Masala','Quicklly Catering','$109.99','Serves 8–10'],
            [image('photo-1596797038530-2c107229654b',700),'Palak Paneer','Quicklly Catering','$109.99','Serves 8–10'],
            [image('photo-1601050690597-df0568f70950',700),'Potato & Pea Samosas','Quicklly Catering','$119.99','Party tray'],
            [image('photo-1585937421612-70a008356fbe',700),'Chana Masala','Quicklly Catering','$109.99','Serves 8–10'],
            [image('photo-1589302168068-964664d93dc0',700),'Pea Pilaf','Quicklly Catering','$119.99','Party tray'],
            [image('photo-1626132647523-66f5bf380027',700),'Paneer Tikka Samosas','Quicklly Catering','$119.99','Party tray']
        ];
        return `${categoryHero('Catering','Bring everyone to the table.','Build a generous Indian menu for office lunches, family gatherings, and celebrations with crowd-ready entrees, rice, breads, and starters.',image('photo-1512152272829-e3139592d56f',1400),'Shop catering')}<main>${featureStrip([['solar:users-group-two-rounded-linear','Sized for groups','Clear serving guidance for every tray.'],['solar:shield-check-linear','Dietary details','Halal, vegetarian, and gluten-free choices.'],['solar:calendar-linear','Plan ahead','Schedule orders for your event date.']])}${commerceGrid(items,'Catering favorites','Mix mains, sides, and starters into a menu your whole group will enjoy.')}<section class="bg-neutral-50"><div class="max-w-[1360px] mx-auto px-4 md:px-8 py-12 md:py-16 grid lg:grid-cols-[1fr_auto] items-center gap-8"><div><span class="text-xs font-semibold text-brand-dark">NEED A HAND?</span><h2 class="text-3xl md:text-4xl font-semibold mt-3 text-balance">Tell us your headcount. We’ll help shape the menu.</h2><p class="text-neutral-600 mt-3">Ideal for larger orders, dietary questions, or delivery coordination.</p></div><a href="contact.html" class="rounded-full bg-neutral-950 text-white px-7 py-3.5 text-sm font-semibold text-center hover:bg-neutral-800 transition-colors duration-150">Plan an event</a></div></section></main>`;
    }

    function renderEvents() {
        const events = [
            ['SEP 06','Bollywood Night Live','Chicago, IL','Music & nightlife'],
            ['SEP 14','South Asian Food Festival','Edison, NJ','Food & community'],
            ['OCT 03','Garba Under the Stars','Dallas, TX','Festival'],
            ['OCT 18','Diwali Makers Market','Seattle, WA','Shopping & culture']
        ];
        return `${editorialHero('EVENTS & EXPERIENCES','Culture feels better in person.','Discover concerts, festive gatherings, food events, workshops, and community experiences curated for South Asian audiences across the United States.',image('photo-1501386761578-eac5c94b800a',1400),'<a href="#events" class="inline-flex rounded-full bg-neutral-950 text-white px-7 py-3.5 text-sm font-semibold hover:bg-neutral-800 transition-colors duration-150">Browse events</a>')}<main>${featureStrip([['solar:ticket-sale-linear','Curated access','Events selected for relevance and community value.'],['solar:map-point-linear','Discover nearby','Availability follows your selected location.'],['solar:calendar-mark-linear','Plan ahead','Clear dates, venues, and ticket details before checkout.']])}<section id="events" class="max-w-[1360px] mx-auto px-4 md:px-8 py-12 md:py-16"><div class="flex items-end justify-between gap-6 mb-8"><div><span class="text-xs font-semibold text-brand-dark">UPCOMING</span><h2 class="text-3xl md:text-4xl font-semibold mt-3 text-balance">Find your next gathering</h2></div><a href="contact.html" class="hidden sm:inline-flex text-sm font-semibold hover:text-brand-dark">List an event</a></div><div class="grid md:grid-cols-2 gap-px bg-neutral-200 border border-neutral-200">${events.map((event,index)=>`<article class="bg-white p-7 md:p-9 flex gap-6"><div class="size-20 shrink-0 bg-neutral-950 text-white grid place-items-center text-center"><span class="text-sm font-semibold tabular-nums">${event[0]}</span></div><div><span class="text-xs font-semibold text-brand-dark">${event[3]}</span><h3 class="text-xl font-semibold mt-2 text-balance">${event[1]}</h3><p class="text-sm text-neutral-500 mt-2">${event[2]}</p><button data-quick-add class="mt-5 text-sm font-semibold inline-flex items-center gap-2">Save event <iconify-icon icon="solar:bookmark-linear" width="18"></iconify-icon></button></div></article>`).join('')}</div></section></main>`;
    }

    function renderAstrology() {
        const services = [
            ['solar:stars-line-linear','Live astrology consultation','One-to-one guidance with a practitioner selected for your language and question.','From $29'],
            ['solar:calendar-search-linear','Muhurat & date selection','Find an auspicious date for a wedding, home, business, or important milestone.','From $19'],
            ['solar:document-text-linear','Personalized birth chart','Receive a prepared report covering key placements, periods, and practical themes.','From $39'],
            ['solar:fire-square-linear','Guided online puja','Book a priest, share the sankalp details, and join the ritual remotely.','From $79']
        ];
        return `${editorialHero('ASTROLOGY & PUJA','Guidance grounded in tradition.','Connect with trusted astrologers and priests for personal consultations, reports, auspicious planning, and guided puja services from home.',image('photo-1533130061792-64b345e4a833',1400),'<a href="#services" class="inline-flex rounded-full bg-neutral-950 text-white px-7 py-3.5 text-sm font-semibold hover:bg-neutral-800 transition-colors duration-150">Explore services</a>')}<main>${featureStrip([['solar:verified-check-linear','Verified practitioners','Profiles include language, specialty, and service details.'],['solar:videocamera-record-linear','Join from home','Online sessions and pujas are designed for remote participation.'],['solar:shield-check-linear','Private by design','Personal details are requested only when a service requires them.']])}<section id="services" class="max-w-[1360px] mx-auto px-4 md:px-8 py-12 md:py-16"><div class="grid sm:grid-cols-2 gap-px bg-neutral-200 border border-neutral-200">${services.map(service=>`<article class="bg-white p-7 md:p-9"><iconify-icon icon="${service[0]}" width="30" class="text-brand-green"></iconify-icon><h2 class="text-xl font-semibold mt-7 text-balance">${service[1]}</h2><p class="text-sm leading-6 text-neutral-600 mt-3 text-pretty">${service[2]}</p><div class="mt-7 flex items-center justify-between gap-4"><span class="text-sm font-semibold tabular-nums">${service[3]}</span><button data-auth-open class="rounded-full bg-neutral-950 text-white px-5 py-2.5 text-sm font-semibold hover:bg-neutral-800 transition-colors duration-150">Book service</button></div></article>`).join('')}</div></section></main>`;
    }

    function renderChaiTeaCoffee() {
        const config = {
            label: 'Chai, Tea & Coffee Kits',
            title: 'Build a better daily ritual.',
            copy: 'Choose masala chai, single-origin tea, filter coffee, and thoughtful accompaniments, then set the delivery frequency that works for your home.',
            image: image('photo-1571934811356-5cc061b6821f',1400),
            categories: [['Masala chai','Spiced blends and easy brew kits.'],['Loose-leaf tea','Black, green, and herbal selections.'],['Indian coffee','Filter coffee and roasted blends.'],['Sweeteners','Jaggery, sugar, and honey pairings.'],['Serveware','Strainers, cups, and brewing tools.'],['Snack pairings','Biscuits and savory tea-time picks.']]
        };
        return buildBoxPageFromConfig(config);
    }

    function buildBoxPageFromConfig(config) {
        return `${categoryHero(config.label,config.title,config.copy,config.image,'Build a box')}<main>${featureStrip([['solar:calendar-linear','Flexible frequency','One-time, weekly, bi-weekly, or monthly.'],['solar:box-linear','Mix across makers','A single box can include products from the same subscription store.'],['solar:delivery-linear','Clear delivery dates','Choose the first delivery date before adding the box to cart.']])}<section id="shop" class="max-w-[1360px] mx-auto px-4 md:px-8 py-12 md:py-16"><div class="grid lg:grid-cols-[.72fr_1.28fr] gap-10"><div><span class="text-xs font-semibold text-brand-dark">BUILD YOUR BOX</span><h2 class="text-3xl md:text-4xl font-semibold mt-3 text-balance">Your shelf, on your schedule.</h2><p class="text-neutral-600 leading-7 mt-4 text-pretty">Pick products first, then choose one-time, weekly, bi-weekly, or monthly delivery. Subscription pricing and future orders stay visible in your account.</p><a href="#box-options" class="inline-flex mt-7 rounded-full bg-neutral-950 text-white px-6 py-3 text-sm font-semibold hover:bg-neutral-800 transition-colors duration-150">Choose products</a></div><div id="box-options" class="grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-neutral-200 border border-neutral-200">${config.categories.map((item,index)=>`<article class="bg-white p-6"><span class="text-xs font-semibold text-brand-green tabular-nums">0${index+1}</span><h3 class="text-lg font-semibold mt-8 text-balance">${item[0]}</h3><p class="text-sm text-neutral-500 mt-2 text-pretty">${item[1]}</p><button data-quick-add class="mt-6 text-sm font-semibold inline-flex items-center gap-2">Add to box <iconify-icon icon="solar:add-circle-linear" width="18"></iconify-icon></button></article>`).join('')}</div></div></section></main>`;
    }

    function renderLuxury() {
        const pieces = [
            [image('photo-1583391733956-6c78276477e2',700),'Handwoven Silk Saree','Very Much Indian','$189.00','Limited edition'],
            [image('photo-1602173574767-37ac01994b2a',700),'Heritage Jewelry Set','Only Luxury','$149.00','Gift ready'],
            [image('photo-1601972599720-36938d4ecd31',700),'Celebration Keepsake Box','Only Luxury','$89.00','Curated set'],
            [image('photo-1590736969955-71cc94901144',700),'Brass Puja Collection','Shubhpuja','$119.00','Ships nationwide']
        ];
        return `${categoryHero('Only Luxury','Objects worth keeping.','Explore a curated edit of premium Indian fashion, jewelry, gifting, home, and celebration pieces from specialist makers.',image('photo-1610030469983-98e550d6193c',1400),'Shop the collection')}<main>${featureStrip([['solar:verified-check-linear','Curated makers','Every seller is reviewed for quality and fulfillment.'],['solar:gift-linear','Presentation ready','Premium packaging and gifting options are clearly marked.'],['solar:delivery-linear','Protected delivery','Shipping timelines and handling requirements are shown per store.']])}${commerceGrid(pieces,'The luxury edit','Distinctive pieces selected for weddings, festivals, gifting, and the home.')}<section class="bg-neutral-950 text-white"><div class="max-w-[1360px] mx-auto px-4 md:px-8 py-12 md:py-16 grid lg:grid-cols-[1fr_auto] gap-7 items-center"><div><span class="text-xs font-semibold text-brand-green">CONCIERGE</span><h2 class="text-3xl md:text-4xl font-semibold mt-3 text-balance">Need help choosing a meaningful gift?</h2><p class="text-neutral-400 mt-3 text-pretty">Tell us the occasion, budget, and delivery date.</p></div><a href="contact.html" class="rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-center hover:bg-brand-dark transition-colors duration-150">Ask the team</a></div></section></main>`;
    }

    function renderPage() {
        if (pageKey === 'shop-by-stores') return renderStores();
        if (pageKey === 'deals') return renderDeals(false);
        if (pageKey === 'search-results') return renderDeals(true);
        if (pageKey === 'quicklly-pass') return renderPass();
        if (['refer-a-friend','brand-ambassador','student-ambassador','be-a-hero'].includes(pageKey)) return renderProgram(pageKey);
        if (pageKey === 'about') return renderAbout();
        if (pageKey === 'contact') return renderContact();
        if (pageKey === 'faq') return renderFaq();
        if (pageKey === 'careers') return renderCareers();
        if (pageKey === 'blog' || pageKey === 'press') return renderEditorial(pageKey);
        if (pageKey === 'reviews') return renderReviews();
        if (pageKey === 'meal-kits') return renderMealKits();
        if (pageKey === 'indian-sweets') return renderIndianSweets();
        if (pageKey === 'roti-kit' || pageKey === 'organic') return buildBoxPage(pageKey);
        if (pageKey === 'gifting') return renderGifting();
        if (pageKey === 'aha') return renderAha();
        if (pageKey === 'catering') return renderCatering();
        if (pageKey === 'events') return renderEvents();
        if (pageKey === 'astrology') return renderAstrology();
        if (pageKey === 'chai-tea-coffee') return renderChaiTeaCoffee();
        if (pageKey === 'only-luxury') return renderLuxury();
        if (pageKey === 'privacy' || pageKey === 'terms') return renderLegal(pageKey);
        return renderAbout();
    }

    function updateLinks(root) {
        const links = {
            'Quicklly': 'index.html', 'Grocery': 'category.html', 'Meal Kits': 'meal-kits.html', 'Meal Kit': 'meal-kits.html', 'Indian Sweets': 'indian-sweets.html', 'Indian Sweets & Snacks': 'indian-sweets.html', 'Roti Kit': 'roti-kit.html', 'Organic': 'organic.html', 'Organic Grocery': 'organic.html', 'Gifting': 'gifting.html', 'Aha': 'aha.html', 'aha': 'aha.html', 'Catering': 'catering.html', 'Astrology': 'astrology.html', 'Events': 'events.html', 'Chai Tea & Coffee Kit': 'chai-tea-coffee.html', 'Only Luxury': 'only-luxury.html',
            'Quicklly Pass': 'quicklly-pass.html', 'About Us': 'about.html', 'Careers': 'careers.html', 'Press': 'press.html', 'Blog': 'blog.html', 'Contact Us': 'contact.html', 'Help Center': 'faq.html', 'Privacy Policy': 'privacy.html', 'Terms of Service': 'terms.html',
            'Grocery Stores': 'shop-by-stores.html', 'Grocery Delivery': 'category.html', 'Nationwide Shipping': 'shop-by-stores.html', 'Corporate Gifting': 'category.html', 'Return Policy': 'faq.html', 'Sell on Quicklly': 'contact.html', 'Become a Driver': 'contact.html', 'Affiliate Program': 'contact.html', 'Accessibility': 'privacy.html', 'Brand Ambassador': 'brand-ambassador.html', 'Student Ambassador': 'student-ambassador.html', 'Be a Hero': 'be-a-hero.html', 'Refer a Friend': 'refer-a-friend.html', 'Your Account': 'my-account.html', 'My Account': 'my-account.html', 'Orders': 'my-orders.html', 'Sign Out': 'index.html'
        };
        root.querySelectorAll('a').forEach((anchor) => {
            const label = anchor.textContent.trim().replace(/\s+/g, ' ');
            const imageAlt = anchor.querySelector('img')?.alt;
            if (links[label]) anchor.href = links[label];
            else if (imageAlt === 'Quicklly') anchor.href = 'index.html';
        });
    }

    function bindShellInteractions() {
        const drawer = document.getElementById('side-drawer');
        const backdrop = document.getElementById('side-drawer-backdrop');
        const openDrawer = () => { drawer?.classList.remove('-translate-x-full'); backdrop?.classList.remove('opacity-0','pointer-events-none'); };
        const closeDrawer = () => { drawer?.classList.add('-translate-x-full'); backdrop?.classList.add('opacity-0','pointer-events-none'); };
        document.getElementById('all-categories-btn')?.addEventListener('click', openDrawer);
        document.getElementById('mobile-menu-btn')?.addEventListener('click', openDrawer);
        document.getElementById('close-drawer-btn')?.addEventListener('click', closeDrawer);
        backdrop?.addEventListener('click', closeDrawer);

        const addressBackdrop = document.getElementById('address-modal-backdrop');
        const addressModal = document.getElementById('address-modal');
        const openAddress = () => {
            addressBackdrop?.classList.remove('opacity-0','pointer-events-none');
            addressBackdrop?.setAttribute('aria-hidden','false');
            addressModal?.classList.remove('scale-95','opacity-0');
        };
        const closeAddress = () => {
            addressBackdrop?.classList.add('opacity-0','pointer-events-none');
            addressBackdrop?.setAttribute('aria-hidden','true');
            addressModal?.classList.add('scale-95','opacity-0');
        };
        const location = document.getElementById('location-selector-btn');
        location?.removeAttribute('onclick');
        location?.addEventListener('click', openAddress);
        document.getElementById('close-address-modal-btn')?.addEventListener('click', closeAddress);
        addressBackdrop?.addEventListener('click', event => { if (event.target === addressBackdrop) closeAddress(); });

        const searchInput = document.querySelector('header input[placeholder*="Search groceries"]');
        const searchButton = searchInput?.parentElement.querySelector('button');
        searchButton?.addEventListener('click', () => { window.location.href = 'search-results.html'; });
        searchInput?.addEventListener('keydown', event => { if (event.key === 'Enter') window.location.href = 'search-results.html'; });
        document.querySelectorAll('[data-auth-open]').forEach(button => button.addEventListener('click', () => window.QuickllyAuth?.open('login')));
        window.QuickllyAuth?.bindTriggers();

        const form = document.getElementById('contact-form');
        form?.addEventListener('submit', event => {
            event.preventDefault();
            const error = document.getElementById('contact-error');
            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const message = document.getElementById('contact-message').value.trim();
            const valid = name.length > 1 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && message.length > 9;
            error.textContent = valid ? 'Prototype only — connect this form to your support service before launch.' : 'Enter your name, a valid email, and a short message.';
            error.classList.remove('hidden');
            error.classList.toggle('text-red-700', !valid);
            error.classList.toggle('text-brand-dark', valid);
        });

        document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeDrawer(); closeAddress(); } });
    }

    async function mount() {
        const app = document.getElementById('app');
        try {
            const response = await fetch('index.html');
            if (!response.ok) throw new Error('Could not load shared shell');
            const source = new DOMParser().parseFromString(await response.text(), 'text/html');
            const promo = source.body.firstElementChild;
            const header = source.querySelector('#main-header');
            const footer = source.querySelector('footer');
            const drawerBackdrop = source.querySelector('#side-drawer-backdrop');
            const drawer = source.querySelector('#side-drawer');
            const address = source.querySelector('#address-modal-backdrop');
            if (!promo || !header || !footer || !drawerBackdrop || !drawer) throw new Error('Shared shell is incomplete');

            const pageHtml = renderPage().replace(/<main(\s[^>]*)?>/g, '<div$1>').replace(/<\/main>/g, '</div>');
            app.className = '';
            app.removeAttribute('aria-live');
            app.innerHTML = `${promo.outerHTML}${header.outerHTML}<main id="main-content">${pageHtml}</main>${footer.outerHTML}${drawerBackdrop.outerHTML}${drawer.outerHTML}${address ? address.outerHTML : ''}`;
            updateLinks(app);
            bindShellInteractions();
            document.title = `${pageMeta[pageKey]?.[0] || 'Quicklly'} | Quicklly`;
        } catch (error) {
            app.innerHTML = `<main class="min-h-dvh grid place-items-center px-6 text-center"><div><img src="imgs/quicly-logo-black.png" alt="Quicklly" class="h-10 w-auto mx-auto"><h1 class="text-2xl font-semibold mt-8">This page could not load</h1><p class="text-neutral-500 mt-3">Run the project through a local web server so the shared Quicklly shell can be loaded.</p><a href="index.html" class="inline-flex mt-6 rounded-full bg-neutral-950 text-white px-6 py-3 text-sm font-semibold">Return home</a></div></main>`;
        }
    }

    mount();
})();
