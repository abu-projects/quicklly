import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));

const pages = {
    'my-account': ['My Account', renderAccount],
    'refer-a-friend': ['Refer a Friend', renderReferFriend],
    'be-a-hero': ['Be a Hero', renderBeHero],
    'my-orders': ['My Orders', renderOrders],
    'my-upcoming-orders': ['My Upcoming Orders', renderUpcomingOrders],
    'my-wishlist': ['My Wishlist', renderWishlist],
    'circle-rewards': ['Circle Rewards', renderRewards],
    'gift-cards': ['Gift Cards', renderGiftCards],
    'quicklly-pass-dashboard': ['Quicklly Pass', renderPassDashboard],
    'shubhpuja-orders': ['Shubhpuja Orders', renderPujaOrders],
    'change-password': ['Change Password', renderChangePassword]
};

const accountItems = [
    ['my-account', 'my-account.html', 'My Account', 'solar:user-circle-linear'],
    ['refer-a-friend', 'refer-a-friend.html', 'Refer a Friend', 'solar:users-group-two-rounded-linear'],
    ['be-a-hero', 'be-a-hero.html', 'Be a Hero', 'solar:heart-linear'],
    ['my-orders', 'my-orders.html', 'My Orders', 'solar:box-linear'],
    ['my-upcoming-orders', 'my-upcoming-orders.html', 'My Upcoming Orders', 'solar:calendar-mark-linear'],
    ['my-wishlist', 'my-wishlist.html', 'My Wishlist', 'solar:heart-angle-linear'],
    ['circle-rewards', 'circle-rewards.html', 'Circle Rewards', 'solar:wallet-money-linear'],
    ['gift-cards', 'gift-cards.html', 'Gift Cards', 'solar:gift-linear'],
    ['quicklly-pass-dashboard', 'quicklly-pass-dashboard.html', 'Quicklly Pass', 'solar:crown-star-linear'],
    ['shubhpuja-orders', 'shubhpuja-orders.html', 'Shubhpuja Orders', 'solar:stars-line-linear'],
    ['change-password', 'change-password.html', 'Change Password', 'solar:lock-password-linear']
];

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

function accountNav(pageKey) {
    const items = accountItems.map(([key, href, label, icon]) => {
        const active = key === pageKey;
        return `<a href="${href}" data-preserve-href ${active ? 'aria-current="page"' : ''} class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${active ? 'bg-neutral-950 text-white' : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950'} transition-colors duration-150"><iconify-icon icon="${icon}" width="19" class="shrink-0 ${active ? 'text-brand-green' : 'text-neutral-500'}"></iconify-icon><span>${label}</span></a>`;
    }).join('');

    return `<aside class="lg:sticky lg:top-32 self-start border border-neutral-200 bg-white">
        <div class="p-5 border-b border-neutral-200 flex items-center gap-3">
            <span class="size-11 rounded-full bg-brand-light text-brand-dark grid place-items-center font-semibold" aria-hidden="true">A</span>
            <div class="min-w-0"><p class="text-sm font-semibold truncate">Abu Designs</p><p class="text-xs text-neutral-500 mt-0.5">Quicklly customer</p></div>
        </div>
        <button id="account-nav-toggle" type="button" class="lg:hidden w-full px-5 py-3 flex items-center justify-between text-sm font-semibold" aria-expanded="false" aria-controls="account-nav"><span>Account menu</span><iconify-icon icon="solar:alt-arrow-down-linear" width="18"></iconify-icon></button>
        <nav id="account-nav" class="hidden lg:block p-3 space-y-1" aria-label="My Account">${items}<div class="pt-2 mt-2 border-t border-neutral-200"><button type="button" data-account-signout class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950 transition-colors duration-150"><iconify-icon icon="solar:logout-3-linear" width="19" class="text-neutral-500"></iconify-icon><span>Sign Out</span></button></div></nav>
    </aside>`;
}

function pageIntro(eyebrow, title, copy, action = '') {
    return `<div class="flex flex-col md:flex-row md:items-end justify-between gap-5 pb-7 border-b border-neutral-200"><div><span class="text-xs font-semibold text-brand-dark">${eyebrow}</span><h1 class="text-3xl md:text-4xl font-semibold mt-3 text-balance">${title}</h1><p class="text-sm md:text-base text-neutral-600 mt-3 max-w-2xl text-pretty">${copy}</p></div>${action}</div>`;
}

function renderAccount() {
    return `${pageIntro('ACCOUNT INFORMATION','Hello, Abu.','Keep your contact information and delivery preferences ready for a faster checkout.')}<form id="account-profile-form" class="mt-8 space-y-8" novalidate><section aria-labelledby="profile-heading"><div class="flex items-center justify-between gap-4 mb-5"><div><h2 id="profile-heading" class="text-xl font-semibold text-balance">Profile details</h2><p class="text-sm text-neutral-500 mt-1 text-pretty">Prototype values are used here; connect these fields to the customer profile API.</p></div><span class="rounded-full bg-brand-light text-brand-dark px-3 py-1 text-xs font-semibold">Verified account</span></div><div class="grid sm:grid-cols-2 gap-5"><label class="block text-sm font-medium text-neutral-800">First name<input name="firstName" value="Abu" autocomplete="given-name" class="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"></label><label class="block text-sm font-medium text-neutral-800">Last name<input name="lastName" value="Designs" autocomplete="family-name" class="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"></label><label class="block text-sm font-medium text-neutral-800">Email address<input name="email" value="abu@quicklly.demo" type="email" autocomplete="email" class="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"></label><label class="block text-sm font-medium text-neutral-800">Phone number<input name="phone" value="(216) 555-0142" type="tel" autocomplete="tel" class="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"></label></div><p id="profile-form-status" class="mt-3 min-h-5 text-sm" aria-live="polite"></p><button type="submit" class="rounded-full bg-neutral-950 text-white px-6 py-3 text-sm font-semibold hover:bg-neutral-800 transition-colors duration-150">Save changes</button></section></form><section class="mt-10 pt-8 border-t border-neutral-200" aria-labelledby="address-heading"><div class="flex items-end justify-between gap-4"><div><h2 id="address-heading" class="text-xl font-semibold text-balance">Saved addresses</h2><p class="text-sm text-neutral-500 mt-1">Store availability and delivery promises are calculated from the selected address.</p></div><button type="button" data-account-action="address" class="text-sm font-semibold text-brand-dark hover:underline">Add address</button></div><div class="grid sm:grid-cols-2 gap-4 mt-5"><article class="border-2 border-brand-green p-5"><div class="flex items-start justify-between gap-4"><div><span class="text-xs font-semibold text-brand-dark">DEFAULT</span><h3 class="font-semibold mt-2">Home</h3><p class="text-sm text-neutral-500 mt-2 text-pretty">Cleveland, Ohio · 44111</p></div><iconify-icon icon="solar:check-circle-bold" width="22" class="text-brand-green"></iconify-icon></div><button type="button" data-account-action="edit-address" class="mt-5 text-sm font-semibold">Edit address</button></article><article class="border border-dashed border-neutral-300 p-5 min-h-40 flex flex-col items-center justify-center text-center"><iconify-icon icon="solar:add-circle-linear" width="28" class="text-neutral-400"></iconify-icon><h3 class="font-semibold mt-3">Add another address</h3><p class="text-sm text-neutral-500 mt-1">See a different set of nearby stores.</p><button type="button" data-account-action="address" class="mt-4 text-sm font-semibold text-brand-dark">Add address</button></article></div></section>`;
}

function renderReferFriend() {
    const steps = [
        ['01', 'Share your link', 'Send your personal referral link to friends who are new to Quicklly.'],
        ['02', 'They save $10', 'Your friend gets $10 off their first qualifying order.'],
        ['03', 'You earn $10', 'Your reward is added after their first qualifying delivery is complete.']
    ];
    return `${pageIntro('REFER A FRIEND','Good food is better shared.','Invite friends without leaving your account. Track the offer, copy your personal link, and review the reward rules in one place.')}<section class="mt-8 grid gap-6 xl:grid-cols-[1.15fr_.85fr]" aria-labelledby="referral-link-heading"><div class="bg-neutral-950 p-6 text-white md:p-8"><span class="text-xs font-semibold text-brand-green">YOUR PERSONAL LINK</span><h2 id="referral-link-heading" class="mt-4 text-2xl font-semibold text-balance">Give $10. Get $10.</h2><p class="mt-3 max-w-xl text-sm leading-6 text-neutral-300 text-pretty">Friends receive $10 off their first qualifying order. You receive $10 after that order is delivered.</p><div class="mt-7 flex flex-col gap-3 sm:flex-row"><label class="min-w-0 flex-1"><span class="sr-only">Referral link</span><input data-referral-link readonly value="https://quicklly.com/refer/GOODFOOD10" class="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-white"></label><button type="button" data-copy-account-referral class="min-h-12 rounded-full bg-brand-green px-6 text-sm font-semibold text-white hover:bg-brand-dark">Copy link</button></div><p data-referral-status class="mt-3 min-h-5 text-sm text-brand-green" aria-live="polite"></p></div><aside class="border border-neutral-200 p-6 md:p-8" aria-label="Referral reward"><p class="text-sm text-neutral-500">Available reward</p><p class="mt-2 text-4xl font-semibold tabular-nums">$10.00</p><p class="mt-5 text-sm leading-6 text-neutral-600 text-pretty">Rewards become wallet credit after the referred friend completes an eligible delivery.</p><a href="circle-rewards.html" class="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-neutral-300 px-5 text-sm font-semibold hover:border-brand-green">View referral history</a></aside></section><section class="mt-10" aria-labelledby="referral-steps-heading"><h2 id="referral-steps-heading" class="text-2xl font-semibold text-balance">How it works</h2><div class="mt-5 grid gap-px border border-neutral-200 bg-neutral-200 md:grid-cols-3">${steps.map(step => `<article class="bg-white p-6"><span class="text-sm font-semibold text-brand-dark tabular-nums">${step[0]}</span><h3 class="mt-7 text-lg font-semibold">${step[1]}</h3><p class="mt-2 text-sm leading-6 text-neutral-600 text-pretty">${step[2]}</p></article>`).join('')}</div></section>`;
}

function renderBeHero() {
    const ways = [
        ['solar:bag-heart-linear', 'Sponsor essentials', 'Help provide pantry staples and culturally familiar groceries to a participating family.'],
        ['solar:calendar-mark-linear', 'Support a celebration', 'Contribute toward food and supplies for community-led cultural celebrations.'],
        ['solar:users-group-rounded-linear', 'Volunteer locally', 'Join future packing, distribution, and neighborhood food-access events.']
    ];
    return `${pageIntro('COMMUNITY GIVING','Be a Hero','Choose how you would like to support food access and cultural celebrations while staying inside your Quicklly account.')}<section class="mt-8 bg-neutral-950 p-7 text-white md:p-10"><div class="grid gap-8 lg:grid-cols-[1fr_280px] lg:items-end"><div><span class="text-xs font-semibold text-brand-green">COMMUNITY IMPACT</span><h2 class="mt-4 text-3xl font-semibold text-balance">Help a family feel closer to home.</h2><p class="mt-4 max-w-2xl text-sm leading-7 text-neutral-300 text-pretty">Quicklly community initiatives connect groceries, celebration supplies, and volunteer support with trusted local partners.</p></div><div><p class="text-sm text-neutral-400">Families supported this season</p><p class="mt-2 text-4xl font-semibold tabular-nums">128</p></div></div></section><section class="mt-10" aria-labelledby="hero-ways-heading"><h2 id="hero-ways-heading" class="text-2xl font-semibold text-balance">Ways to get involved</h2><div class="mt-5 grid gap-5 md:grid-cols-3">${ways.map((way,index) => `<article class="border border-neutral-200 p-6"><iconify-icon icon="${way[0]}" width="28" class="text-brand-green"></iconify-icon><h3 class="mt-6 text-lg font-semibold">${way[1]}</h3><p class="mt-2 text-sm leading-6 text-neutral-600 text-pretty">${way[2]}</p><button type="button" data-hero-interest="${index}" aria-pressed="false" class="mt-6 min-h-11 rounded-full border border-neutral-300 px-5 text-sm font-semibold hover:border-brand-green">Select</button></article>`).join('')}</div><p data-hero-status class="mt-4 min-h-5 text-sm text-brand-dark" aria-live="polite"></p></section>`;
}

function renderOrders() {
    const orderCard = (number, date, status, total, type, stores) => `<article data-order-card data-order-type="${type}" class="border border-neutral-200"><div class="p-5 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-50"><div><p class="text-xs text-neutral-500">ORDER ${number}</p><h2 class="text-lg font-semibold mt-1">${date}</h2></div><div class="flex items-center gap-3"><span class="rounded-full px-3 py-1 text-xs font-semibold ${status === 'Delivered' ? 'bg-brand-light text-brand-dark' : 'bg-amber-50 text-amber-800'}">${status}</span><span class="font-semibold tabular-nums">${total}</span></div></div><div class="divide-y divide-neutral-200">${stores.map(store=>`<div class="p-5 md:p-6 flex items-start justify-between gap-5"><div><p class="font-semibold">${store[0]}</p><p class="text-sm text-neutral-500 mt-1">${store[1]}</p></div><span class="text-sm font-semibold tabular-nums">${store[2]}</span></div>`).join('')}</div><div class="px-5 py-4 md:px-6 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3"><p class="text-xs text-neutral-500">One payment · store-level fulfillment</p><a href="order-details.html" class="text-sm font-semibold text-brand-dark">View order details</a></div></article>`;
    return `${pageIntro('ORDER HISTORY','My Orders','Every checkout appears as one order while store-specific carts, delivery dates, and totals stay visible underneath.','<a href="category.html" class="inline-flex justify-center rounded-full bg-neutral-950 text-white px-6 py-3 text-sm font-semibold hover:bg-neutral-800 transition-colors duration-150">Shop again</a>')}<div class="mt-7 flex flex-wrap gap-2" aria-label="Order filters">${['All','Grocery','Subscriptions'].map((label,index)=>`<button type="button" data-order-filter="${label.toLowerCase()}" aria-pressed="${index===0}" class="rounded-full border px-4 py-2 text-sm font-medium ${index===0?'bg-neutral-950 text-white border-neutral-950':'border-neutral-300'}">${label}</button>`).join('')}</div><div class="mt-6 space-y-5">${orderCard('#QL-83412','August 8, 2026','Delivered','$92.46','grocery',[['Quicklly Indian Grocery Nationwide','5 grocery items · delivered Aug 12','$48.47'],['The Baklava Box','1 one-time box · delivered Aug 15','$43.99']])}${orderCard('#QL-82984','July 24, 2026','Delivered','$31.99','subscriptions',[['aha','Telugu annual prepaid code','$31.99']])}${orderCard('#QL-82115','June 29, 2026','Processing','$64.00','grocery',[['Mithaas','Celebration sweets · nationwide shipping','$64.00']])}</div>`;
}

function renderUpcomingOrders() {
    const cards = [
        ['The Cumin Club','Monthly meal box','September 2, 2026','$54.99','Monthly'],
        ['The Chai Box','Masala chai collection','September 9, 2026','$29.09','Bi-weekly']
    ];
    return `${pageIntro('RECURRING DELIVERY','My Upcoming Orders','Manage the deliveries created by weekly, bi-weekly, or monthly product subscriptions.','<a href="chai-tea-coffee.html" class="inline-flex justify-center rounded-full border border-neutral-300 px-6 py-3 text-sm font-semibold hover:border-brand-green transition-colors duration-150">Browse subscriptions</a>')}<div class="mt-8 space-y-4">${cards.map(card=>`<article class="border border-neutral-200 p-5 md:p-7"><div class="flex flex-col md:flex-row md:items-center justify-between gap-5"><div><div class="flex flex-wrap items-center gap-2"><span class="rounded-full bg-brand-light text-brand-dark px-3 py-1 text-xs font-semibold">${card[4]}</span><span class="text-xs text-neutral-500">ACTIVE</span></div><h2 class="text-xl font-semibold mt-4">${card[0]}</h2><p class="text-sm text-neutral-500 mt-1">${card[1]}</p></div><div class="md:text-right"><p class="text-xs text-neutral-500">NEXT DELIVERY</p><p class="font-semibold mt-1 tabular-nums">${card[2]}</p><p class="text-sm font-semibold mt-2 tabular-nums">${card[3]}</p></div></div><div class="mt-6 pt-5 border-t border-neutral-200 flex flex-wrap gap-3"><button type="button" data-account-action="edit-subscription" class="rounded-full bg-neutral-950 text-white px-5 py-2.5 text-sm font-semibold">Edit box</button><button type="button" data-account-action="skip-delivery" class="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold">Skip this delivery</button><button type="button" data-account-action="pause-subscription" class="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold">Pause</button></div><p data-card-status class="mt-3 min-h-5 text-sm text-brand-dark" aria-live="polite"></p></article>`).join('')}</div>`;
}

function renderWishlist() {
    const products = [['imgs/aashirvaad_atta.png','Aashirvaad Whole Wheat Atta','Quicklly Market','$12.99'],['imgs/taj_mahal_tea.png','Brooke Bond Taj Mahal Tea','Quicklly Market','$13.59'],['imgs/kaju_katli_sweets.png','Premium Kaju Katli','Mithaas','$14.99']];
    return `${pageIntro('SAVED FOR LATER','My Wishlist','Products stay tied to their seller because price, stock, minimums, and delivery eligibility are store-specific.','<a href="category.html" class="inline-flex justify-center rounded-full bg-neutral-950 text-white px-6 py-3 text-sm font-semibold">Continue shopping</a>')}<div id="wishlist-grid" class="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">${products.map(product=>`<article class="border border-neutral-200 p-4" data-wishlist-card><div class="relative aspect-square bg-neutral-50"><img src="${product[0]}" alt="${product[1]}" class="size-full object-contain p-6"><button type="button" data-wishlist-toggle class="absolute right-3 top-3 size-10 rounded-full bg-white border border-neutral-200 grid place-items-center text-red-700" aria-label="Remove ${product[1]} from wishlist"><iconify-icon icon="solar:heart-bold" width="20"></iconify-icon></button></div><p class="text-xs text-neutral-500 mt-4">${product[2]}</p><h2 class="font-semibold mt-1 text-pretty">${product[1]}</h2><div class="mt-4 flex items-center justify-between gap-3"><span class="font-semibold tabular-nums">${product[3]}</span><button type="button" data-account-action="add-wishlist-cart" class="rounded-full bg-neutral-950 text-white px-4 py-2 text-sm font-semibold">Add to cart</button></div></article>`).join('')}</div><div id="wishlist-empty" class="hidden py-16 text-center border border-dashed border-neutral-300 mt-8"><iconify-icon icon="solar:heart-angle-linear" width="34" class="text-neutral-400"></iconify-icon><h2 class="text-xl font-semibold mt-4">Your wishlist is empty</h2><p class="text-sm text-neutral-500 mt-2">Save products while you browse and they’ll appear here.</p><a href="category.html" class="inline-flex mt-5 rounded-full bg-neutral-950 text-white px-5 py-2.5 text-sm font-semibold">Start shopping</a></div>`;
}

function renderRewards() {
    const metrics = [['Total wallet balance','$24.50','solar:wallet-money-linear'],['Total referrals','8','solar:users-group-rounded-linear'],['Cashback earned','$64.50','solar:hand-money-linear'],['Cashback claimed','$40.00','solar:check-circle-linear']];
    return `${pageIntro('CIRCLE REWARDS','Rewards that travel through your circle.','Track referrals, cashback, and wallet credit earned from completed qualifying orders.','<a href="refer-a-friend.html" class="inline-flex justify-center rounded-full bg-neutral-950 text-white px-6 py-3 text-sm font-semibold">Invite a friend</a>')}<div class="grid sm:grid-cols-2 xl:grid-cols-4 gap-px bg-neutral-200 border border-neutral-200 mt-8">${metrics.map(metric=>`<article class="bg-white p-6"><iconify-icon icon="${metric[2]}" width="25" class="text-brand-green"></iconify-icon><p class="text-sm text-neutral-500 mt-7">${metric[0]}</p><p class="text-3xl font-semibold tabular-nums mt-2">${metric[1]}</p></article>`).join('')}</div><section class="mt-10" aria-labelledby="history-heading"><div class="flex items-center justify-between gap-4 mb-4"><h2 id="history-heading" class="text-xl font-semibold">Referral history</h2><span class="text-xs text-neutral-500">Demo activity</span></div><div class="overflow-x-auto border border-neutral-200"><table class="w-full min-w-[620px] text-sm"><thead class="bg-neutral-50 text-left"><tr><th class="px-5 py-4 font-semibold">Friend</th><th class="px-5 py-4 font-semibold">Status</th><th class="px-5 py-4 font-semibold">Delivered</th><th class="px-5 py-4 font-semibold text-right">Reward</th></tr></thead><tbody class="divide-y divide-neutral-200"><tr><td class="px-5 py-4">Maya R.</td><td class="px-5 py-4"><span class="rounded-full bg-brand-light text-brand-dark px-3 py-1 text-xs font-semibold">Completed</span></td><td class="px-5 py-4 tabular-nums">Aug 04, 2026</td><td class="px-5 py-4 text-right font-semibold tabular-nums">$10.00</td></tr><tr><td class="px-5 py-4">Aarav P.</td><td class="px-5 py-4"><span class="rounded-full bg-amber-50 text-amber-800 px-3 py-1 text-xs font-semibold">Awaiting delivery</span></td><td class="px-5 py-4">—</td><td class="px-5 py-4 text-right font-semibold tabular-nums">$10.00</td></tr></tbody></table></div></section>`;
}

function renderGiftCards() {
    return `${pageIntro('QUICKLLY CREDIT','Gift Cards','Buy a digital gift card or redeem one into the Quicklly wallet for use across eligible marketplace orders.')}<div class="grid lg:grid-cols-2 gap-6 mt-8"><section class="bg-neutral-950 text-white p-7 md:p-9"><span class="text-xs font-semibold text-brand-green">MY GIFT CARD BALANCE</span><p class="text-5xl font-semibold tabular-nums mt-5">$0.00</p><p class="text-sm text-neutral-400 mt-3 text-pretty">Redeemed gift cards become wallet credit and apply to eligible checkout totals.</p><form id="gift-card-redeem" class="mt-8"><label class="block text-sm font-medium">Gift card code<input name="giftCardCode" autocomplete="off" placeholder="QLLY-XXXX-XXXX" class="mt-2 w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-white outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"></label><p id="gift-card-status" class="mt-2 min-h-5 text-sm text-brand-green" aria-live="polite"></p><button type="submit" class="mt-3 rounded-full bg-brand-green px-6 py-3 text-sm font-semibold hover:bg-brand-dark transition-colors duration-150">Redeem code</button></form></section><section class="border border-neutral-200 p-7 md:p-9"><span class="text-xs font-semibold text-brand-dark">SEND A GIFT</span><h2 class="text-3xl font-semibold mt-4 text-balance">Let them choose what feels like home.</h2><p class="text-neutral-600 mt-4 text-pretty">Digital delivery, a personal note, and flexible values for groceries, meals, gifting, and eligible services.</p><div class="flex flex-wrap gap-2 mt-7">${['$25','$50','$75','$100'].map((value,index)=>`<button type="button" data-gift-value="${value}" aria-pressed="${index===1}" class="rounded-full border px-4 py-2 text-sm font-semibold ${index===1?'bg-neutral-950 text-white border-neutral-950':'border-neutral-300'}">${value}</button>`).join('')}</div><button type="button" data-account-action="buy-gift-card" class="mt-7 w-full rounded-full bg-neutral-950 text-white py-3.5 text-sm font-semibold">Continue</button><p data-page-status class="mt-3 min-h-5 text-sm text-brand-dark" aria-live="polite"></p></section></div>`;
}

function renderPassDashboard() {
    const plans = [['Standard','$6.99','Free eligible delivery, pickup savings, and monthly coupons.'],['Platinum','$11.99','Standard benefits plus extra discounts and higher-value coupons.']];
    return `${pageIntro('MEMBERSHIP','Quicklly Pass','The account currently has no active pass. Compare the live plan structure and choose the level that fits your ordering pattern.')}<section class="mt-8 border border-neutral-200 p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5"><div><span class="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold">NO ACTIVE PASS</span><h2 class="text-xl font-semibold mt-4">Unlock benefits across eligible stores</h2><p class="text-sm text-neutral-500 mt-2 text-pretty">Pass benefits apply automatically at checkout where the seller and order qualify.</p></div><a href="quicklly-pass.html" class="inline-flex justify-center rounded-full bg-neutral-950 text-white px-6 py-3 text-sm font-semibold">View full benefits</a></section><div class="grid md:grid-cols-2 gap-px bg-neutral-200 border border-neutral-200 mt-8">${plans.map((plan,index)=>`<article class="bg-white p-7 md:p-9"><div class="flex items-start justify-between gap-5"><div><h2 class="text-2xl font-semibold">${plan[0]}</h2><p class="text-4xl font-semibold tabular-nums mt-4">${plan[1]}</p><p class="text-sm text-neutral-500 mt-1">per month</p></div>${index===1?'<span class="rounded-full bg-brand-light text-brand-dark px-3 py-1 text-xs font-semibold">Best value</span>':''}</div><p class="text-sm leading-6 text-neutral-600 mt-7 text-pretty">${plan[2]}</p><button type="button" data-account-action="choose-pass" class="mt-7 w-full rounded-full ${index===1?'bg-brand-green hover:bg-brand-dark':'bg-neutral-950 hover:bg-neutral-800'} text-white py-3 text-sm font-semibold transition-colors duration-150">Choose ${plan[0]}</button><p data-card-status class="mt-3 min-h-5 text-sm text-brand-dark" aria-live="polite"></p></article>`).join('')}</div>`;
}

function renderPujaOrders() {
    return `${pageIntro('SHUBHPUJA','Quicklly Digital Puja','Review booked consultations and pujas, service details, practitioner information, and scheduled session links.','<a href="astrology.html" class="inline-flex justify-center rounded-full bg-neutral-950 text-white px-6 py-3 text-sm font-semibold">Explore puja services</a>')}<div class="mt-8 py-16 border border-dashed border-neutral-300 text-center"><iconify-icon icon="solar:stars-line-linear" width="36" class="text-neutral-400"></iconify-icon><h2 class="text-xl font-semibold mt-4">No Shubhpuja orders yet</h2><p class="text-sm text-neutral-500 mt-2 max-w-md mx-auto text-pretty">When you book a puja or consultation, its date, practitioner, preparation notes, and join link will appear here.</p><a href="astrology.html" class="inline-flex mt-6 rounded-full bg-neutral-950 text-white px-6 py-3 text-sm font-semibold">Browse services</a></div>`;
}

function renderChangePassword() {
    return `${pageIntro('SECURITY','Change Password','Use a unique password and keep access to your account private.')}<form id="change-password-form" class="mt-8 max-w-xl space-y-5" novalidate><label class="block text-sm font-medium">Current password<input name="currentPassword" type="password" autocomplete="current-password" class="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"></label><label class="block text-sm font-medium">New password<input name="newPassword" type="password" autocomplete="new-password" aria-describedby="password-help password-error" class="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"><span id="password-help" class="block text-xs text-neutral-500 mt-2">Use at least 8 characters with a number.</span></label><label class="block text-sm font-medium">Confirm new password<input name="confirmPassword" type="password" autocomplete="new-password" aria-describedby="password-error" class="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"></label><p id="password-error" class="min-h-5 text-sm" role="alert"></p><button type="submit" class="rounded-full bg-neutral-950 text-white px-6 py-3 text-sm font-semibold hover:bg-neutral-800 transition-colors duration-150">Update password</button></form>`;
}

const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const head = between(indexHtml, '<head>', '</head>', 'index head').replace(/^<head>\s*/, '');
const sharedTop = between(indexHtml, '<!-- 1. Promotional Strip -->', '<!-- 4. Primary Hero Carousel -->', 'promotional strip and header');
const footer = outerElement(indexHtml, '<footer ', '</footer>', 'footer');
const drawer = between(indexHtml, '<!-- Side Navigation Category Drawer -->', '<!-- Prototype Scripts -->', 'side drawer');
const addressModal = between(indexHtml, '<!-- Address Picker Modal System', '<!-- Prototype Scripts -->', 'address modal');

for (const [pageKey, [title, render]] of Object.entries(pages)) {
    const pageContent = render();
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
${head.replace(/<title>[^<]*<\/title>/, `<title>${title} | Quicklly</title>`)}
</head>
<body data-page="${pageKey}" class="font-sans antialiased text-neutral-900 bg-white">
    <a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:rounded-lg focus:ring-2 focus:ring-brand-green">Skip to content</a>
    ${sharedTop}
    <main id="main-content" class="max-w-[1360px] mx-auto px-4 md:px-8 py-8 md:py-12">
        <div class="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-10 items-start">
            ${accountNav(pageKey)}
            <section class="min-w-0">${pageContent}</section>
        </div>
    </main>
    ${footer}
    ${drawer}
    ${addressModal}
    <dialog id="signout-dialog" class="w-[min(92vw,440px)] p-0 bg-transparent backdrop:bg-black/50" aria-labelledby="signout-title">
        <div class="bg-white p-7 shadow-xl"><h2 id="signout-title" class="text-2xl font-semibold text-balance">Sign out of Quicklly?</h2><p class="text-sm text-neutral-600 mt-3 text-pretty">You’ll return to the storefront. This prototype does not clear any real session data.</p><div class="mt-7 flex justify-end gap-3"><button type="button" data-signout-cancel class="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold">Stay signed in</button><a href="index.html" class="rounded-full bg-neutral-950 text-white px-5 py-2.5 text-sm font-semibold">Sign out</a></div></div>
    </dialog>
    <script src="auth-modal.js?v=2026082102"></script>
    <script src="site-links.js?v=20260815"></script>
    <script src="standalone-page.js?v=20260815"></script>
    <script src="account-pages.js?v=20260824"></script>
    <script src="commerce-pages.js?v=20260823"></script>
</body>
</html>`;
    fs.writeFileSync(path.join(root, `${pageKey}.html`), html);
}

console.log(`Built ${Object.keys(pages).length} account pages.`);
