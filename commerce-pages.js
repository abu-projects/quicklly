(function () {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function injectGlobalCommerceUI() {
    if (!document.getElementById('commerce-global-ui')) {
      document.body.insertAdjacentHTML('beforeend', `
        <div id="commerce-global-ui">
          <dialog id="global-cart-drawer" class="fixed inset-y-0 left-auto right-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden bg-transparent p-0 backdrop:bg-black/50 sm:max-w-[460px]" aria-labelledby="global-cart-title">
            <div data-cart-panel class="flex h-dvh translate-x-full flex-col bg-white shadow-xl transition-transform duration-200">
              <header class="flex items-start justify-between gap-5 border-b border-neutral-200 px-5 py-5 sm:px-6"><div><p class="text-xs font-semibold text-brand-dark">2 STORES · 3 ITEMS</p><h2 id="global-cart-title" class="mt-1 text-2xl font-semibold text-balance">Your Cart</h2></div><button type="button" data-cart-close class="grid size-10 place-items-center rounded-full border border-neutral-200 text-neutral-700 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green" aria-label="Close cart"><iconify-icon icon="solar:close-circle-linear" width="22"></iconify-icon></button></header>
              <div class="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">
                <section aria-labelledby="drawer-store-one"><div class="flex items-start justify-between gap-4"><div><h3 id="drawer-store-one" class="font-semibold">Quicklly Indian Grocery Nationwide</h3><p class="mt-1 text-xs text-neutral-500">Nationwide shipping</p></div><span class="text-sm font-semibold tabular-nums">$17.48</span></div><p class="mt-4 border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900 text-pretty">Add $32.52 to reach this store’s $50 minimum.</p><div class="mt-4 divide-y divide-neutral-200"><article class="grid grid-cols-[64px_1fr] gap-4 py-4"><div class="size-16 bg-neutral-50"><img src="imgs/aashirvaad_atta.png" alt="Aashirvaad Whole Wheat Atta" class="size-full object-contain p-2"></div><div><div class="flex items-start justify-between gap-3"><div><h4 class="text-sm font-semibold text-pretty">Aashirvaad Whole Wheat Atta</h4><p class="mt-1 text-xs text-neutral-500">10 lbs</p></div><span class="text-sm font-semibold tabular-nums">$12.99</span></div><div class="mt-3 inline-flex items-center rounded-full border border-neutral-300"><button type="button" data-drawer-qty="-1" class="grid size-8 place-items-center" aria-label="Decrease Aashirvaad quantity">−</button><span class="min-w-7 text-center text-xs font-semibold tabular-nums" aria-live="polite">1</span><button type="button" data-drawer-qty="1" class="grid size-8 place-items-center" aria-label="Increase Aashirvaad quantity">+</button></div></div></article><article class="grid grid-cols-[64px_1fr] gap-4 py-4"><div class="size-16 bg-neutral-50"><img src="imgs/haldiram_aloo_bhujia.png" alt="Haldiram’s Aloo Bhujia" class="size-full object-contain p-2"></div><div><div class="flex items-start justify-between gap-3"><div><h4 class="text-sm font-semibold text-pretty">Haldiram’s Aloo Bhujia</h4><p class="mt-1 text-xs text-neutral-500">400 g</p></div><span class="text-sm font-semibold tabular-nums">$4.49</span></div><div class="mt-3 inline-flex items-center rounded-full border border-neutral-300"><button type="button" data-drawer-qty="-1" class="grid size-8 place-items-center" aria-label="Decrease Aloo Bhujia quantity">−</button><span class="min-w-7 text-center text-xs font-semibold tabular-nums" aria-live="polite">1</span><button type="button" data-drawer-qty="1" class="grid size-8 place-items-center" aria-label="Increase Aloo Bhujia quantity">+</button></div></div></article></div></section>
                <section class="mt-6 border-t border-neutral-300 pt-5" aria-labelledby="drawer-store-two"><div class="flex items-start justify-between gap-4"><div><h3 id="drawer-store-two" class="font-semibold">The Baklava Box</h3><p class="mt-1 text-xs text-neutral-500">Arrives Aug 24–27</p></div><span class="text-sm font-semibold tabular-nums">$64.99</span></div><article class="mt-4 grid grid-cols-[64px_1fr] gap-4 py-4"><div class="size-16 bg-neutral-50"><img src="imgs/kaju_katli_sweets.png" alt="Premium Kaju Katli" class="size-full object-contain p-2"></div><div><div class="flex items-start justify-between gap-3"><div><h4 class="text-sm font-semibold text-pretty">Premium Kaju Katli</h4><p class="mt-1 text-xs text-neutral-500">1 lb</p></div><span class="text-sm font-semibold tabular-nums">$64.99</span></div><div class="mt-3 inline-flex items-center rounded-full border border-neutral-300"><button type="button" data-drawer-qty="-1" class="grid size-8 place-items-center" aria-label="Decrease Kaju Katli quantity">−</button><span class="min-w-7 text-center text-xs font-semibold tabular-nums" aria-live="polite">1</span><button type="button" data-drawer-qty="1" class="grid size-8 place-items-center" aria-label="Increase Kaju Katli quantity">+</button></div></div></article></section>
              </div>
              <footer class="border-t border-neutral-200 bg-white px-5 pt-5 sm:px-6" style="padding-bottom:max(1.25rem,env(safe-area-inset-bottom))"><div class="flex items-end justify-between gap-4"><div><p class="text-xs text-neutral-500">Estimated subtotal</p><p class="mt-1 text-2xl font-semibold tabular-nums">$82.47</p></div><p class="text-xs text-neutral-500">Fees calculated at checkout</p></div><div class="mt-4 grid gap-3"><a href="checkout.html" class="flex min-h-12 items-center justify-between rounded-full bg-brand-green px-6 text-sm font-semibold text-white hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"><span>Proceed to Checkout</span><iconify-icon icon="solar:arrow-right-linear" width="18"></iconify-icon></a><a href="checkout.html?view=full" class="inline-flex min-h-11 items-center justify-center rounded-full border border-neutral-300 px-5 text-sm font-semibold text-neutral-950 hover:border-brand-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green">View Full Cart</a></div></footer>
            </div>
          </dialog>
          <dialog id="replacement-dialog" class="w-[min(94vw,760px)] p-0 bg-transparent backdrop:bg-black/50" aria-labelledby="replacement-title">
            <div class="bg-white shadow-xl"><header class="flex items-start justify-between gap-5 border-b border-neutral-200 p-6"><div><p class="text-xs font-semibold text-brand-dark">REPLACEMENT PREFERENCE</p><h2 id="replacement-title" class="mt-2 text-2xl font-semibold text-balance">If this item is unavailable</h2></div><button type="button" data-close-dialog="replacement-dialog" class="grid size-10 place-items-center rounded-full border border-neutral-200" aria-label="Close replacement options"><iconify-icon icon="solar:close-circle-linear" width="22"></iconify-icon></button></header><div class="p-6"><div class="flex items-center gap-4 border border-neutral-200 p-4"><img src="imgs/aashirvaad_atta.png" alt="Aashirvaad Whole Wheat Atta" class="size-16 object-contain"><div><p class="font-semibold">Aashirvaad Whole Wheat Atta</p><p class="mt-1 text-sm text-neutral-500">10 lbs · $12.99</p></div></div><fieldset class="mt-5 space-y-3"><legend class="sr-only">Choose replacement preference</legend><label class="flex cursor-pointer gap-4 border-2 border-brand-green p-4"><input type="radio" name="replacement" value="best" checked class="mt-1 size-4 accent-emerald-600"><span><strong class="block">Replace with the best match</strong><span class="mt-1 block text-sm text-neutral-500">Similar brand, size, and price. We’ll show any difference.</span></span></label><label class="flex cursor-pointer gap-4 border border-neutral-200 p-4"><input type="radio" name="replacement" value="manual" class="mt-1 size-4 accent-emerald-600"><span><strong class="block">Choose manually</strong><span class="mt-1 block text-sm text-neutral-500">Review suggested alternatives before fulfillment.</span></span></label><label class="flex cursor-pointer gap-4 border border-neutral-200 p-4"><input type="radio" name="replacement" value="none" class="mt-1 size-4 accent-emerald-600"><span><strong class="block">No replacement</strong><span class="mt-1 block text-sm text-neutral-500">Refund this item if it cannot be fulfilled.</span></span></label></fieldset><label class="mt-5 flex items-center gap-3 text-sm"><input type="checkbox" class="size-4 accent-emerald-600">Use this preference for similar items</label><p class="mt-3 min-h-5 text-sm text-brand-dark" data-replacement-status aria-live="polite"></p><div class="mt-6 flex justify-end gap-3"><button type="button" data-close-dialog="replacement-dialog" class="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold">Cancel</button><button type="button" data-save-replacement class="rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white">Save preference</button></div></div></div>
          </dialog>
          <dialog id="delivery-slot-dialog" class="w-[min(94vw,720px)] p-0 bg-transparent backdrop:bg-black/50" aria-labelledby="slot-title"><div class="bg-white shadow-xl"><header class="flex items-start justify-between gap-5 border-b border-neutral-200 p-6"><div><p class="text-xs font-semibold text-brand-dark">QUICKLLY INDIAN GROCERY</p><h2 id="slot-title" class="mt-2 text-2xl font-semibold">Choose a delivery slot</h2></div><button type="button" data-close-dialog="delivery-slot-dialog" class="grid size-10 place-items-center rounded-full border border-neutral-200" aria-label="Close delivery slots">×</button></header><div class="p-6"><div class="grid grid-cols-3 gap-2" role="tablist">${['Sat 22','Sun 23','Mon 24'].map((day, index) => `<button type="button" data-slot-day aria-selected="${index === 0}" class="border p-3 text-sm font-semibold ${index === 0 ? 'border-brand-green bg-brand-light' : 'border-neutral-200'}">${day}</button>`).join('')}</div><fieldset class="mt-5 grid gap-3 sm:grid-cols-2"><legend class="sr-only">Available times</legend>${['9 AM–12 PM · Free','12–2 PM · $2.99','2–5 PM · Free','6–9 PM · $4.99'].map((slot, index) => `<label class="flex items-center gap-3 border border-neutral-200 p-4 text-sm font-semibold"><input type="radio" name="delivery-slot" ${index === 2 ? 'checked' : ''} class="accent-emerald-600">${slot}</label>`).join('')}</fieldset><div class="mt-6 flex justify-between gap-3"><button type="button" data-remove-slot class="text-sm font-semibold text-red-700">Remove slot</button><button type="button" data-save-slot class="rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white">Use this slot</button></div></div></div></dialog>
          <dialog id="share-cart-dialog" class="w-[min(94vw,560px)] p-0 bg-transparent backdrop:bg-black/50" aria-labelledby="share-title"><div class="bg-white p-6 shadow-xl"><div class="flex items-start justify-between"><div><p class="text-xs font-semibold text-brand-dark">SHARE CART</p><h2 id="share-title" class="mt-2 text-2xl font-semibold">Shop together</h2></div><button type="button" data-close-dialog="share-cart-dialog" class="grid size-10 place-items-center rounded-full border border-neutral-200" aria-label="Close share cart">×</button></div><p class="mt-4 text-sm text-neutral-600 text-pretty">The link includes 3 items from 2 stores. Prices, stock, and address eligibility are rechecked for the recipient.</p><div class="mt-5 flex gap-3"><input readonly value="https://quicklly.com/cart/shared/QL84627" class="min-w-0 flex-1 rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 text-sm"><button type="button" data-copy-cart class="rounded-xl bg-neutral-950 px-5 text-sm font-semibold text-white">Copy</button></div><p class="mt-2 min-h-5 text-sm text-brand-dark" data-share-status aria-live="polite"></p><div class="mt-5 grid grid-cols-2 gap-3"><a href="mailto:?subject=Quicklly%20cart" class="rounded-full border border-neutral-300 px-5 py-2.5 text-center text-sm font-semibold">Email</a><button type="button" data-share-message class="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold">Messages</button></div></div></dialog>
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

  function bindDialogs() {
    if (document.body.dataset.page === 'checkout' && !document.querySelector('[data-open-delivery-slot]')) {
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
    $$('[data-drawer-qty]', dialog).forEach((control) => control.addEventListener('click', () => {
      const value = control.parentElement.querySelector('span');
      value.textContent = String(Math.max(1, Number(value.textContent) + Number(control.dataset.drawerQty)));
    }));
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
    $$('[data-quantity]').forEach((stepper) => $$('[data-qty]', stepper).forEach((control) => control.addEventListener('click', () => {
      const value = $('span', stepper);
      const next = Math.max(1, Number(value.textContent) + Number(control.dataset.qty));
      value.textContent = String(next);
    })));
    $$('[data-product-qty]').forEach((control) => control.addEventListener('click', () => {
      const value = $('[data-product-qty-value]');
      value.textContent = String(Math.max(1, Number(value.textContent) + Number(control.dataset.productQty)));
    }));
    $('[data-product-add]')?.addEventListener('click', (event) => {
      event.currentTarget.textContent = 'Added to Cart';
      event.currentTarget.classList.add('bg-brand-green');
      $('[data-product-status]').textContent = 'Added to Quicklly Indian Grocery Nationwide cart.';
    });
    $$('[data-add-product]').forEach((control) => control.addEventListener('click', () => {
      control.innerHTML = '<iconify-icon icon="solar:check-circle-bold" width="16"></iconify-icon><span>Added</span>';
      control.classList.add('bg-brand-green', 'text-white');
      control.setAttribute('aria-pressed', 'true');
    }));
    $$('[data-store-toggle]').forEach((control) => control.addEventListener('click', () => {
      const items = $('[data-store-items]', control.closest('[data-store-cart]'));
      const expanded = control.getAttribute('aria-expanded') === 'true';
      control.setAttribute('aria-expanded', String(!expanded));
      items?.classList.toggle('hidden', expanded);
    }));
    $$('[data-remove-line]').forEach((control) => control.addEventListener('click', () => {
      const store = control.closest('[data-store-cart]');
      control.closest('[data-store-items] > div')?.remove();
      if (!store?.querySelector('[data-store-items] > div')) store.innerHTML = '<div class="p-7 text-center"><h2 class="font-semibold">This store cart is empty</h2><p class="mt-2 text-sm text-neutral-500">Add another item or continue with your remaining stores.</p><a href="category.html" class="mt-4 inline-flex rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white">Add products</a></div>';
    }));
    $$('[data-fulfillment]').forEach((control) => control.addEventListener('click', () => $$('[data-fulfillment]').forEach((item) => {
      const selected = item === control;
      item.setAttribute('aria-pressed', String(selected));
      item.classList.toggle('bg-brand-green', selected);
      item.classList.toggle('text-white', selected);
    })));
    $$('[data-tip]').forEach((control) => control.addEventListener('click', () => {
      const amounts = {'No tip':'$0.00','5%':'$3.97','10%':'$7.94','15%':'$11.91','20%':'$15.88'};
      $$('[data-tip]').forEach((tip) => {
        const selected = tip === control;
        tip.setAttribute('aria-pressed', String(selected));
        tip.classList.toggle('bg-neutral-950', selected);
        tip.classList.toggle('text-white', selected);
        tip.classList.toggle('border-neutral-950', selected);
      });
      $('[data-tip-total]').textContent = amounts[control.dataset.tip];
    }));
    $('[data-apply-voucher]')?.addEventListener('click', () => {
      const code = $('#voucher-code')?.value.trim().toUpperCase();
      const status = $('[data-voucher-status]');
      status.textContent = code === 'WELCOME10' ? 'WELCOME10 applied: $10.00 off eligible items.' : 'This voucher is invalid, expired, or not eligible for these store carts.';
      status.className = `mt-2 min-h-5 text-sm ${code === 'WELCOME10' ? 'text-brand-dark' : 'text-red-700'}`;
    });
    $$('[data-value-tab]').forEach((control) => control.addEventListener('click', () => $$('[data-value-tab]').forEach((tab) => {
      const selected = tab === control;
      tab.setAttribute('aria-selected', String(selected));
      tab.classList.toggle('bg-neutral-950', selected);
      tab.classList.toggle('text-white', selected);
      tab.classList.toggle('border-neutral-950', selected);
    })));
  }

  function bindFormsAndFlows() {
    $('#payment-form')?.addEventListener('submit', (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const error = $('[data-payment-error]');
      const number = form.elements.cardnumber.value.replace(/\s/g, '');
      let message = '';
      if (!form.elements.email.value.includes('@')) message = 'Enter a valid email address.';
      else if (!form.elements.phone.value.trim()) message = 'Enter a contact phone number.';
      else if (!form.elements.cardholder.value.trim()) message = 'Enter the cardholder name.';
      else if (!/^\d{16}$/.test(number)) message = 'Enter a valid 16-digit card number.';
      else if (!form.elements.expiry.value.trim() || !/^\d{3,4}$/.test(form.elements.cvv.value)) message = 'Check the expiry date and CVV.';
      else if (!form.elements.terms.checked) message = 'Agree to the checkout terms before placing the order.';
      if (message) { error.textContent = message; return; }
      $('[data-payment-label]').textContent = 'Processing securely…';
      error.textContent = 'Your bank may request 3DS or a one-time verification code.';
      error.className = 'mt-3 min-h-5 text-sm text-neutral-600';
      window.setTimeout(() => { window.location.href = number.endsWith('0002') ? 'order-failed.html' : 'order-success.html'; }, 700);
    });
    $$('[data-payment-method]').forEach((control) => control.addEventListener('click', () => $$('[data-payment-method]').forEach((method) => {
      const selected = method === control;
      method.setAttribute('aria-pressed', String(selected));
      method.classList.toggle('border-brand-green', selected);
      method.classList.toggle('border-2', selected);
      method.classList.toggle('border-neutral-300', !selected);
    })));

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
    $('[data-view-ticket]')?.addEventListener('click', () => alert('Ticket QR: QL-EVT-12840'));
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
    injectGlobalCommerceUI();
    bindDialogs();
    bindCartDrawer();
    bindSearchSuggestions();
    bindCommerceControls();
    bindFormsAndFlows();
    bindPageUtilities();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize);
  else initialize();
})();
