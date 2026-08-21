(function () {
    'use strict';

    const destinations = {
        'Grocery': 'shop-by-stores.html?view=grocery',
        'Meal Kits': 'meal-kits.html',
        'Meal Kit': 'meal-kits.html',
        'Indian Sweets': 'indian-sweets.html',
        'Indian Sweets & Snacks': 'indian-sweets.html',
        'Roti Kit': 'roti-kit.html',
        'Organic': 'organic.html',
        'Organic Grocery': 'organic.html',
        'Gifting': 'gifting.html',
        'Restaurant': 'food-delivery.html',
        'Food Delivery': 'food-delivery.html',
        'Aha': 'aha.html',
        'aha': 'aha.html',
        'Catering': 'catering.html',
        'Astrology': 'astrology.html',
        'Events': 'events.html',
        'Chai Tea & Coffee Kit': 'chai-tea-coffee.html',
        'Only Luxury': 'only-luxury.html',
        'Quicklly Pass': 'quicklly-pass.html',
        'View all plans': 'quicklly-pass.html',
        'Grocery Stores': 'shop-by-stores.html?view=stores',
        'About Us': 'about.html',
        'Careers': 'careers.html',
        'Press': 'press.html',
        'Blog': 'blog.html',
        'Contact Us': 'contact.html',
        'Grocery Delivery': 'shop-by-stores.html?view=grocery',
        'Nationwide Shipping': 'direct-from-india.html',
        'Corporate Gifting': 'gifting.html',
        'Track Order': 'order-tracking.html',
        'Return Policy': 'order-help.html',
        'Sell on Quicklly': 'contact.html',
        'Become a Driver': 'contact.html',
        'Affiliate Program': 'contact.html',
        'Accessibility': 'privacy.html',
        'Help Center': 'faq.html',
        'Privacy Policy': 'privacy.html',
        'Terms of Service': 'terms.html',
        'Brand Ambassador': 'brand-ambassador.html',
        'Student Ambassador': 'student-ambassador.html',
        'Be a Hero': 'be-a-hero.html',
        'Refer a Friend': 'refer-a-friend.html',
        'Your Account': 'my-account.html',
        'My Account': 'my-account.html',
        'Orders': 'my-orders.html',
        'My Orders': 'my-orders.html',
        'My Upcoming Orders': 'my-upcoming-orders.html',
        'Upcoming order': 'my-upcoming-orders.html',
        'My Wishlist': 'my-wishlist.html',
        'Circle Rewards': 'circle-rewards.html',
        'Gift Cards': 'gift-cards.html',
        'Change Password': 'change-password.html',
        'Shubhpuja Order': 'shubhpuja-orders.html',
        'Shubhpuja Orders': 'shubhpuja-orders.html',
        'Buy It Again': 'past-products.html',
        'Buy it again': 'past-products.html',
        'Past Products': 'past-products.html',
        'Keep Shopping': 'keep-shopping.html',
        'Direct From India': 'direct-from-india.html',
        'Ready-to-Eat': 'ready-to-eat.html',
        'Continue Shopping': 'shop-by-stores.html?view=grocery',
        'Sign Out': 'index.html'
    };

    const groceryDepartments = [
        ['festive', 'Rakhi Specials', 'https://cdn.quicklly.com/upload_images/category/thumb/rakhi-specials-grocery-icon.png?v=1'],
        ['grocery', 'Grocery', 'https://cdn.quicklly.com/upload_images/category/thumb/grocery-icon.png?v=1'],
        ['fresh', 'Go Fresh', 'https://cdn.quicklly.com/upload_images/category/thumb/freshproduce-icon.png?v=1'],
        ['beverages', 'Foods & Beverages', 'https://cdn.quicklly.com/upload_images/category/thumb/bevarage-icon.png?v=1'],
        ['meat', 'Meat Products', 'https://cdn.quicklly.com/upload_images/category/thumb/meat-icon.png?v=1'],
        ['organic', 'Organic', 'https://cdn.quicklly.com/upload_images/category/thumb/organic.png?v=1'],
        ['personal-care', 'Personal Care', 'https://cdn.quicklly.com/upload_images/category/thumb/personalcare-icon.png?v=1'],
        ['household', 'Household', 'https://cdn.quicklly.com/upload_images/category/thumb/household-icon.png?v=1']
    ];

    const groceryStores = [
        ['fresh-farms', 'Fresh Farms', 'Min cart $30 · Same Day Delivery', '4.7', 'https://cdn.quicklly.com/seller/upload_images/store/1646062868-fresh-farmsbanner.jpg', 'https://cdn.quicklly.com/seller/upload_images/store/ff.png'],
        ['quicklly-indian-grocery', 'Quicklly Bazaar Chicago', 'Min cart $30 · Same Day Delivery', '4.3', 'https://cdn.quicklly.com/seller/upload_images/store/1754924067-quicklly-bazaar-chicagobanner.jpg', 'https://cdn.quicklly.com/seller/upload_images/store/1754923750-quicklly-bazaar-chicago.png'],
        ['patel-brothers', 'World Fresh Market', 'Min cart $30 · Same Day Delivery', '4.0', 'https://cdn.quicklly.com/seller/upload_images/store/1646063039-world-fresh-marketbanner.jpg', 'https://cdn.quicklly.com/seller/upload_images/store/1601862199-world-fresh-market.png'],
        ['kamdar-plaza', 'Metro Spice Mart', 'Min cart $30 · Same Day Delivery', '4.0', 'https://cdn.quicklly.com/seller/upload_images/store/1759949079-metro-spice-martbanner.jpg', 'https://cdn.quicklly.com/seller/upload_images/store/1758653125-metro-spice-mart.png'],
        ['very-much-indian', 'Al Noor Meat Market', 'Min cart $10 · Same Day Delivery', '4.3', 'https://cdn.quicklly.com/seller/upload_images/store/1646063069-al-noor-meat-marketbanner.jpg', 'https://cdn.quicklly.com/seller/upload_images/store/1706648482-al-noor-meat-market.png'],
        ['almond-house', 'Sundarbans Fish Bazar', 'Min cart $10 · Same Day Delivery', '3.7', 'https://cdn.quicklly.com/seller/upload_images/store/1646063244-sundarbans-fish-bazarbanner.jpg', 'https://cdn.quicklly.com/seller/upload_images/store/1599070362-sundarbans-fish-bazar.png'],
        ['masalas', 'Masalas', 'Min cart $10 · Same Day Delivery', '3.9', 'https://cdn.quicklly.com/seller/upload_images/store/1646063190-masalasbanner.jpg', 'https://cdn.quicklly.com/seller/upload_images/store/1607637070-masalas.png'],
        ['farm-supermarket', 'Farm Supermarket', 'Min cart $30 · Same Day Delivery', '3.3', 'https://cdn.quicklly.com/seller/upload_images/store/1766339382-farm-supermarketbanner.jpg', 'https://cdn.quicklly.com/seller/upload_images/store/1763679830-farm-supermarket.png'],
        ['kabul-mart', 'Kabul Mart', 'Min cart $30 · Same Day Delivery', '2.3', 'https://cdn.quicklly.com/seller/upload_images/store/1766339499-kabul-martbanner.jpg', 'https://cdn.quicklly.com/seller/upload_images/store/1763679903-kabul-mart.png'],
        ['al-tayyab', 'Al-Tayyab Zabiha Halal Meat and Grocery', 'Min cart $30 · Same Day Delivery', '2.2', 'https://cdn.quicklly.com/seller/upload_images/store/1766339558-al-tayyab-zabiha-halal-meat-and-grocerybanner.jpg', 'https://cdn.quicklly.com/seller/upload_images/store/1763679973-al-tayyab-zabiha-halal-meat-and-grocery.png'],
        ['awami-bazaar', 'Awami Bazaar', 'Min cart $30 · Same Day Delivery', '2.7', 'https://cdn.quicklly.com/seller/upload_images/store/1766339748-awami-bazaarbanner.jpg', 'https://cdn.quicklly.com/seller/upload_images/store/1763680169-awami-bazaar.png']
    ];

    const groceryProducts = [
        ['2', 'https://cdn.quicklly.com/upload_images/product/thumb/1774638886-aashirvaad-whole-wheat-atta.png', 'Aashirvaad Whole Wheat Atta', '10 lbs', '$12.99'],
        ['5', 'https://cdn.quicklly.com/upload_images/product/thumb/1699556455-royal-basmati-rice.jfif', 'Royal Basmati Rice', '10 lbs', '$18.99'],
        ['1', 'https://cdn.quicklly.com/upload_images/product/thumb/1633030828-mdh-garam-masala.jpg', 'MDH Garam Masala', '100 g', '$2.99'],
        ['4', 'https://cdn.quicklly.com/upload_images/product/thumb/1758653790-haldirams-aloo-bhujia.jpg', 'Haldiram’s Aloo Bhujia', '400 g', '$4.49'],
        ['3', 'https://cdn.quicklly.com/upload_images/product/thumb/1732998932-taj-mahal-tea.jpg', 'Brooke Bond Taj Mahal Tea', '900 g', '$13.59']
    ];

    function groceryStoreCard(store, hidden) {
        return `<a href="category.html?store=${store[0]}" data-preserve-href data-grocery-store data-store-name="${store[1].toLowerCase()}" ${hidden ? 'hidden' : ''} class="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-4" aria-label="Shop ${store[1]}"><div class="relative aspect-[1.85/1] rounded-lg bg-neutral-100"><img src="${store[4]}" alt="${store[1]} storefront" class="size-full rounded-lg object-cover transition-transform duration-200 group-hover:scale-[1.02]" loading="lazy" decoding="async"><span class="absolute -bottom-9 left-4 grid size-[76px] place-items-center overflow-hidden rounded-full border-4 border-white bg-white shadow-sm"><img src="${store[5]}" alt="" class="size-full rounded-lg object-cover" loading="lazy" decoding="async"></span></div><div class="flex items-start justify-between gap-4 pl-[104px] pt-3"><div><h3 class="text-lg font-semibold text-balance transition-colors group-hover:text-brand-dark">${store[1]}</h3><p class="mt-1 text-sm text-neutral-500 text-pretty">${store[2]}</p></div><span class="flex shrink-0 items-center gap-1 text-sm font-semibold tabular-nums"><iconify-icon icon="solar:star-bold" width="16" class="text-brand-green"></iconify-icon>${store[3]}</span></div></a>`;
    }

    function groceryProductCard(product, storeSlug, storeName) {
        return `<article data-product-card data-store-name="${storeName}" class="group min-w-0"><div class="relative aspect-square overflow-hidden bg-neutral-50"><a href="product-details.html?store=${storeSlug}&product=${product[0]}" data-preserve-href class="block size-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green" aria-label="View ${product[2]}"><img src="${product[1]}" alt="${product[2]}" class="size-full object-contain p-5 transition-transform duration-200 group-hover:scale-105" loading="lazy" decoding="async"></a><button type="button" data-add-product data-product-id="${product[0]}-${storeSlug}" class="absolute bottom-3 right-3 grid size-11 place-items-center rounded-full border border-neutral-200 bg-white text-neutral-900 transition-colors duration-150 hover:border-brand-green hover:bg-brand-green hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2" aria-label="Add ${product[2]} to cart"><iconify-icon icon="solar:add-circle-linear" width="23"></iconify-icon></button></div><p class="mt-4 text-xs text-neutral-500">${storeName}</p><h3 class="mt-1 text-sm font-semibold text-pretty">${product[2]}</h3><p class="mt-1 text-xs text-neutral-500">${product[3]}</p><p class="mt-2 text-sm font-semibold tabular-nums">${product[4]}</p></article>`;
    }

    function renderGroceryLanding() {
        const main = document.getElementById('main-content');
        if (!main) return;
        const selectedDepartment = new URLSearchParams(window.location.search).get('department') || 'grocery';
        const departments = groceryDepartments.map((department) => `<a href="shop-by-stores.html?view=grocery&department=${department[0]}" data-preserve-href class="group min-w-0 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-4" ${department[0] === selectedDepartment ? 'aria-current="page"' : ''}><span class="mx-auto grid aspect-square w-full max-w-40 place-items-center overflow-hidden rounded-full border ${department[0] === selectedDepartment ? 'border-brand-green ring-2 ring-brand-green/20' : 'border-neutral-200 group-hover:border-brand-green'} bg-neutral-50 transition-colors duration-150"><img src="${department[2]}" alt="" class="size-[74%] object-contain" loading="lazy" decoding="async"></span><span class="mt-3 block text-sm font-semibold text-balance ${department[0] === selectedDepartment ? 'text-brand-dark' : 'text-neutral-800'}">${department[1]}</span></a>`).join('');
        const previewStores = groceryStores.map((store, index) => groceryStoreCard(store, index > 3)).join('');
        const freshProducts = groceryProducts.slice(0, 5).map((product) => groceryProductCard(product, 'fresh-farms', 'Fresh Farms')).join('');
        const bazaarProducts = [...groceryProducts.slice(2), ...groceryProducts.slice(0, 2)].map((product) => groceryProductCard(product, 'quicklly-indian-grocery', 'Quicklly Bazaar Chicago')).join('');

        main.innerHTML = `<nav aria-label="Breadcrumb" class="mx-auto max-w-[1360px] px-4 pt-5 md:px-8"><ol class="flex items-center gap-2 text-xs text-neutral-500"><li><a href="index.html" class="transition-colors hover:text-brand-green">Home</a></li><li aria-hidden="true"><iconify-icon icon="solar:alt-arrow-right-linear" width="12"></iconify-icon></li><li class="font-medium text-neutral-900">Indian Grocery Delivery Chicago IL</li></ol></nav><section class="mx-auto max-w-[1360px] px-4 py-10 md:px-8 md:py-14"><div class="max-w-3xl"><span class="text-xs font-semibold text-brand-dark">SHOP GROCERY</span><h1 class="mt-3 text-4xl font-semibold text-balance md:text-5xl">Grocery</h1><p class="mt-4 text-base leading-7 text-neutral-600 text-pretty">Choose what you’re shopping for, then select a nearby store and browse the categories and items it carries.</p></div><div class="mt-9 grid grid-cols-3 gap-x-4 gap-y-7 sm:grid-cols-4 lg:grid-cols-7" aria-label="Grocery departments">${departments}</div></section><section class="border-y border-neutral-200 bg-neutral-50"><div class="mx-auto max-w-[1360px] px-4 py-10 md:px-8 md:py-14"><div class="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div><span class="text-xs font-semibold text-brand-dark">NEAR 60601</span><h2 class="mt-3 text-3xl font-semibold text-balance md:text-4xl">Grocery stores near you</h2></div><div class="flex w-full flex-col gap-3 sm:flex-row md:w-auto md:items-center"><label class="relative block w-full md:w-72"><span class="sr-only">Search grocery stores</span><iconify-icon icon="solar:magnifer-linear" width="18" class="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"></iconify-icon><input type="search" data-store-search placeholder="Search stores" class="w-full rounded-full border border-neutral-300 bg-white py-2.5 pl-11 pr-4 text-sm outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"></label><button type="button" data-view-all-stores aria-expanded="false" class="shrink-0 rounded-full border border-neutral-300 bg-white px-5 py-2.5 text-sm font-semibold transition-colors duration-150 hover:border-brand-green hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green">View All</button></div></div><div data-store-grid class="mt-9 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">${previewStores}</div><p data-store-empty hidden class="mt-8 text-sm text-neutral-500" role="status">No grocery stores match your search.</p></div></section><section class="mx-auto max-w-[1360px] px-4 py-12 md:px-8 md:py-16"><div class="flex items-end justify-between gap-5"><div><span class="text-xs font-semibold text-brand-dark">POPULAR NEAR YOU</span><h2 class="mt-3 text-3xl font-semibold text-balance md:text-4xl">Popular grocery stores</h2></div></div><section class="mt-10 border-t border-neutral-200 pt-8" aria-labelledby="fresh-farms-title"><div class="mb-7 flex items-center justify-between gap-5"><div><h3 id="fresh-farms-title" class="text-2xl font-semibold">Fresh Farms</h3><p class="mt-1 text-sm text-neutral-500">Fresh produce, pantry essentials, and everyday favorites.</p></div><a href="category.html?store=fresh-farms" data-preserve-href class="shrink-0 text-sm font-semibold text-brand-dark underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green">View All</a></div><div class="grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-3 lg:grid-cols-5">${freshProducts}</div></section><section class="mt-14 border-t border-neutral-200 pt-8" aria-labelledby="bazaar-title"><div class="mb-7 flex items-center justify-between gap-5"><div><h3 id="bazaar-title" class="text-2xl font-semibold">Quicklly Bazaar Chicago</h3><p class="mt-1 text-sm text-neutral-500">Indian grocery staples delivered from a local favorite.</p></div><a href="category.html?store=quicklly-indian-grocery" data-preserve-href class="shrink-0 text-sm font-semibold text-brand-dark underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green">View All</a></div><div class="grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-3 lg:grid-cols-5">${bazaarProducts}</div></section></section>`;

        main.querySelector('[aria-label="Grocery departments"]')?.classList.replace('lg:grid-cols-7', 'lg:grid-cols-8');
        main.querySelectorAll('[data-grocery-store]').forEach((storeLink) => {
            storeLink.href = `${storeLink.getAttribute('href')}&department=${selectedDepartment}`;
        });
        const viewAll = main.querySelector('[data-view-all-stores]');
        const search = main.querySelector('[data-store-search]');
        const cards = Array.from(main.querySelectorAll('[data-grocery-store]'));
        const empty = main.querySelector('[data-store-empty]');
        let expanded = false;

        const updateStores = () => {
            const query = search.value.trim().toLowerCase();
            let visible = 0;
            cards.forEach((card, index) => {
                const matches = card.dataset.storeName.includes(query);
                const shouldShow = matches && (expanded || query || index < 4);
                card.hidden = !shouldShow;
                if (shouldShow) visible += 1;
            });
            empty.hidden = visible !== 0;
        };
        viewAll.addEventListener('click', () => {
            expanded = !expanded;
            viewAll.setAttribute('aria-expanded', String(expanded));
            viewAll.textContent = expanded ? 'Show Less' : 'View All';
            updateStores();
        });
        search.addEventListener('input', updateStores);
        document.title = 'Grocery | Quicklly';
    }

    function renderShopByStores() {
        const main = document.getElementById('main-content');
        if (!main) return;
        const storeCards = groceryStores.map((store) => groceryStoreCard(store, false)).join('');
        const beyond = [
            ['organic.html', 'Organic Grocery', 'Pantry and produce from specialist organic sellers.', 'solar:leaf-linear'],
            ['meal-kits.html', 'Meal Kit', 'Ready-to-cook meals from trusted kitchens.', 'solar:chef-hat-linear'],
            ['indian-sweets.html', 'Indian Sweets & Snacks', 'Fresh mithai, namkeen, and celebration boxes.', 'solar:gift-linear'],
            ['roti-kit.html', 'Roti Kit', 'Fresh rotis and flexible recurring boxes.', 'solar:box-linear']
        ].map((item) => `<a href="${item[0]}" data-preserve-href class="group border-t border-neutral-200 py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"><iconify-icon icon="${item[3]}" width="24" class="text-brand-green"></iconify-icon><h3 class="mt-4 text-xl font-semibold text-balance group-hover:text-brand-dark">${item[1]}</h3><p class="mt-2 text-sm leading-6 text-neutral-500 text-pretty">${item[2]}</p></a>`).join('');
        main.innerHTML = `<nav aria-label="Breadcrumb" class="mx-auto max-w-[1360px] px-4 pt-5 md:px-8"><ol class="flex items-center gap-2 text-xs text-neutral-500"><li><a href="index.html" class="hover:text-brand-green">Home</a></li><li aria-hidden="true"><iconify-icon icon="solar:alt-arrow-right-linear" width="12"></iconify-icon></li><li class="font-medium text-neutral-900">Shop by Stores</li></ol></nav><section class="mx-auto max-w-[1360px] px-4 py-10 md:px-8 md:py-14"><div class="flex flex-col gap-6 border-b border-neutral-200 pb-9 md:flex-row md:items-end md:justify-between"><div><span class="text-xs font-semibold text-brand-dark">SHOP BY STORE</span><h1 class="mt-3 text-4xl font-semibold text-balance md:text-5xl">Grocery Stores Near You</h1><p class="mt-4 max-w-2xl text-neutral-600 text-pretty">Choose a local store first, then browse its categories and the items currently available there.</p></div><label class="relative block w-full md:w-80"><span class="sr-only">Search grocery stores</span><iconify-icon icon="solar:magnifer-linear" width="18" class="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"></iconify-icon><input type="search" data-all-store-search placeholder="Search stores" class="w-full rounded-full border border-neutral-300 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"></label></div><div data-all-store-grid class="mt-9 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">${storeCards}</div><section class="mt-16 border-t border-neutral-300 pt-10"><span class="text-xs font-semibold text-brand-dark">MORE ON QUICKLLY</span><h2 class="mt-3 text-3xl font-semibold text-balance md:text-4xl">Shop Beyond Grocery</h2><div class="mt-8 grid gap-x-8 md:grid-cols-2 lg:grid-cols-4">${beyond}</div></section></section>`;
        const search = main.querySelector('[data-all-store-search]');
        const cards = Array.from(main.querySelectorAll('[data-grocery-store]'));
        search.addEventListener('input', () => {
            const query = search.value.trim().toLowerCase();
            cards.forEach((card) => { card.hidden = !card.dataset.storeName.includes(query); });
        });
        document.title = 'Shop by Stores | Quicklly';
    }

    function alignAccountDashboard() {
        if (document.body.dataset.page !== 'my-account') return;
        const main = document.getElementById('main-content');
        const heading = main?.querySelector('h1');
        const header = heading?.closest('div.flex.flex-col');
        if (!main || !heading || !header || main.querySelector('[data-dashboard-overview]')) return;
        const eyebrow = header.querySelector('span.text-xs');
        const description = heading.nextElementSibling;
        if (eyebrow) eyebrow.textContent = 'ACCOUNT DASHBOARD';
        if (description) description.textContent = 'Review recent activity and update the information used across your Quicklly orders.';
        header.insertAdjacentHTML('afterend', '<section data-dashboard-overview class="mt-8" aria-labelledby="recent-orders-heading"><div class="flex items-end justify-between gap-4"><div><h2 id="recent-orders-heading" class="text-xl font-semibold text-balance">Recent Orders</h2><p class="mt-1 text-sm text-neutral-500 text-pretty">Your latest grocery, food, gifting, and subscription activity.</p></div><a href="my-orders.html" data-preserve-href class="text-sm font-semibold text-brand-dark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green">View All</a></div><a href="order-details.html" data-preserve-href class="mt-5 grid gap-3 border-y border-neutral-200 py-5 transition-colors hover:bg-neutral-50 sm:grid-cols-[1fr_.8fr_.8fr_auto] sm:items-center"><div><p class="text-xs text-neutral-500">ORDER ID</p><p class="mt-1 font-semibold tabular-nums">QL-84627</p></div><div><p class="text-xs text-neutral-500">DATE</p><p class="mt-1 text-sm tabular-nums">Aug 8, 2026</p></div><div><p class="text-xs text-neutral-500">TOTAL · STATUS</p><p class="mt-1 text-sm font-semibold">$96.15 · Delivered</p></div><span class="text-sm font-semibold text-brand-dark">View order</span></a></section>');
        const addressSection = main.querySelector('#address-heading')?.closest('section');
        addressSection?.insertAdjacentHTML('beforebegin', '<section data-account-balances class="mt-10 grid gap-px border border-neutral-200 bg-neutral-200 sm:grid-cols-2" aria-label="Account balances"><article class="bg-white p-6"><div class="flex items-center justify-between gap-4"><div><p class="text-xs font-semibold text-brand-dark">REWARD POINTS</p><h2 class="mt-3 text-xl font-semibold">Circle Rewards</h2></div><iconify-icon icon="solar:medal-ribbons-star-linear" width="26" class="text-brand-green"></iconify-icon></div><p class="mt-5 text-3xl font-semibold tabular-nums">0</p><a href="circle-rewards.html" data-preserve-href class="mt-4 inline-flex text-sm font-semibold text-brand-dark hover:underline">View rewards</a></article><article class="bg-white p-6"><div class="flex items-center justify-between gap-4"><div><p class="text-xs font-semibold text-brand-dark">YOUR WALLET</p><h2 class="mt-3 text-xl font-semibold">Wallet Balance</h2></div><iconify-icon icon="solar:wallet-money-linear" width="26" class="text-brand-green"></iconify-icon></div><p class="mt-5 text-3xl font-semibold tabular-nums">$0.00</p><p class="mt-4 text-sm text-neutral-500 text-pretty">Wallet credit appears here after refunds or account adjustments.</p></article></section>');
    }

    function connectRestaurantListing() {
        if (document.body.dataset.page !== 'food-delivery') return;
        const slugs = ['tandoor-char-house', 'mysore-woodlands', 'biryani-corner'];
        Array.from(document.querySelectorAll('main a')).filter((anchor) => anchor.textContent.trim() === 'View Menu').forEach((anchor, index) => {
            anchor.href = `store-details.html?type=restaurant&restaurant=${slugs[index]}`;
            anchor.setAttribute('data-preserve-href', '');
        });
    }

    function renderRestaurantMenu() {
        if (document.body.dataset.page !== 'store-details') return;
        const params = new URLSearchParams(window.location.search);
        if (params.get('type') !== 'restaurant') return;
        const restaurants = {
            'tandoor-char-house': ['Tandoor Char House', 'North Indian · Halal', '★ 4.8', '25–35 min', '$2.99 delivery'],
            'mysore-woodlands': ['Mysore Woodlands', 'South Indian · Vegetarian', '★ 4.7', '35–45 min', 'Free delivery'],
            'biryani-corner': ['Biryani Corner', 'Hyderabadi · Halal', '★ 4.6', '30–40 min', '$1.99 delivery']
        };
        const selected = restaurants[params.get('restaurant')] || restaurants['tandoor-char-house'];
        const dishes = [
            ['butter-chicken', 'Butter Chicken', 'Tender chicken · tomato cream sauce', '$16.99', 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&q=82&w=640'],
            ['paneer-tikka', 'Paneer Tikka Masala', 'Vegetarian · creamy tomato curry', '$14.99', 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=82&w=640'],
            ['chicken-biryani', 'Hyderabadi Chicken Biryani', 'Basmati rice · raita included', '$17.49', 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&q=82&w=640'],
            ['masala-dosa', 'Masala Dosa', 'Potato masala · sambar · chutney', '$12.99', 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=82&w=640'],
            ['garlic-naan', 'Garlic Naan', 'Tandoor baked · garlic butter', '$4.49', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=82&w=640'],
            ['mango-lassi', 'Mango Lassi', 'Yogurt · mango · cardamom', '$5.49', 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=82&w=640']
        ];
        const cards = dishes.map((dish) => `<article data-product-card data-store-name="${selected[0]}" class="grid gap-4 border-t border-neutral-200 py-5 sm:grid-cols-[132px_1fr_auto] sm:items-center"><img src="${dish[4]}" alt="${dish[1]}" class="aspect-square size-full max-w-36 object-cover"><div><h3 class="text-lg font-semibold text-balance">${dish[1]}</h3><p class="mt-2 text-sm text-neutral-500 text-pretty">${dish[2]}</p><p class="mt-3 font-semibold tabular-nums">${dish[3]}</p></div><button type="button" data-add-product data-product-id="${dish[0]}-${params.get('restaurant') || 'tandoor-char-house'}" class="inline-flex min-h-11 items-center justify-center rounded-full bg-neutral-950 px-5 text-sm font-semibold text-white hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green" aria-label="Add ${dish[1]} to cart">Add</button></article>`).join('');
        const main = document.getElementById('main-content');
        main.innerHTML = `<nav aria-label="Breadcrumb" class="mx-auto max-w-[1360px] px-4 pt-5 md:px-8"><ol class="flex flex-wrap items-center gap-2 text-xs text-neutral-500"><li><a href="index.html" class="hover:text-brand-dark">Home</a></li><li aria-hidden="true">/</li><li><a href="food-delivery.html" data-preserve-href class="hover:text-brand-dark">Indian Food Delivery</a></li><li aria-hidden="true">/</li><li aria-current="page" class="font-medium text-neutral-950">${selected[0]}</li></ol></nav><main><section class="mx-auto max-w-[1180px] px-4 py-8 md:px-8 md:py-12"><header class="grid gap-6 border-b border-neutral-200 pb-8 md:grid-cols-[1fr_auto] md:items-end"><div><p class="text-xs font-semibold text-brand-dark">RESTAURANT MENU</p><h1 class="mt-3 text-4xl font-semibold text-balance md:text-5xl">${selected[0]}</h1><p class="mt-3 text-neutral-600 text-pretty">${selected[1]}</p><div class="mt-4 flex flex-wrap gap-5 text-sm"><span class="font-semibold tabular-nums">${selected[2]}</span><span>${selected[3]}</span><span>${selected[4]}</span></div></div><a href="food-delivery.html" data-preserve-href class="inline-flex min-h-11 items-center justify-center rounded-full border border-neutral-300 px-5 text-sm font-semibold hover:border-brand-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green">Back to restaurants</a></header><div class="mt-7 flex gap-2 overflow-x-auto" role="tablist" aria-label="Menu categories">${['Popular','Starters','Entrees','Breads','Drinks'].map((label, index) => `<button type="button" data-store-category="${label}" aria-selected="${index === 0}" class="shrink-0 rounded-full border px-4 py-2 text-sm font-semibold ${index === 0 ? 'border-neutral-950 bg-neutral-950 text-white' : 'border-neutral-300'}">${label}</button>`).join('')}</div><section class="mt-8" aria-labelledby="menu-heading"><h2 id="menu-heading" class="text-2xl font-semibold text-balance">Popular dishes</h2><div class="mt-5">${cards}</div></section></section></main>`;
        document.title = `${selected[0]} Menu | Quicklly`;
    }

    function connectPages() {
        const promo = document.querySelector('body > div.bg-neutral-900');
        promo?.querySelector('button[aria-label="Dismiss"]')?.addEventListener('click', () => promo.remove());

        const header = document.getElementById('main-header');
        const updateHeaderShadow = () => header?.classList.toggle('shadow-sm', window.scrollY > 10);
        updateHeaderShadow();
        window.addEventListener('scroll', updateHeaderShadow, { passive: true });

        document.querySelectorAll('a').forEach((anchor) => {
            if (anchor.hasAttribute('data-preserve-href')) return;
            const label = anchor.textContent.trim().replace(/\s+/g, ' ');
            const explicitHref = anchor.getAttribute('href') || '';
            const accountDashboardLink = label === 'Quicklly Pass' && explicitHref.includes('quicklly-pass-dashboard');
            if (destinations[label] && !accountDashboardLink) anchor.href = destinations[label];
            if (anchor.querySelector('img[alt="Quicklly"]')) anchor.href = 'index.html';
        });

        const categoryHeading = Array.from(document.querySelectorAll('#side-drawer h3')).find((heading) => heading.textContent.trim() === 'Shop by Category');
        const categoryList = categoryHeading?.closest('div.py-4')?.querySelector('ul');
        if (categoryList && !Array.from(categoryList.querySelectorAll('a')).some((anchor) => anchor.textContent.trim() === 'Restaurant')) {
            const eventsItem = Array.from(categoryList.querySelectorAll('a')).find((anchor) => anchor.textContent.trim() === 'Events')?.closest('li');
            eventsItem?.insertAdjacentHTML('afterend', '<li><a href="food-delivery.html" data-preserve-href class="group flex items-center justify-between rounded-xl px-2.5 py-2 transition-colors hover:bg-neutral-200/50"><span class="flex items-center gap-3"><iconify-icon icon="solar:chef-hat-linear" width="20" class="text-neutral-700 transition-colors group-hover:text-brand-green"></iconify-icon><span>Restaurant</span></span><iconify-icon icon="solar:alt-arrow-right-linear" width="16" class="text-neutral-400 transition-colors group-hover:text-neutral-600"></iconify-icon></a></li>');
        }

        alignAccountDashboard();
        connectRestaurantListing();
        renderRestaurantMenu();

        if (document.body.dataset.page === 'shop-by-stores') {
            const view = new URLSearchParams(window.location.search).get('view');
            if (view === 'grocery') renderGroceryLanding();
            else renderShopByStores();
        }

        document.querySelectorAll('button').forEach((button) => {
            const label = button.textContent.trim().replace(/\s+/g, ' ');
            if (label === 'View Offers' || label === 'Shop the Sale') button.addEventListener('click', () => { window.location.href = 'deals.html'; });
            if (label === 'Shop Groceries') button.addEventListener('click', () => { window.location.href = 'shop-by-stores.html?view=grocery'; });
            if (label === 'Explore Meal Kits') button.addEventListener('click', () => { window.location.href = 'meal-kits.html'; });
            if (label === 'Shop Sweets') button.addEventListener('click', () => { window.location.href = 'indian-sweets.html'; });
            if (label.includes('Join for') || label === 'Join Quicklly Pass') button.addEventListener('click', () => { window.location.href = 'quicklly-pass.html'; });
        });

        document.querySelectorAll('a[aria-label="Instagram"], a[aria-label="Facebook"], a[aria-label="Twitter"]').forEach((anchor) => {
            anchor.href = 'contact.html';
        });

        const search = document.querySelector('header input[placeholder*="Search groceries"]');
        const searchButton = search?.parentElement.querySelector('button');
        const submitSearch = () => {
            const query = search?.value.trim() || '';
            window.location.href = `search-results.html${query ? `?q=${encodeURIComponent(query)}` : ''}`;
        };
        search?.setAttribute('aria-label', 'Search groceries and stores');
        searchButton?.setAttribute('aria-label', 'Submit grocery search');
        searchButton?.addEventListener('click', submitSearch);
        search?.addEventListener('keydown', (event) => { if (event.key === 'Enter') submitSearch(); });

        document.querySelectorAll('button, a').forEach((control) => {
            control.classList.add('quicklly-control');
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', connectPages);
    else connectPages();
})();
