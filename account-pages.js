(function () {
    'use strict';

    const menuToggle = document.getElementById('account-nav-toggle');
    const menu = document.getElementById('account-nav');
    menuToggle?.addEventListener('click', () => {
        const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', String(!expanded));
        menu?.classList.toggle('hidden', expanded);
        menuToggle.querySelector('iconify-icon')?.setAttribute('icon', expanded ? 'solar:alt-arrow-down-linear' : 'solar:alt-arrow-up-linear');
    });

    const signoutDialog = document.getElementById('signout-dialog');
    document.querySelectorAll('[data-account-signout]').forEach((button) => button.addEventListener('click', () => signoutDialog?.showModal()));
    document.querySelector('[data-signout-cancel]')?.addEventListener('click', () => signoutDialog?.close());

    document.getElementById('account-profile-form')?.addEventListener('submit', (event) => {
        event.preventDefault();
        const status = document.getElementById('profile-form-status');
        if (status) {
            status.textContent = 'Prototype saved locally. Connect this form to the customer profile API.';
            status.className = 'mt-3 min-h-5 text-sm text-brand-dark';
        }
    });

    document.querySelectorAll('[data-order-filter]').forEach((button) => {
        button.addEventListener('click', () => {
            const filter = button.dataset.orderFilter;
            document.querySelectorAll('[data-order-filter]').forEach((chip) => {
                const selected = chip === button;
                chip.setAttribute('aria-pressed', String(selected));
                chip.classList.toggle('bg-neutral-950', selected);
                chip.classList.toggle('text-white', selected);
                chip.classList.toggle('border-neutral-950', selected);
            });
            document.querySelectorAll('[data-order-card]').forEach((card) => card.classList.toggle('hidden', filter !== 'all' && card.dataset.orderType !== filter));
        });
    });

    document.querySelectorAll('[data-order-details]').forEach((button) => {
        button.addEventListener('click', () => {
            const panel = button.closest('[data-order-card]')?.querySelector('[data-order-detail-panel]');
            const hidden = panel?.classList.contains('hidden');
            panel?.classList.toggle('hidden', !hidden);
            button.textContent = hidden ? 'Hide order details' : 'View order details';
        });
    });

    document.querySelectorAll('[data-account-action]').forEach((button) => {
        button.addEventListener('click', () => {
            const status = button.closest('article, section, form')?.querySelector('[data-card-status], [data-page-status]');
            const messages = {
                'edit-subscription': 'The subscription editor is ready for its recurring-order API.',
                'skip-delivery': 'Prototype only — no real delivery was skipped.',
                'pause-subscription': 'Prototype only — no real subscription was paused.',
                'add-wishlist-cart': 'Added to the prototype cart.',
                'buy-gift-card': 'Continue to a recipient and payment step in production.',
                'choose-pass': 'Plan selected in the prototype. Payment is not connected.',
                'address': 'Connect the shared address modal to account address creation.',
                'edit-address': 'Connect this action to the saved-address editor.'
            };
            if (status) status.textContent = messages[button.dataset.accountAction] || 'Prototype action selected.';
        });
    });

    document.querySelectorAll('[data-wishlist-toggle]').forEach((button) => {
        button.addEventListener('click', () => {
            button.closest('[data-wishlist-card]')?.remove();
            const remaining = document.querySelectorAll('[data-wishlist-card]').length;
            document.getElementById('wishlist-grid')?.classList.toggle('hidden', remaining === 0);
            document.getElementById('wishlist-empty')?.classList.toggle('hidden', remaining !== 0);
        });
    });

    document.querySelectorAll('[data-gift-value]').forEach((button) => {
        button.addEventListener('click', () => {
            document.querySelectorAll('[data-gift-value]').forEach((value) => {
                const selected = value === button;
                value.setAttribute('aria-pressed', String(selected));
                value.classList.toggle('bg-neutral-950', selected);
                value.classList.toggle('text-white', selected);
                value.classList.toggle('border-neutral-950', selected);
            });
        });
    });

    document.querySelector('[data-copy-account-referral]')?.addEventListener('click', async (event) => {
        const link = document.querySelector('[data-referral-link]')?.value || '';
        const status = document.querySelector('[data-referral-status]');
        try {
            await navigator.clipboard.writeText(link);
            event.currentTarget.textContent = 'Copied';
            if (status) status.textContent = 'Referral link copied. Share it with a friend when you are ready.';
        } catch (_) {
            if (status) status.textContent = `Copy this link: ${link}`;
        }
    });

    document.querySelectorAll('[data-hero-interest]').forEach((button) => {
        button.addEventListener('click', () => {
            document.querySelectorAll('[data-hero-interest]').forEach((option) => {
                const selected = option === button;
                option.setAttribute('aria-pressed', String(selected));
                option.classList.toggle('bg-neutral-950', selected);
                option.classList.toggle('border-neutral-950', selected);
                option.classList.toggle('text-white', selected);
                option.textContent = selected ? 'Selected' : 'Select';
            });
            const status = document.querySelector('[data-hero-status]');
            if (status) status.textContent = 'Interest saved in this prototype. Connect it to the community program API before launch.';
        });
    });

    document.getElementById('gift-card-redeem')?.addEventListener('submit', (event) => {
        event.preventDefault();
        const code = new FormData(event.currentTarget).get('giftCardCode')?.trim();
        const status = document.getElementById('gift-card-status');
        if (status) status.textContent = code ? 'Prototype only — connect redemption to the wallet service.' : 'Enter a gift card code.';
    });

    document.getElementById('change-password-form')?.addEventListener('submit', (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const current = form.elements.currentPassword.value;
        const next = form.elements.newPassword.value;
        const confirm = form.elements.confirmPassword.value;
        const error = document.getElementById('password-error');
        let message = '';
        if (!current) message = 'Enter your current password.';
        else if (next.length < 8 || !/\d/.test(next)) message = 'Use at least 8 characters and include a number.';
        else if (next !== confirm) message = 'The new passwords do not match.';
        else message = 'Prototype validated. Connect this form to the authentication service.';
        if (error) {
            error.textContent = message;
            error.className = `min-h-5 text-sm ${message.startsWith('Prototype') ? 'text-brand-dark' : 'text-red-700'}`;
        }
    });
})();
