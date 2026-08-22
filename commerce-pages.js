(function () {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const CART_KEY = 'quicklly-cart-v1';
  const CHECKOUT_KEY = 'quicklly-checkout-v1';
  const productionProductImages = {
    'imgs/mdh_garam_masala.png': 'https://cdn.quicklly.com/upload_images/product/thumb/1633030828-mdh-garam-masala.jpg',
    'imgs/aashirvaad_atta.png': 'https://cdn.quicklly.com/upload_images/product/thumb/1774638886-aashirvaad-whole-wheat-atta.png',
    'imgs/taj_mahal_tea.png': 'https://cdn.quicklly.com/upload_images/product/thumb/1732998932-taj-mahal-tea.jpg',
    'imgs/haldiram_aloo_bhujia.png': 'https://cdn.quicklly.com/upload_images/product/thumb/1758653790-haldirams-aloo-bhujia.jpg',
    'imgs/royal_basmati_rice.png': 'https://cdn.quicklly.com/upload_images/product/thumb/1699556455-royal-basmati-rice.jfif',
    'imgs/kaju_katli_sweets.png': 'https://cdn.quicklly.com/upload_images/product/thumb/1516468997-haldirams-kaju-katli.jpg'
  };
  const productionProductPrices = {
    'MDH Garam Masala': 2.99,
    'Aashirvaad Whole Wheat Atta': 12.99,
    'Brooke Bond Taj Mahal Tea': 13.59,
    "Haldiram's Aloo Bhujia": 4.49,
    'Haldiram’s Aloo Bhujia': 4.49,
    'Royal Basmati Rice': 18.99,
    'Haldirams Kaju Katli': 14.99,
    'Maggi 2 Min Masala Noodle': 6.49,
    'Everest Kitchen King': 3.29
  };
  const checkoutState = readCheckoutState();

  function applyProductionProductImages() {
    $$('img').forEach((image) => {
      const source = image.getAttribute('src');
      if (productionProductImages[source]) image.src = productionProductImages[source];
    });
  }

  function readCheckoutState() {
    try {
      return { tipRate: 0.10, voucherDiscount: 0, ...JSON.parse(localStorage.getItem(CHECKOUT_KEY) || '{}') };
    } catch (_) {
      return { tipRate: 0.10, voucherDiscount: 0 };
    }
  }

  function writeCheckoutState() {
    try { localStorage.setItem(CHECKOUT_KEY, JSON.stringify(checkoutState)); } catch (_) { /* Checkout still works within the current page. */ }
  }

  function normalizeStoreName(store) {
    const value = String(store || '').trim();
    if (!value || /^\d+(?:\.\d+)?\s*(?:oz|lbs?|g|gm|kg|pack|count|bunch)$/i.test(value)) return 'Quicklly Indian Grocery Nationwide';
    if (value === 'Quicklly Market') return 'Quicklly Indian Grocery Nationwide';
    if (value === 'Patel Brothers') return 'World Fresh Market';
    if (value === 'Kamdar Plaza') return 'Metro Spice Mart';
    return value;
  }

  function readCart() {
    try {
      const value = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
      return Array.isArray(value) ? value.filter((item) => item && item.id && item.quantity > 0).map((item) => ({ ...item, store: normalizeStoreName(item.store), price: Number(item.price) > 0 ? Number(item.price) : (productionProductPrices[item.name] || 0) })) : [];
    } catch (_) {
      return [];
    }
  }

  function writeCart(items) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch (_) { /* Keep the current page usable without storage. */ }
    renderCartState(items);
    window.dispatchEvent(new CustomEvent('quicklly:cart-change', { detail: { items } }));
  }

  function money(value) {
    return `$${Number(value || 0).toFixed(2)}`;
  }

  function cartCount(items = readCart()) {
    return items.reduce((total, item) => total + item.quantity, 0);
  }

  function cartSubtotal(items = readCart()) {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  function productFromControl(control) {
    const card = control.closest('[data-product-card], article') || control.closest('.group');
    const main = control.closest('main') || document;
    const params = new URLSearchParams(window.location.search);
    const controlName = control.getAttribute('aria-label')?.replace(/^Add\s+/i, '').replace(/\s+to cart$/i, '');
    const name = controlName
      || card?.querySelector('h2, h3, h4')?.textContent.trim()
      || main.querySelector('h1')?.textContent.trim()
      || 'Quicklly item';
    const image = card?.querySelector('img') || main.querySelector('main img');
    const cardHeading = card?.querySelector('h2, h3, h4');
    const priceNode = card ? Array.from(card.querySelectorAll('span, p')).find((node) => /^\s*\$\d/.test(node.textContent)) : null;
    const priceText = card?.querySelector('.tabular-nums')?.textContent || priceNode?.textContent || main.querySelector('main .tabular-nums')?.textContent || '$0.00';
    const size = cardHeading?.nextElementSibling?.textContent.trim()
      || main.querySelector('h1')?.nextElementSibling?.textContent.split('·')[0].trim()
      || '';
    const pageStore = $('#selected-store-name')?.textContent.trim()
      || (document.body.dataset.page === 'product-details' ? main.querySelector('main h1')?.parentElement?.querySelector('p.text-xs')?.textContent.trim() : '');
    const store = normalizeStoreName(pageStore || card?.dataset.storeName || 'Quicklly Indian Grocery Nationwide');
    return {
      id: control.dataset.productId || params.get('product') || `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}:${store.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      name,
      size,
      store,
      price: Number(priceText.replace(/[^0-9.]/g, '')) || 0,
      image: image?.getAttribute('src') || 'imgs/quicly-logo-black.png',
      quantity: 1
    };
  }

  function addToCart(product, quantity = 1) {
    const items = readCart();
    const existing = items.find((item) => item.id === product.id);
    if (existing) existing.quantity += quantity;
    else items.push({ ...product, quantity });
    writeCart(items);
    return items;
  }

  function setCartQuantity(id, quantity) {
    const items = readCart();
    const item = items.find((entry) => entry.id === id);
    if (!item) return;
    item.quantity = quantity;
    writeCart(items.filter((entry) => entry.quantity > 0));
  }

  function checkoutTotals(items = readCart()) {
    const subtotal = cartSubtotal(items);
    if (!items.length) return { subtotal: 0, shipping: 0, taxes: 0, minimum: 0, tip: 0, discount: 0, total: 0 };
    const shipping = 4.99;
    const taxes = subtotal * 0.08;
    const minimum = subtotal < 50 ? 2.50 : 0;
    const tip = subtotal * checkoutState.tipRate;
    const discount = Math.min(checkoutState.voucherDiscount, subtotal);
    return { subtotal, shipping, taxes, minimum, tip, discount, total: Math.max(0, subtotal + shipping + taxes + minimum + tip - discount) };
  }

  function renderCheckoutState(items = readCart()) {
    const page = document.body.dataset.page;
    if (page !== 'checkout' && page !== 'checkout-payment') return;
    const totals = checkoutTotals(items);
    const summary = $$('aside').find((aside) => aside.querySelector('h2')?.textContent.trim() === 'Order Summary');
    if (summary) {
      const list = $('dl', summary);
      if (list) list.innerHTML = `<div class="flex justify-between gap-4"><dt>Items subtotal (${cartCount(items)} ${cartCount(items) === 1 ? 'item' : 'items'})</dt><dd class="font-semibold tabular-nums">${money(totals.subtotal)}</dd></div><div class="flex justify-between gap-4"><dt>Estimated shipping</dt><dd class="font-semibold tabular-nums">${money(totals.shipping)}</dd></div><div class="flex justify-between gap-4"><dt>Taxes & other fees</dt><dd class="font-semibold tabular-nums">${money(totals.taxes)}</dd></div><div class="flex justify-between gap-4"><dt>Minimum-order charge</dt><dd class="font-semibold tabular-nums">${money(totals.minimum)}</dd></div><div class="flex justify-between gap-4"><dt>Tip</dt><dd class="font-semibold tabular-nums" data-tip-total>${money(totals.tip)}</dd></div>${totals.discount ? `<div class="flex justify-between gap-4 text-brand-dark"><dt>Voucher</dt><dd class="font-semibold tabular-nums">−${money(totals.discount)}</dd></div>` : ''}`;
    }
    $$('[data-order-total]').forEach((value) => { value.textContent = money(totals.total); });
    const totalInAction = page === 'checkout' ? $('a[href="checkout-payment.html"] .tabular-nums') : $('#payment-form button[type="submit"] .tabular-nums');
    if (totalInAction) totalInAction.textContent = money(totals.total);

    if (page === 'checkout') {
      const inlineTotal = $('[data-inline-payment-total]');
      if (inlineTotal) inlineTotal.textContent = money(totals.total);
      if (new URLSearchParams(window.location.search).get('view') === 'full') {
        document.body.dataset.cartView = 'full';
        const heading = $('main h1');
        if (heading) heading.textContent = 'Your full cart';
      }
      const tipLabels = { 0: 'No tip', 0.05: '5%', 0.10: '10%', 0.15: '15%', 0.20: '20%' };
      $$('[data-tip]').forEach((tip) => {
        const selected = tip.dataset.tip === tipLabels[checkoutState.tipRate];
        tip.setAttribute('aria-pressed', String(selected));
        tip.classList.toggle('bg-neutral-950', selected);
        tip.classList.toggle('text-white', selected);
        tip.classList.toggle('border-neutral-950', selected);
      });
      const existing = $$('[data-store-cart]');
      const container = existing[0]?.parentElement;
      if (container) {
        let mount = $('[data-live-cart]', container);
        if (!mount) {
          mount = document.createElement('div');
          mount.dataset.liveCart = '';
          mount.className = 'contents';
          container.insertBefore(mount, existing[0]);
          existing.forEach((card) => card.remove());
        }
        const stores = items.reduce((groups, item) => { (groups[item.store || 'Quicklly Indian Grocery Nationwide'] ||= []).push(item); return groups; }, {});
        mount.innerHTML = items.length ? Object.entries(stores).map(([store, storeItems]) => `<article class="border border-neutral-200" data-store-cart><div class="flex items-center justify-between gap-4 bg-neutral-50 p-5 md:p-6"><div><h2 class="font-semibold">${store}</h2><p class="mt-1 text-sm text-neutral-500">${cartCount(storeItems)} items selected · <span class="font-semibold text-brand-dark tabular-nums">${money(cartSubtotal(storeItems))}</span></p></div></div><div class="divide-y divide-neutral-200" data-store-items>${storeItems.map((item) => `<div data-cart-line="${item.id}" class="grid gap-4 p-5 sm:grid-cols-[72px_1fr_auto] sm:items-center md:p-6"><div class="size-18 bg-neutral-50"><img src="${item.image}" alt="${item.name}" class="size-full object-contain p-2"></div><div><h3 class="font-semibold text-pretty">${item.name}</h3><p class="mt-1 text-sm text-neutral-500">${item.size || ''}</p><button type="button" data-remove-line data-cart-item="${item.id}" class="mt-2 text-sm font-semibold text-red-700 hover:underline">Remove</button></div><div class="flex items-center gap-3 sm:flex-col sm:items-end"><p class="font-semibold tabular-nums">${money(item.price * item.quantity)}</p><div class="inline-flex items-center rounded-full border border-neutral-300" data-quantity><button type="button" data-qty="-1" data-cart-item="${item.id}" class="grid size-9 place-items-center" aria-label="Decrease ${item.name} quantity">−</button><span class="min-w-7 text-center text-sm font-semibold tabular-nums" aria-live="polite">${item.quantity}</span><button type="button" data-qty="1" data-cart-item="${item.id}" class="grid size-9 place-items-center" aria-label="Increase ${item.name} quantity">+</button></div></div></div>`).join('')}</div></article>`).join('') : '<section class="border border-neutral-200 p-8 text-center" data-checkout-empty><h2 class="text-xl font-semibold">Your cart is empty</h2><p class="mt-2 text-sm text-neutral-500">Add products before continuing to payment.</p><a href="shop-by-stores.html?view=grocery" class="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-neutral-950 px-5 text-sm font-semibold text-white">Start shopping</a></section>';
      }
      const continueLink = $$('a').find((anchor) => anchor.textContent.includes('Continue to Payment'));
      if (continueLink) {
        if (!items.length) {
          continueLink.dataset.checkoutHref = continueLink.getAttribute('href') || 'checkout-payment.html';
          continueLink.removeAttribute('href');
          continueLink.setAttribute('aria-disabled', 'true');
          continueLink.classList.add('pointer-events-none', 'opacity-50');
        } else {
          continueLink.href = continueLink.dataset.checkoutHref || 'checkout-payment.html';
          continueLink.removeAttribute('aria-disabled');
          continueLink.classList.remove('pointer-events-none', 'opacity-50');
        }
      }
      const inlineSubmit = $('#checkout-payment-dialog button[type="submit"]');
      if (inlineSubmit) {
        inlineSubmit.disabled = !items.length;
        inlineSubmit.classList.toggle('opacity-50', !items.length);
        inlineSubmit.setAttribute('aria-disabled', String(!items.length));
      }
    }

    if (page === 'checkout-payment') {
      const review = $$('section').find((section) => section.querySelector('h2')?.textContent.trim() === 'Final review');
      const reviewList = review?.querySelector('ul');
      if (reviewList) {
        const stores = items.reduce((groups, item) => { groups[item.store || 'Quicklly Indian Grocery Nationwide'] = (groups[item.store || 'Quicklly Indian Grocery Nationwide'] || 0) + item.quantity; return groups; }, {});
        reviewList.innerHTML = Object.entries(stores).map(([store, quantity]) => `<li class="flex justify-between gap-4"><span>${store}</span><strong>${quantity} ${quantity === 1 ? 'item' : 'items'}</strong></li>`).join('');
      }
      const submit = $('#payment-form button[type="submit"]');
      if (submit) {
        submit.disabled = !items.length;
        submit.classList.toggle('opacity-50', !items.length);
        submit.setAttribute('aria-disabled', String(!items.length));
      }
    }
  }

  function applyProductContext() {
    if (document.body.dataset.page !== 'product-details') return;

    const products = {
      '1': { name: 'MDH Garam Masala', brand: 'MDH', size: '100 g', price: '$2.99', oldPrice: '$3.49', image: 'https://cdn.quicklly.com/upload_images/product/1633030828-mdh-garam-masala.jpg' },
      '2': { name: 'Aashirvaad Whole Wheat Atta', brand: 'Aashirvaad', size: '10 lbs', price: '$12.99', oldPrice: '$14.99', image: 'https://cdn.quicklly.com/upload_images/product/1774638886-aashirvaad-whole-wheat-atta.png' },
      '3': { name: 'Brooke Bond Taj Mahal Tea', brand: 'Brooke Bond', size: '900 g', price: '$13.59', oldPrice: '$15.99', image: 'https://cdn.quicklly.com/upload_images/product/1732998932-taj-mahal-tea.jpg' },
      '4': { name: "Haldiram's Aloo Bhujia", brand: "Haldiram's", size: '400 g', price: '$4.49', oldPrice: '$5.29', image: 'https://cdn.quicklly.com/upload_images/product/1758653790-haldirams-aloo-bhujia.jpg' },
      '5': { name: 'Royal Basmati Rice', brand: 'Royal', size: '10 lbs', price: '$18.99', oldPrice: '$21.99', image: 'https://cdn.quicklly.com/upload_images/product/1699556455-royal-basmati-rice.jfif' },
      '6': { name: 'Haldirams Kaju Katli', brand: 'Haldirams', size: '1 lb', price: '$14.99', oldPrice: '$16.99', image: 'https://cdn.quicklly.com/upload_images/product/1516468997-haldirams-kaju-katli.jpg' },
      '7': { name: 'Maggi 2 Min Masala Noodle', brand: 'Maggi', size: '8 pack', price: '$6.49', oldPrice: '$7.49', image: 'https://cdn.quicklly.com/upload_images/product/1784401367-maggi-2-min-masala-noodle.jpg' },
      '8': { name: 'Everest Kitchen King', brand: 'Everest', size: '100 g', price: '$3.29', oldPrice: '$3.79', image: 'https://cdn.quicklly.com/upload_images/product/1758653753-everest-kitchen-king-masla.jpg' }
    };
    const stores = {
      'quicklly-indian-grocery': 'Quicklly Bazaar Chicago',
      'patel-brothers': 'World Fresh Market',
      'fresh-farms': 'Fresh Farms',
      'kamdar-plaza': 'Metro Spice Mart',
      'very-much-indian': 'Al Noor Meat Market',
      'almond-house': 'Sundarbans Fish Bazar',
      'masalas': 'Masalas',
      'farm-supermarket': 'Farm Supermarket',
      'kabul-mart': 'Kabul Mart',
      'al-tayyab': 'Al-Tayyab Zabiha Halal Meat and Grocery',
      'awami-bazaar': 'Awami Bazaar'
    };
    const params = new URLSearchParams(window.location.search);
    const product = products[params.get('product')] || products['2'];
    const storeSlug = params.get('store') || 'quicklly-indian-grocery';
    const department = params.get('department') || 'grocery';
    const departmentQuery = `&department=${department}`;
    const departmentNames = { grocery: 'Grocery', festive: 'Rakhi Specials', fresh: 'Go Fresh', beverages: 'Foods & Beverages', meat: 'Meat Products', organic: 'Organic', 'personal-care': 'Personal Care', household: 'Household' };
    const storeName = stores[storeSlug] || stores['quicklly-indian-grocery'];
    const main = $('#main-content');
    const heading = $('main h1', main);
    if (!heading) return;

    document.title = `${product.name} | Quicklly`;
    heading.textContent = product.name;
    const metadata = heading.nextElementSibling;
    if (metadata) metadata.textContent = `${product.size} · In stock`;
    const detailColumn = heading.parentElement;
    const storeEyebrow = $('p.text-xs', detailColumn);
    if (storeEyebrow) storeEyebrow.textContent = storeName.toUpperCase();
    const prices = $$('.tabular-nums', detailColumn);
    if (prices[0]) prices[0].textContent = product.price;
    if (prices[1]) prices[1].textContent = product.oldPrice;
    const galleryImages = $$('main img', main).slice(0, 2);
    galleryImages.forEach((image) => {
      image.src = product.image;
      image.alt = image === galleryImages[0] ? `${product.name} ${product.size}` : '';
    });
    const breadcrumbCurrent = $('nav [aria-current="page"]', main);
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = product.name;
    const categoryLink = $('nav a[href="category.html"]', main);
    if (categoryLink) {
      categoryLink.href = `category.html?store=${storeSlug}${departmentQuery}`;
      categoryLink.textContent = departmentNames[department] || 'Grocery';
    }
    const viewAll = $$('a', main).find((anchor) => anchor.textContent.trim() === 'View all');
    if (viewAll) viewAll.href = `category.html?store=${storeSlug}${departmentQuery}`;
    const storeCardHeading = $$('main h2', main).find((item) => item.textContent.trim() === 'Quicklly Indian Grocery Nationwide');
    if (storeCardHeading) storeCardHeading.textContent = storeName;
    const specs = $$('details dd', main);
    if (specs[0]) specs[0].textContent = product.brand;
    if (specs[1]) specs[1].textContent = product.size;
    const buyingPrice = $('aside .tabular-nums', main);
    if (buyingPrice) buyingPrice.textContent = product.price;
  }

  function injectGlobalCommerceUI() {
    if (!document.getElementById('commerce-global-ui')) {
      document.body.insertAdjacentHTML('beforeend', `
        <div id="commerce-global-ui">
          <dialog id="global-cart-drawer" class="fixed inset-y-0 left-auto right-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden bg-transparent p-0 backdrop:bg-black/50 sm:max-w-[460px]" aria-labelledby="global-cart-title">
            <div data-cart-panel class="flex h-dvh translate-x-full flex-col bg-white shadow-xl transition-transform duration-200">
              <header class="flex items-center justify-between gap-5 border-b border-neutral-200 px-5 py-5 sm:px-6"><h2 id="global-cart-title" class="text-2xl font-semibold text-balance">My Cart</h2><button type="button" data-cart-close class="grid size-10 place-items-center rounded-full border border-neutral-200 text-neutral-700 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green" aria-label="Close cart"><iconify-icon icon="solar:close-circle-linear" width="22"></iconify-icon></button></header>
              <div data-cart-contents class="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6"></div>
              <footer data-cart-footer class="border-t border-neutral-200 bg-white px-5 pt-5 sm:px-6" style="padding-bottom:max(1.25rem,env(safe-area-inset-bottom))"><p class="flex items-center gap-2 pb-4 text-sm font-semibold"><iconify-icon icon="solar:delivery-linear" width="20" class="text-brand-green"></iconify-icon>Free Delivery Over $30</p><a href="checkout.html" class="flex min-h-12 w-full items-center justify-between rounded-full bg-brand-green px-6 text-sm font-semibold text-white hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"><span>Proceed to Checkout</span><span data-cart-subtotal class="tabular-nums">$0.00</span></a></footer>
            </div>
          </dialog>
          <dialog id="replacement-dialog" class="w-[min(94vw,760px)] p-0 bg-transparent backdrop:bg-black/50" aria-labelledby="replacement-title">
            <div class="bg-white shadow-xl"><header class="flex items-start justify-between gap-5 border-b border-neutral-200 p-6"><div><p class="text-xs font-semibold text-brand-dark">REPLACEMENT PREFERENCE</p><h2 id="replacement-title" class="mt-2 text-2xl font-semibold text-balance">If this item is unavailable</h2></div><button type="button" data-close-dialog="replacement-dialog" class="grid size-10 place-items-center rounded-full border border-neutral-200" aria-label="Close replacement options"><iconify-icon icon="solar:close-circle-linear" width="22"></iconify-icon></button></header><div class="p-6"><div class="flex items-center gap-4 border border-neutral-200 p-4"><img src="imgs/aashirvaad_atta.png" alt="Aashirvaad Whole Wheat Atta" class="size-16 object-contain"><div><p class="font-semibold">Aashirvaad Whole Wheat Atta</p><p class="mt-1 text-sm text-neutral-500">10 lbs · $12.99</p></div></div><fieldset class="mt-5 space-y-3"><legend class="sr-only">Choose replacement preference</legend><label class="flex cursor-pointer gap-4 border-2 border-brand-green p-4"><input type="radio" name="replacement" value="best" checked class="mt-1 size-4 accent-emerald-600"><span><strong class="block">Replace with the best match</strong><span class="mt-1 block text-sm text-neutral-500">Similar brand, size, and price. We’ll show any difference.</span></span></label><label class="flex cursor-pointer gap-4 border border-neutral-200 p-4"><input type="radio" name="replacement" value="manual" class="mt-1 size-4 accent-emerald-600"><span><strong class="block">Choose manually</strong><span class="mt-1 block text-sm text-neutral-500">Review suggested alternatives before fulfillment.</span></span></label><label class="flex cursor-pointer gap-4 border border-neutral-200 p-4"><input type="radio" name="replacement" value="none" class="mt-1 size-4 accent-emerald-600"><span><strong class="block">No replacement</strong><span class="mt-1 block text-sm text-neutral-500">Refund this item if it cannot be fulfilled.</span></span></label></fieldset><label class="mt-5 flex items-center gap-3 text-sm"><input type="checkbox" class="size-4 accent-emerald-600">Use this preference for similar items</label><p class="mt-3 min-h-5 text-sm text-brand-dark" data-replacement-status aria-live="polite"></p><div class="mt-6 flex justify-end gap-3"><button type="button" data-close-dialog="replacement-dialog" class="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold">Cancel</button><button type="button" data-save-replacement class="rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white">Save preference</button></div></div></div>
          </dialog>
          <dialog id="delivery-slot-dialog" class="w-[min(94vw,720px)] p-0 bg-transparent backdrop:bg-black/50" aria-labelledby="slot-title"><div class="bg-white shadow-xl"><header class="flex items-start justify-between gap-5 border-b border-neutral-200 p-6"><div><p class="text-xs font-semibold text-brand-dark">QUICKLLY INDIAN GROCERY</p><h2 id="slot-title" class="mt-2 text-2xl font-semibold">Choose a delivery slot</h2></div><button type="button" data-close-dialog="delivery-slot-dialog" class="grid size-10 place-items-center rounded-full border border-neutral-200" aria-label="Close delivery slots">×</button></header><div class="p-6"><div class="grid grid-cols-3 gap-2" role="tablist">${['Sat 22','Sun 23','Mon 24'].map((day, index) => `<button type="button" data-slot-day aria-selected="${index === 0}" class="border p-3 text-sm font-semibold ${index === 0 ? 'border-brand-green bg-brand-light' : 'border-neutral-200'}">${day}</button>`).join('')}</div><fieldset class="mt-5 grid gap-3 sm:grid-cols-2"><legend class="sr-only">Available times</legend>${['9 AM–12 PM · Free','12–2 PM · $2.99','2–5 PM · Free','6–9 PM · $4.99'].map((slot, index) => `<label class="flex items-center gap-3 border border-neutral-200 p-4 text-sm font-semibold"><input type="radio" name="delivery-slot" ${index === 2 ? 'checked' : ''} class="accent-emerald-600">${slot}</label>`).join('')}</fieldset><div class="mt-6 flex justify-between gap-3"><button type="button" data-remove-slot class="text-sm font-semibold text-red-700">Remove slot</button><button type="button" data-save-slot class="rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white">Use this slot</button></div></div></div></dialog>
          <dialog id="share-cart-dialog" class="w-[min(94vw,560px)] p-0 bg-transparent backdrop:bg-black/50" aria-labelledby="share-title"><div class="bg-white p-6 shadow-xl"><div class="flex items-start justify-between"><div><p class="text-xs font-semibold text-brand-dark">SHARE CART</p><h2 id="share-title" class="mt-2 text-2xl font-semibold">Shop together</h2></div><button type="button" data-close-dialog="share-cart-dialog" class="grid size-10 place-items-center rounded-full border border-neutral-200" aria-label="Close share cart">×</button></div><p class="mt-4 text-sm text-neutral-600 text-pretty">The link includes 3 items from 2 stores. Prices, stock, and address eligibility are rechecked for the recipient.</p><div class="mt-5 flex gap-3"><input readonly value="https://quicklly.com/cart/shared/QL84627" class="min-w-0 flex-1 rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm"><button type="button" data-copy-cart class="rounded-xl bg-neutral-950 px-5 text-sm font-semibold text-white">Copy</button></div><p class="mt-2 min-h-5 text-sm text-brand-dark" data-share-status aria-live="polite"></p><div class="mt-5 grid grid-cols-2 gap-3"><a href="mailto:?subject=Quicklly%20cart" class="rounded-full border border-neutral-300 px-5 py-2.5 text-center text-sm font-semibold">Email</a><button type="button" data-share-message class="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold">Messages</button></div></div></dialog>
          ${document.body.dataset.page === 'checkout' ? `<dialog id="checkout-payment-dialog" class="m-auto h-[min(92dvh,900px)] w-[min(94vw,760px)] max-w-none overflow-y-auto bg-transparent p-0 backdrop:bg-black/50" aria-labelledby="inline-payment-title"><div class="bg-white shadow-xl"><header class="sticky top-0 z-10 flex items-start justify-between gap-5 border-b border-neutral-200 bg-white p-5 md:p-6"><div><p class="text-xs font-semibold text-brand-dark">SECURE PAYMENT</p><h2 id="inline-payment-title" class="mt-2 text-2xl font-semibold text-balance">Pay by Card</h2><p class="mt-2 text-sm text-neutral-500 text-pretty">Confirm your contact details and payment method without leaving checkout.</p></div><button type="button" data-close-dialog="checkout-payment-dialog" class="grid size-10 shrink-0 place-items-center rounded-full border border-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green" aria-label="Close payment"><iconify-icon icon="solar:close-circle-linear" width="22"></iconify-icon></button></header><form id="payment-form" class="space-y-6 p-5 md:p-6" novalidate><section><h3 class="text-lg font-semibold">Contact information</h3><div class="mt-4 grid gap-4 sm:grid-cols-2"><label class="text-sm font-semibold">Email<input name="email" type="email" autocomplete="email" value="abu@example.com" class="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 font-normal"></label><label class="text-sm font-semibold">Phone<input name="phone" type="tel" autocomplete="tel" value="+1 216 555 0144" class="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 font-normal"></label></div></section><section class="border-t border-neutral-200 pt-6"><h3 class="text-lg font-semibold">Payment method</h3><div class="mt-4 grid gap-3 sm:grid-cols-2"><button type="button" data-payment-method="card" aria-pressed="true" class="flex items-center gap-3 border-2 border-brand-green p-4 text-left font-semibold"><iconify-icon icon="solar:card-linear" width="22"></iconify-icon>Credit or debit card</button><button type="button" data-payment-method="wallet" aria-pressed="false" class="flex items-center gap-3 border border-neutral-300 p-4 text-left font-semibold"><iconify-icon icon="solar:wallet-linear" width="22"></iconify-icon>My Wallet · $0.00</button></div><div class="mt-5 grid gap-4 sm:grid-cols-2" data-card-fields><label class="text-sm font-semibold sm:col-span-2">Cardholder name<input name="cardholder" autocomplete="cc-name" class="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 font-normal"></label><label class="text-sm font-semibold sm:col-span-2">Card number<input name="cardnumber" inputmode="numeric" autocomplete="cc-number" placeholder="1234 5678 9012 3456" class="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 font-normal"></label><label class="text-sm font-semibold">Expiry<input name="expiry" inputmode="numeric" autocomplete="cc-exp" placeholder="MM / YY" class="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 font-normal"></label><label class="text-sm font-semibold">CVV<input name="cvv" type="password" inputmode="numeric" autocomplete="cc-csc" placeholder="123" class="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 font-normal"></label></div><p class="mt-3 min-h-5 text-sm text-red-700" data-payment-error role="alert"></p></section><label class="flex items-start gap-3 border-t border-neutral-200 pt-6 text-sm text-pretty"><input name="terms" type="checkbox" class="mt-1 size-4 accent-emerald-600">I agree to the terms and understand that substitutions, cancellations, and refunds follow each store’s policy.</label><button type="submit" class="flex min-h-12 w-full items-center justify-between rounded-full bg-brand-green px-6 font-semibold text-white hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"><span data-payment-label>Confirm & Pay</span><span data-inline-payment-total class="tabular-nums">$0.00</span></button></form></div></dialog>` : ''}
          <aside id="quicklly-support" class="fixed bottom-4 right-4 z-40 hidden w-[min(92vw,380px)] border border-neutral-200 bg-white p-5 shadow-xl" aria-label="Quicklly support"><div class="flex items-start justify-between"><div><p class="text-xs font-semibold text-brand-dark">ASK QUICKLLY</p><h2 class="mt-2 text-xl font-semibold">How can we help?</h2></div><button type="button" data-support-close class="grid size-9 place-items-center rounded-full border border-neutral-200" aria-label="Close support">×</button></div><label class="mt-5 block text-sm font-semibold">Topic<select class="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 font-normal"><option>My order</option><option>Payment</option><option>Account</option><option>Store or product</option></select></label><label class="mt-4 block text-sm font-semibold">Message<textarea rows="3" class="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-3 font-normal" placeholder="Tell us what happened"></textarea></label><p class="mt-3 text-xs text-neutral-500">Support hours: 8 AM–10 PM CT. If chat is unavailable, your message becomes a support request.</p><button type="button" data-support-send class="mt-4 w-full rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white">Start support request</button><p class="mt-2 min-h-5 text-sm text-brand-dark" data-support-status aria-live="polite"></p></aside>
          <button type="button" data-support-open class="fixed bottom-4 right-4 z-30 flex min-h-12 items-center gap-2 rounded-full bg-neutral-950 px-5 text-sm font-semibold text-white shadow-lg" aria-label="Ask Quicklly support"><iconify-icon icon="solar:chat-round-dots-linear" width="20"></iconify-icon>Ask Quicklly</button>
        </div>`);
    }

    const search = document.querySelector('#main-header input[placeholder*="Search groceries"]');
    if (search && !document.getElementById('search-suggestions')) {
      search.setAttribute('role', 'combobox');
      search.setAttribute('aria-expanded', 'false');
      search.setAttribute('aria-controls', 'search-suggestions');
      search.parentElement.insertAdjacentHTML('beforeend', `<div id="search-suggestions" role="listbox" class="absolute left-0 right-0 top-[calc(100%+8px)] z-40 hidden border border-neutral-200 bg-white p-4 shadow-lg"><div data-search-default><p class="text-xs font-semibold text-neutral-500">RECENT SEARCHES</p><div class="mt-3 flex flex-wrap gap-2">${['basmati rice','atta','chai'].map(term => `<button type="button" data-search-term="${term}" class="rounded-full border border-neutral-300 px-3 py-1.5 text-xs font-semibold">${term}</button>`).join('')}</div></div><div class="mt-4" data-search-results><p class="text-xs font-semibold text-brand-dark">SUGGESTIONS</p>${['Aashirvaad Whole Wheat Atta','Royal Basmati Rice','Patel Brothers'].map((item,index) => `<a role="option" href="${index === 2 ? 'store-details.html' : 'product-details.html'}" class="mt-2 flex items-center gap-3 rounded-lg p-2 text-sm hover:bg-neutral-50 focus:bg-neutral-50"><iconify-icon icon="${index === 2 ? 'solar:shop-linear' : 'solar:bag-linear'}" width="19" class="text-neutral-400"></iconify-icon><span>${item}</span></a>`).join('')}</div><div class="hidden py-6 text-center" data-search-empty><p class="font-semibold">No quick results</p><p class="mt-1 text-xs text-neutral-500">Press Enter to see the full search page.</p></div></div>`);
    }
  }

  function applyAccessibilityBaseline() {
    if (!document.getElementById('quicklly-accessibility-baseline')) {
      document.head.insertAdjacentHTML('beforeend', '<style id="quicklly-accessibility-baseline">.bg-brand-green{background-color:#047857!important}.text-brand-dark{color:#065f46!important}.skip-link{position:fixed;left:1rem;top:1rem;z-index:200;transform:translateY(-200%);background:#fff;color:#111827;padding:.75rem 1rem;border-radius:.5rem;font-weight:600;box-shadow:0 4px 12px rgba(0,0,0,.18)}.skip-link:focus{transform:translateY(0)}</style>');
    }
    let main = document.querySelector('main, #main-content');
    if (!main) {
      main = document.getElementById('main-header')?.nextElementSibling;
      if (main) main.setAttribute('role', 'main');
    }
    if (main) {
      if (!main.id) main.id = 'main-content';
      if (!document.querySelector('.skip-link')) document.body.insertAdjacentHTML('afterbegin', `<a class="skip-link" href="#${main.id}">Skip to main content</a>`);
    }
    $$('header input').forEach((input) => {
      if (!input.getAttribute('aria-label') && !input.labels?.length) input.setAttribute('aria-label', input.placeholder || 'Search');
    });
    const promoDismiss = $('body > div.bg-neutral-900 button[aria-label="Dismiss"]');
    promoDismiss?.classList.remove('hidden');
    promoDismiss?.classList.add('block');
    $$('footer h4').forEach((heading) => {
      const replacement = document.createElement('h2');
      Array.from(heading.attributes).forEach((attribute) => replacement.setAttribute(attribute.name, attribute.value));
      replacement.innerHTML = heading.innerHTML;
      heading.replaceWith(replacement);
    });
    $$('footer').forEach((footer) => {
      const copyright = Array.from(footer.querySelectorAll('div')).find((node) => !node.querySelector('div') && /©\s*2023\s+Quicklly/.test(node.textContent.trim()));
      if (copyright) copyright.textContent = copyright.textContent.replace('© 2023', `© ${new Date().getFullYear()}`);
    });
    const drawer = $('#side-drawer');
    if (drawer) {
      const syncDrawer = () => {
        const closed = drawer.classList.contains('-translate-x-full');
        drawer.toggleAttribute('inert', closed);
        drawer.setAttribute('aria-hidden', String(closed));
      };
      syncDrawer();
      new MutationObserver(syncDrawer).observe(drawer, { attributes: true, attributeFilter: ['class'] });
    }
  }

  function bindDialogs() {
    if (document.body.dataset.page === 'checkout' && !document.querySelector('[data-open-delivery-slot]')) {
      const checkoutStep = $$('main p').find((node) => node.textContent.includes('CHECKOUT · STEP'));
      if (checkoutStep) checkoutStep.textContent = 'CHECKOUT';
      const continueLink = $$('main a').find((anchor) => anchor.textContent.includes('Continue to Payment'));
      if (continueLink) {
        const labelElement = continueLink.querySelector('span');
        if (labelElement) labelElement.textContent = 'Pay by Card';
        continueLink.setAttribute('aria-haspopup', 'dialog');
        continueLink.addEventListener('click', (event) => {
          event.preventDefault();
          if (continueLink.getAttribute('aria-disabled') === 'true') return;
          $('#checkout-payment-dialog')?.showModal();
        });
      }
      const firstSlot = document.querySelector('#main-content select');
      firstSlot?.closest('label')?.insertAdjacentHTML('afterend', '<button type="button" data-open-delivery-slot class="self-end rounded-full border border-neutral-300 px-4 py-2.5 text-sm font-semibold hover:border-brand-green">See all delivery slots</button>');
    }
    $$('[data-open-address]').forEach((control) => control.addEventListener('click', () => window.openAddressModal?.()));
    $$('[data-open-replacement]').forEach((control) => control.addEventListener('click', () => $('#replacement-dialog')?.showModal()));
    $$('[data-open-delivery-slot]').forEach((control) => control.addEventListener('click', () => $('#delivery-slot-dialog')?.showModal()));
    $$('[data-share-cart]').forEach((control) => control.addEventListener('click', () => $('#share-cart-dialog')?.showModal()));
    $$('[data-close-dialog]').forEach((control) => control.addEventListener('click', () => document.getElementById(control.dataset.closeDialog)?.close()));
    $('[data-save-replacement]')?.addEventListener('click', () => {
      $('[data-replacement-status]').textContent = 'Replacement preference saved for this item.';
      window.setTimeout(() => $('#replacement-dialog')?.close(), 450);
    });
    $('[data-save-slot]')?.addEventListener('click', () => $('#delivery-slot-dialog')?.close());
    $('[data-remove-slot]')?.addEventListener('click', () => $('#delivery-slot-dialog')?.close());
    $$('[data-slot-day]').forEach((button) => button.addEventListener('click', () => {
      $$('[data-slot-day]').forEach((day) => {
        const selected = day === button;
        day.setAttribute('aria-selected', String(selected));
        day.classList.toggle('border-brand-green', selected);
        day.classList.toggle('bg-brand-light', selected);
      });
    }));
    $('[data-copy-cart]')?.addEventListener('click', async () => {
      const value = $('#share-cart-dialog input')?.value || '';
      try { await navigator.clipboard.writeText(value); $('[data-share-status]').textContent = 'Share link copied.'; }
      catch (_) { $('[data-share-status]').textContent = value; }
    });
    $('[data-share-message]')?.addEventListener('click', () => { $('[data-share-status]').textContent = 'Copy the link and paste it into your preferred messaging app.'; });

    $('[data-support-open]')?.addEventListener('click', () => {
      $('#quicklly-support')?.classList.remove('hidden');
      $('[data-support-open]')?.classList.add('hidden');
      $('#quicklly-support select')?.focus();
    });
    $('[data-support-close]')?.addEventListener('click', () => {
      $('#quicklly-support')?.classList.add('hidden');
      $('[data-support-open]')?.classList.remove('hidden');
    });
    $('[data-support-send]')?.addEventListener('click', () => {
      const message = $('#quicklly-support textarea')?.value.trim();
      $('[data-support-status]').textContent = message ? 'Prototype request prepared. Connect support messaging before launch.' : 'Add a short message so support knows what happened.';
    });
  }

  function minimumForStore(store) {
    if (['Al Noor Meat Market', 'Sundarbans Fish Bazar', 'Masalas'].includes(store)) return 10;
    if (['Fresh Farms', 'Quicklly Bazaar Chicago', 'World Fresh Market', 'Metro Spice Mart', 'Farm Supermarket', 'Kabul Mart', 'Al-Tayyab Zabiha Halal Meat and Grocery', 'Awami Bazaar'].includes(store)) return 30;
    return 50;
  }

  function renderCartState(items = readCart()) {
    const count = cartCount(items);
    $$('[id="cart-count"]').forEach((badge) => { badge.textContent = String(count); });
    renderCheckoutState(items);
    const contents = $('[data-cart-contents]');
    const footer = $('[data-cart-footer]');
    if (!contents || !footer) return;

    const stores = items.reduce((groups, item) => {
      const key = item.store || 'Quicklly Indian Grocery Nationwide';
      (groups[key] ||= []).push(item);
      return groups;
    }, {});
    $('[data-cart-subtotal]').textContent = money(cartSubtotal(items));
    footer.classList.toggle('hidden', items.length === 0);

    if (!items.length) {
      contents.innerHTML = '<div class="grid min-h-full place-items-center px-6 py-12 text-center"><div><iconify-icon icon="solar:cart-large-2-linear" width="42" class="text-neutral-400"></iconify-icon><h3 class="mt-4 text-xl font-semibold text-balance">Your cart is empty</h3><p class="mt-2 text-sm text-neutral-500 text-pretty">Add products to start your order.</p><a href="shop-by-stores.html?view=grocery" class="mt-5 inline-flex min-h-11 items-center justify-center rounded bg-neutral-950 px-5 text-sm font-semibold text-white">Start shopping</a></div></div>';
      return;
    }

    const campaign = `<section class="overflow-hidden rounded-xl border border-emerald-200 bg-white" aria-label="Unlocked cart offer"><div class="flex min-h-11 items-center justify-between gap-4 bg-brand-light px-4 py-3 text-brand-dark"><h3 class="text-sm font-semibold text-balance">Rakhi Special Unlocked</h3><span class="shrink-0 text-xs font-semibold tabular-nums">Valid for 30 mins</span></div><p class="px-4 py-3 text-sm leading-5 text-neutral-600 text-pretty">Based on your cart, you've unlocked exclusive Raksha Bandhan deals. Celebrate the bond!</p></section>`;

    contents.innerHTML = campaign + Object.entries(stores).map(([store, storeItems], storeIndex) => {
      const storeTotal = storeItems.reduce((total, item) => total + item.price * item.quantity, 0);
      const minimum = minimumForStore(store);
      const remaining = Math.max(0, minimum - storeTotal);
      const progress = Math.min(100, (storeTotal / minimum) * 100);
      return `<section class="${storeIndex ? 'mt-6 border-t border-neutral-300 pt-5' : 'mt-6'}" aria-labelledby="drawer-store-${storeIndex}"><div class="flex items-start justify-between gap-4"><h3 id="drawer-store-${storeIndex}" class="font-semibold text-balance">${store}</h3><span class="text-sm font-semibold tabular-nums">${money(storeTotal)}</span></div><p class="mt-2 text-xs text-neutral-500">Minimum Order Value: <span class="tabular-nums">${money(minimum)}</span></p><div class="mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-200" role="progressbar" aria-label="Progress toward ${store} minimum order" aria-valuemin="0" aria-valuemax="${minimum}" aria-valuenow="${Math.min(storeTotal, minimum).toFixed(2)}"><div class="h-full rounded-full bg-brand-green" style="width:${progress}%"></div></div><p class="mt-2 text-xs ${remaining ? 'text-neutral-600' : 'font-semibold text-brand-dark'}">${remaining ? `Add ${money(remaining)} to reach the order minimum of ${money(minimum)}` : 'Order minimum reached'}</p><div class="mt-3 divide-y divide-neutral-200">${storeItems.map((item) => `<article class="grid grid-cols-[64px_1fr] gap-4 py-4"><div class="size-16 rounded-xl bg-neutral-50"><img src="${item.image}" alt="${item.name}" class="size-full object-contain p-2"></div><div class="min-w-0"><div class="flex items-start justify-between gap-3"><div class="min-w-0"><h4 class="line-clamp-2 text-sm font-semibold text-pretty">${item.name}</h4><p class="mt-1 text-sm font-semibold tabular-nums">${money(item.price)}</p></div><button type="button" data-cart-remove="${item.id}" class="shrink-0 rounded-full px-2 py-1 text-xs font-semibold text-neutral-600 hover:bg-red-50 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green" aria-label="Remove ${item.name} from cart">Remove</button></div><div class="mt-3 flex items-end justify-between gap-3"><div><p class="text-xs text-neutral-500">One Time · ${item.size || ''}</p><p class="mt-2 text-sm font-semibold tabular-nums">${money(item.price * item.quantity)}</p></div><div class="inline-flex items-center rounded-full border border-neutral-300 bg-white"><button type="button" data-cart-item="${item.id}" data-drawer-qty="-1" class="grid size-9 place-items-center rounded-full hover:bg-neutral-100" aria-label="Decrease ${item.name} quantity">−</button><span class="min-w-7 text-center text-xs font-semibold tabular-nums" aria-live="polite">${item.quantity}</span><button type="button" data-cart-item="${item.id}" data-drawer-qty="1" class="grid size-9 place-items-center rounded-full hover:bg-neutral-100" aria-label="Increase ${item.name} quantity">+</button></div></div></div></article>`).join('')}</div></section>`;
    }).join('');
  }

  function bindCartDrawer() {
    const dialog = $('#global-cart-drawer');
    const panel = $('[data-cart-panel]', dialog);
    let trigger = null;
    if (!dialog || !panel) return;

    const closeCart = () => {
      if (!dialog.open) return;
      panel.classList.add('translate-x-full');
      window.setTimeout(() => {
        dialog.close();
        document.documentElement.classList.remove('auth-modal-open');
        trigger?.focus();
      }, 200);
    };

    const openCart = (control) => {
      trigger = control;
      dialog.showModal();
      document.documentElement.classList.add('auth-modal-open');
      requestAnimationFrame(() => panel.classList.remove('translate-x-full'));
      $('[data-cart-close]', dialog)?.focus();
    };

    $$('#main-header button').filter((control) => control.querySelector('iconify-icon[icon="solar:cart-large-2-linear"]')).forEach((control) => {
      control.setAttribute('aria-label', 'Open cart');
      control.addEventListener('click', () => openCart(control));
    });
    $('[data-cart-close]', dialog)?.addEventListener('click', closeCart);
    dialog.addEventListener('click', (event) => { if (event.target === dialog) closeCart(); });
    dialog.addEventListener('cancel', (event) => { event.preventDefault(); closeCart(); });
    dialog.addEventListener('click', (event) => {
      const quantityControl = event.target.closest('[data-drawer-qty]');
      if (quantityControl) {
        const item = readCart().find((entry) => entry.id === quantityControl.dataset.cartItem);
        if (item) setCartQuantity(item.id, item.quantity + Number(quantityControl.dataset.drawerQty));
      }
      const removeControl = event.target.closest('[data-cart-remove]');
      if (removeControl) setCartQuantity(removeControl.dataset.cartRemove, 0);
    });
  }

  function bindSearchSuggestions() {
    const search = $('#main-header input[placeholder*="Search groceries"]');
    const panel = $('#search-suggestions');
    if (!search || !panel) return;
    const open = () => { panel.classList.remove('hidden'); search.setAttribute('aria-expanded', 'true'); };
    const close = () => { panel.classList.add('hidden'); search.setAttribute('aria-expanded', 'false'); };
    search.addEventListener('focus', open);
    search.addEventListener('input', () => {
      open();
      const query = search.value.trim().toLowerCase();
      let visible = 0;
      $$('[role="option"]', panel).forEach((option) => {
        const match = !query || option.textContent.toLowerCase().includes(query);
        option.classList.toggle('hidden', !match);
        if (match) visible += 1;
      });
      $('[data-search-default]', panel)?.classList.toggle('hidden', Boolean(query));
      $('[data-search-results]', panel)?.classList.toggle('hidden', visible === 0);
      $('[data-search-empty]', panel)?.classList.toggle('hidden', visible !== 0);
    });
    search.addEventListener('keydown', (event) => {
      const options = $$('[role="option"]:not(.hidden)', panel);
      if (event.key === 'ArrowDown' && options.length) { event.preventDefault(); open(); options[0].focus(); }
      if (event.key === 'Escape') close();
    });
    $$('[role="option"]', panel).forEach((option, index, options) => option.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowDown') { event.preventDefault(); options[(index + 1) % options.length].focus(); }
      if (event.key === 'ArrowUp') { event.preventDefault(); (index === 0 ? search : options[index - 1]).focus(); }
      if (event.key === 'Escape') { close(); search.focus(); }
    }));
    $$('[data-search-term]', panel).forEach((term) => term.addEventListener('click', () => { search.value = term.dataset.searchTerm; search.dispatchEvent(new Event('input')); search.focus(); }));
    document.addEventListener('click', (event) => { if (!panel.contains(event.target) && event.target !== search) close(); });
  }

  function bindCommerceControls() {
    document.addEventListener('click', (event) => {
      const cartQuantity = event.target.closest('[data-qty][data-cart-item]');
      if (cartQuantity) {
        const item = readCart().find((entry) => entry.id === cartQuantity.dataset.cartItem);
        if (item) setCartQuantity(item.id, item.quantity + Number(cartQuantity.dataset.qty));
        return;
      }
      const cartRemove = event.target.closest('[data-remove-line][data-cart-item]');
      if (cartRemove) { setCartQuantity(cartRemove.dataset.cartItem, 0); return; }
      const control = event.target.closest('[data-product-add], [data-add-product], [data-quick-add], button[aria-label^="Add "][aria-label$="to cart"], button[aria-label="Add to cart"]');
      if (!control || control.closest('#global-cart-drawer, [data-store-cart]')) return;
      const quantity = control.matches('[data-product-add]') ? Number($('[data-product-qty-value]')?.textContent || 1) : 1;
      const product = productFromControl(control);
      addToCart(product, quantity);
      control.setAttribute('aria-pressed', 'true');
      const original = control.innerHTML;
      if (control.matches('[data-product-add]')) control.textContent = 'Added to Cart';
      else control.innerHTML = '<iconify-icon icon="solar:check-circle-bold" width="18"></iconify-icon><span class="sr-only">Added</span>';
      control.classList.add('bg-brand-green', 'text-white');
      if ($('[data-product-status]')) $('[data-product-status]').textContent = `${product.name} added to cart.`;
      window.setTimeout(() => {
        control.innerHTML = original;
        control.classList.remove('bg-brand-green', 'text-white');
        control.setAttribute('aria-pressed', 'false');
      }, 700);
    });
    $$('[data-quantity]').forEach((stepper) => $$('[data-qty]', stepper).forEach((control) => control.addEventListener('click', () => {
      const value = $('span', stepper);
      const next = Math.max(1, Number(value.textContent) + Number(control.dataset.qty));
      if (control.dataset.cartItem) return;
      value.textContent = String(next);
    })));
    $$('[data-product-qty]').forEach((control) => control.addEventListener('click', () => {
      const value = $('[data-product-qty-value]');
      value.textContent = String(Math.max(1, Number(value.textContent) + Number(control.dataset.productQty)));
    }));
    $('[data-wishlist]')?.addEventListener('click', (event) => {
      const control = event.currentTarget;
      const selected = control.getAttribute('aria-pressed') === 'true';
      control.setAttribute('aria-pressed', String(!selected));
      control.setAttribute('aria-label', selected ? 'Add to wishlist' : 'Remove from wishlist');
      control.querySelector('iconify-icon')?.setAttribute('icon', selected ? 'solar:heart-linear' : 'solar:heart-bold');
    });
    const gallery = $('[aria-label="Product gallery"]');
    gallery?.addEventListener('click', (event) => {
      const control = event.target.closest('button');
      if (!control) return;
      const preview = control.querySelector('img');
      const mainImage = control.closest('div').previousElementSibling?.querySelector('img');
      if (preview && mainImage) mainImage.src = preview.src;
      $$('button', gallery).forEach((button) => {
        const selected = button === control;
        button.classList.toggle('border-2', selected);
        button.classList.toggle('border-brand-green', selected);
        button.setAttribute('aria-pressed', String(selected));
      });
    });
    $$('[data-store-toggle]').forEach((control) => control.addEventListener('click', () => {
      const items = $('[data-store-items]', control.closest('[data-store-cart]'));
      const expanded = control.getAttribute('aria-expanded') === 'true';
      control.setAttribute('aria-expanded', String(!expanded));
      items?.classList.toggle('hidden', expanded);
    }));
    $$('[data-remove-line]').forEach((control) => control.addEventListener('click', () => {
      if (control.dataset.cartItem) return;
      const store = control.closest('[data-store-cart]');
      control.closest('[data-store-items] > div')?.remove();
      if (!store?.querySelector('[data-store-items] > div')) store.innerHTML = '<div class="p-7 text-center"><h2 class="font-semibold">This store cart is empty</h2><p class="mt-2 text-sm text-neutral-500">Add another item or continue with your remaining stores.</p><a href="shop-by-stores.html?view=grocery" class="mt-4 inline-flex rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white">Add products</a></div>';
    }));
    $$('[data-fulfillment]').forEach((control) => control.addEventListener('click', () => {
      $$('[data-fulfillment]').forEach((item) => {
        const selected = item === control;
        item.setAttribute('aria-pressed', String(selected));
        item.classList.toggle('bg-brand-green', selected);
        item.classList.toggle('text-white', selected);
      });
      let status = $('[data-fulfillment-status]');
      if (!status) {
        control.closest('[role="group"]')?.insertAdjacentHTML('afterend', '<p data-fulfillment-status class="self-center text-xs text-neutral-500" aria-live="polite"></p>');
        status = $('[data-fulfillment-status]');
      }
      if (status) status.textContent = control.dataset.fulfillment === 'Delivery' ? 'Delivery slots are shown below.' : 'Pickup availability will be confirmed for each store.';
      const addressLabel = $$('main p').find((node) => node.textContent.trim() === 'DELIVERY ADDRESS' || node.textContent.trim() === 'PICKUP CONTACT');
      if (addressLabel) addressLabel.textContent = control.dataset.fulfillment === 'Delivery' ? 'DELIVERY ADDRESS' : 'PICKUP CONTACT';
    }));
    $$('[data-tip]').forEach((control) => control.addEventListener('click', () => {
      const rates = {'No tip':0,'5%':0.05,'10%':0.10,'15%':0.15,'20%':0.20};
      $$('[data-tip]').forEach((tip) => {
        const selected = tip === control;
        tip.setAttribute('aria-pressed', String(selected));
        tip.classList.toggle('bg-neutral-950', selected);
        tip.classList.toggle('text-white', selected);
        tip.classList.toggle('border-neutral-950', selected);
      });
      checkoutState.tipRate = rates[control.dataset.tip];
      writeCheckoutState();
      renderCheckoutState();
    }));
    $('[data-apply-voucher]')?.addEventListener('click', () => {
      const code = $('#voucher-code')?.value.trim().toUpperCase();
      const status = $('[data-voucher-status]');
      checkoutState.voucherDiscount = code === 'WELCOME10' ? 10 : 0;
      writeCheckoutState();
      status.textContent = code === 'WELCOME10' ? 'WELCOME10 applied: $10.00 off eligible items.' : 'This voucher is invalid, expired, or not eligible for these store carts.';
      status.className = `mt-2 min-h-5 text-sm ${code === 'WELCOME10' ? 'text-brand-dark' : 'text-red-700'}`;
      renderCheckoutState();
    });
    $$('[data-value-tab]').forEach((control) => control.addEventListener('click', () => {
      $$('[data-value-tab]').forEach((tab) => {
        const selected = tab === control;
        tab.setAttribute('aria-selected', String(selected));
        tab.classList.toggle('bg-neutral-950', selected);
        tab.classList.toggle('text-white', selected);
        tab.classList.toggle('border-neutral-950', selected);
      });
      const panel = $('[data-value-panel]');
      panel?.classList.toggle('hidden', control.dataset.valueTab !== '0');
      let status = $('[data-value-tab-status]');
      if (!status) {
        control.closest('[role="tablist"]')?.insertAdjacentHTML('afterend', '<p data-value-tab-status class="mt-5 text-sm text-neutral-600" aria-live="polite"></p>');
        status = $('[data-value-tab-status]');
      }
      if (status) status.textContent = control.dataset.valueTab === '0' ? '' : control.dataset.valueTab === '1' ? 'No reward points are available for this order.' : 'Wallet balance: $0.00. Add funds or choose another payment method at checkout.';
    }));
  }

  function bindFormsAndFlows() {
    $('#payment-form')?.addEventListener('submit', (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const error = $('[data-payment-error]');
      const number = form.elements.cardnumber.value.replace(/\s/g, '');
      const paymentMethod = $('[data-payment-method][aria-pressed="true"]')?.dataset.paymentMethod || 'card';
      let message = '';
      let invalidName = '';
      $$('[data-field-error]', form).forEach((fieldError) => fieldError.remove());
      $$('[aria-invalid="true"]', form).forEach((field) => field.removeAttribute('aria-invalid'));
      if (!form.elements.email.value.includes('@')) { message = 'Enter a valid email address.'; invalidName = 'email'; }
      else if (!form.elements.phone.value.trim()) { message = 'Enter a contact phone number.'; invalidName = 'phone'; }
      else if (paymentMethod === 'card' && !form.elements.cardholder.value.trim()) { message = 'Enter the cardholder name.'; invalidName = 'cardholder'; }
      else if (paymentMethod === 'card' && !/^\d{16}$/.test(number)) { message = 'Enter a valid 16-digit card number.'; invalidName = 'cardnumber'; }
      else if (paymentMethod === 'card' && !form.elements.expiry.value.trim()) { message = 'Check the expiry date.'; invalidName = 'expiry'; }
      else if (paymentMethod === 'card' && !/^\d{3,4}$/.test(form.elements.cvv.value)) { message = 'Enter a valid CVV.'; invalidName = 'cvv'; }
      else if (!form.elements.terms.checked) { message = 'Agree to the checkout terms before placing the order.'; invalidName = 'terms'; }
      if (message) {
        error.textContent = message;
        const field = form.elements[invalidName];
        const fieldErrorId = `${invalidName}-field-error`;
        field?.setAttribute('aria-invalid', 'true');
        field?.setAttribute('aria-describedby', fieldErrorId);
        field?.closest('label')?.insertAdjacentHTML('beforeend', `<p id="${fieldErrorId}" data-field-error class="mt-2 text-sm font-normal text-red-700">${message}</p>`);
        field?.focus();
        return;
      }
      $('[data-payment-label]').textContent = 'Processing securely…';
      error.textContent = 'Your bank may request 3DS or a one-time verification code.';
      error.className = 'mt-3 min-h-5 text-sm text-neutral-600';
      window.setTimeout(() => { window.location.href = paymentMethod === 'card' && number.endsWith('0002') ? 'order-failed.html' : 'order-success.html'; }, 700);
    });
    $$('[data-payment-method]').forEach((control) => control.addEventListener('click', () => {
      $$('[data-payment-method]').forEach((method) => {
        const selected = method === control;
        method.setAttribute('aria-pressed', String(selected));
        method.classList.toggle('border-brand-green', selected);
        method.classList.toggle('border-2', selected);
        method.classList.toggle('border-neutral-300', !selected);
      });
      const cardFields = $('[data-card-fields]');
      const useCard = control.dataset.paymentMethod === 'card';
      cardFields?.classList.toggle('hidden', !useCard);
      $$('input', cardFields).forEach((input) => { input.disabled = !useCard; });
      $('[data-payment-error]').textContent = useCard ? '' : 'Wallet selected. Card details are not required.';
      $('[data-payment-error]').className = 'mt-3 min-h-5 text-sm text-neutral-600';
    }));

    const paymentForm = $('#payment-form');
    if (paymentForm) {
      ['email', 'phone', 'cardholder', 'cardnumber', 'expiry', 'cvv', 'terms'].forEach((name) => paymentForm.elements[name]?.setAttribute('required', ''));
      $$('input', paymentForm).forEach((input) => input.setAttribute('aria-required', input.required ? 'true' : 'false'));
    }

    $$('[data-reset-next]').forEach((control) => control.addEventListener('click', () => {
      const next = Number(control.dataset.resetNext);
      const form = $('#reset-form');
      const status = $('[data-reset-status]');
      if (next === 2 && !form.elements.identity.value.trim()) { status.textContent = 'Enter the email or mobile number on your account.'; status.className = 'mt-3 min-h-5 text-sm text-red-700'; return; }
      if (next === 3 && !/^\d{6}$/.test(form.elements.otp.value)) { status.textContent = 'Enter the six-digit code. Codes expire after 10 minutes.'; status.className = 'mt-3 min-h-5 text-sm text-red-700'; return; }
      $$('[data-reset-step]').forEach((step) => step.classList.toggle('hidden', Number(step.dataset.resetStep) !== next));
      $$('[data-reset-step-label]').forEach((label) => {
        const active = Number(label.dataset.resetStepLabel) <= next;
        label.classList.toggle('border-brand-green', active);
        label.classList.toggle('border-neutral-200', !active);
        label.classList.toggle('font-semibold', active);
        label.classList.toggle('text-neutral-500', !active);
      });
      status.textContent = next === 2 ? 'Reset code sent. Use any six digits in this prototype.' : '';
      status.className = 'mt-3 min-h-5 text-sm text-brand-dark';
    }));
    $('[data-resend-code]')?.addEventListener('click', () => { $('[data-reset-status]').textContent = 'A fresh code was sent.'; });
    $('#reset-form')?.addEventListener('submit', (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const status = $('[data-reset-status]');
      const valid = /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(form.elements.password.value);
      if (!valid) { status.textContent = 'Use at least 8 characters with a number and uppercase letter.'; status.className = 'mt-3 min-h-5 text-sm text-red-700'; return; }
      if (form.elements.password.value !== form.elements.confirm.value) { status.textContent = 'The passwords do not match.'; status.className = 'mt-3 min-h-5 text-sm text-red-700'; return; }
      status.textContent = 'Password updated. You can now return to login.';
      status.className = 'mt-3 min-h-5 text-sm text-brand-dark';
    });
    $('#order-help-form')?.addEventListener('submit', (event) => {
      event.preventDefault();
      const selected = $$('input[name="affected"]:checked', event.currentTarget);
      const status = $('[data-help-status]');
      if (!selected.length) { status.textContent = 'Select at least one affected item.'; status.className = 'min-h-5 text-sm text-red-700'; return; }
      status.textContent = 'Support request QH-20814 submitted. We’ll update you by email.';
      status.className = 'min-h-5 text-sm text-brand-dark';
    });
    $('[data-reorder-selected]')?.addEventListener('click', () => { $('[data-help-status]').textContent = 'Selected available items were added to the prototype cart.'; });
  }

  function bindPageUtilities() {
    if (document.body.dataset.page === 'search-results') {
      const params = new URLSearchParams(window.location.search);
      const query = (params.get('q') || '').trim();
      const heading = $('main h1');
      if (heading) heading.textContent = query ? `Results for “${query}”` : 'Search results';
      const cards = $$('main section[aria-label="Products"] article');
      cards.forEach((card) => card.dataset.searchText = card.textContent.trim().toLowerCase());
      const applyResultsFilter = (filter = 'All products') => {
        let visible = 0;
        cards.forEach((card) => {
          const price = Number(card.querySelector('.tabular-nums')?.textContent.replace(/[^0-9.]/g, '') || 0);
          const matchesQuery = !query || card.dataset.searchText.includes(query.toLowerCase());
          const matchesFilter = filter === 'All products' || filter === 'Grocery' || (filter === 'Under $10' && price < 10);
          const show = matchesQuery && matchesFilter && filter !== 'Meals';
          card.classList.toggle('hidden', !show);
          if (show) visible += 1;
        });
        const copy = heading?.nextElementSibling;
        if (copy) copy.textContent = `${visible} ${visible === 1 ? 'product' : 'products'} available near 60601.`;
        let empty = $('[data-search-empty-state]');
        if (!empty && cards[0]?.parentElement) {
          cards[0].parentElement.insertAdjacentHTML('afterend', '<div data-search-empty-state class="hidden border border-neutral-200 p-8 text-center"><h2 class="text-xl font-semibold">No matching products</h2><p class="mt-2 text-sm text-neutral-500">Try a broader search or view all products.</p></div>');
          empty = $('[data-search-empty-state]');
        }
        empty?.classList.toggle('hidden', visible !== 0);
      };
      $$('[data-filter-chip]').forEach((chip) => chip.addEventListener('click', () => applyResultsFilter(chip.textContent.trim())));
      applyResultsFilter();
    }

    const homepageSectionLinks = [
      ['Keep shopping for', 'keep-shopping.html'],
      ['Buy again', 'past-products.html'],
      ['Pick up where you left off', 'pick-up-where-you-left.html']
    ];
    homepageSectionLinks.forEach(([heading, href]) => {
      const title = Array.from(document.querySelectorAll('h2, h3')).find((node) => node.textContent.trim().toLowerCase() === heading.toLowerCase());
      const section = title?.closest('section');
      const viewAll = section ? Array.from(section.querySelectorAll('a')).find((anchor) => /view all/i.test(anchor.textContent)) : null;
      if (viewAll) viewAll.href = href;
    });
    $$('[data-product-filter], [data-store-category]').forEach((control) => control.addEventListener('click', () => {
      const selector = control.hasAttribute('data-product-filter') ? '[data-product-filter]' : '[data-store-category]';
      $$(selector).forEach((item) => {
        const selected = item === control;
        item.setAttribute(item.hasAttribute('data-product-filter') ? 'aria-pressed' : 'aria-selected', String(selected));
        item.classList.toggle('bg-neutral-950', selected);
        item.classList.toggle('text-white', selected);
        item.classList.toggle('border-neutral-950', selected);
      });
    }));
    $('[data-store-search]')?.addEventListener('input', (event) => {
      const query = event.currentTarget.value.trim().toLowerCase();
      $$('[data-product-card]').forEach((card) => card.classList.toggle('hidden', !card.textContent.toLowerCase().includes(query)));
    });
    $('[data-open-subscription]')?.addEventListener('click', (event) => {
      event.currentTarget.textContent = 'Choose a frequency on any meal';
      document.getElementById('meal-grid')?.scrollIntoView({behavior: 'smooth', block: 'start'});
    });
    $('[data-clear-history]')?.addEventListener('click', () => {
      $('[data-recent-products]')?.classList.add('hidden');
      $('[data-recent-empty]')?.classList.remove('hidden');
    });
    $$('[data-ticket-tab]').forEach((control) => control.addEventListener('click', () => {
      $$('[data-ticket-tab]').forEach((tab) => {
        const selected = tab === control;
        tab.setAttribute('aria-selected', String(selected));
        tab.classList.toggle('bg-neutral-950', selected);
        tab.classList.toggle('text-white', selected);
        tab.classList.toggle('border-neutral-950', selected);
      });
      $$('[data-ticket-panel]').forEach((panel) => panel.classList.toggle('hidden', panel.dataset.ticketPanel !== control.dataset.ticketTab));
    }));
    $('[data-view-ticket]')?.addEventListener('click', (event) => {
      let status = $('[data-ticket-status]');
      if (!status) {
        event.currentTarget.insertAdjacentHTML('afterend', '<p data-ticket-status class="mt-3 text-sm font-semibold text-brand-dark" role="status"></p>');
        status = $('[data-ticket-status]');
      }
      status.textContent = 'Ticket QR reference: QL-EVT-12840';
    });
    $('[data-booking-details]')?.addEventListener('click', (event) => { event.currentTarget.textContent = 'Paid · Visa ···· 4242'; });
    $('[data-print-invoice]')?.addEventListener('click', () => window.print());
    $('[data-download-invoice]')?.addEventListener('click', (event) => { event.currentTarget.textContent = 'Use Print → Save as PDF'; });
    $$('[data-share-article]').forEach((control) => control.addEventListener('click', async () => {
      if (control.dataset.shareArticle === 'Copy link') {
        try { await navigator.clipboard.writeText(window.location.href); control.textContent = 'Copied'; } catch (_) { control.textContent = 'Copy unavailable'; }
      }
    }));
    $('[data-system-retry]')?.addEventListener('click', (event) => { event.currentTarget.textContent = 'Connection restored'; event.currentTarget.disabled = true; });
    $('[data-track-carrier]')?.addEventListener('click', (event) => { event.currentTarget.textContent = 'Tracking link ready in production'; });
    $$('[data-share-cart]').forEach((control) => control.addEventListener('click', () => $('#share-cart-dialog')?.showModal()));
  }

  function initialize() {
    applyAccessibilityBaseline();
    applyProductContext();
    injectGlobalCommerceUI();
    applyProductionProductImages();
    renderCartState();
    bindDialogs();
    bindCartDrawer();
    bindSearchSuggestions();
    bindCommerceControls();
    bindFormsAndFlows();
    bindPageUtilities();
  }

  window.QuickllyCart = { read: readCart, add: addToCart, setQuantity: setCartQuantity };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize);
  else initialize();
})();
