(function () {
    'use strict';

    function initializeStandalonePage() {
        const drawer = document.getElementById('side-drawer');
        const drawerBackdrop = document.getElementById('side-drawer-backdrop');
        const addressBackdrop = document.getElementById('address-modal-backdrop');
        const addressModal = document.getElementById('address-modal');
        const activeLabels = {
            'meal-kits': 'Meal Kits',
            'indian-sweets': 'Indian Sweets',
            'roti-kit': 'Roti Kit',
            organic: 'Organic',
            gifting: 'Gifting',
            aha: 'Aha',
            catering: 'Catering'
        };
        const activeLabel = activeLabels[document.body.dataset.page];
        if (activeLabel) {
            document.querySelectorAll('#main-header nav a').forEach((link) => {
                if (link.textContent.trim() !== activeLabel) return;
                link.classList.add('text-brand-green', 'font-semibold', 'border-b-2');
                link.setAttribute('aria-current', 'page');
            });
        }

        function openDrawer() {
            drawer?.classList.remove('-translate-x-full');
            drawerBackdrop?.classList.remove('opacity-0', 'pointer-events-none');
        }

        function closeDrawer() {
            drawer?.classList.add('-translate-x-full');
            drawerBackdrop?.classList.add('opacity-0', 'pointer-events-none');
        }

        function openAddressModal() {
            addressBackdrop?.classList.remove('opacity-0', 'pointer-events-none');
            addressBackdrop?.setAttribute('aria-hidden', 'false');
            addressModal?.classList.remove('scale-95', 'opacity-0');
            document.documentElement.classList.add('auth-modal-open');
            document.getElementById('close-address-modal-btn')?.focus();
        }

        function closeAddressModal() {
            addressBackdrop?.classList.add('opacity-0', 'pointer-events-none');
            addressBackdrop?.setAttribute('aria-hidden', 'true');
            addressModal?.classList.add('scale-95', 'opacity-0');
            document.documentElement.classList.remove('auth-modal-open');
            document.getElementById('location-selector-btn')?.focus();
        }

        window.openAddressModal = openAddressModal;
        window.closeAddressModal = closeAddressModal;

        document.getElementById('all-categories-btn')?.addEventListener('click', openDrawer);
        document.getElementById('mobile-menu-btn')?.addEventListener('click', openDrawer);
        document.getElementById('close-drawer-btn')?.addEventListener('click', closeDrawer);
        drawerBackdrop?.addEventListener('click', closeDrawer);

        document.getElementById('location-selector-btn')?.addEventListener('click', openAddressModal);
        document.getElementById('close-address-modal-btn')?.addEventListener('click', closeAddressModal);
        addressBackdrop?.addEventListener('click', (event) => {
            if (event.target === addressBackdrop) closeAddressModal();
        });

        document.querySelectorAll('[data-auth-open]').forEach((button) => {
            button.addEventListener('click', () => window.QuickllyAuth?.open('login'));
        });

        document.querySelectorAll('[data-quick-add]').forEach((button) => {
            button.addEventListener('click', () => {
                const added = button.dataset.added === 'true';
                button.dataset.added = String(!added);
                button.classList.toggle('bg-brand-green', !added);
                button.classList.toggle('text-white', !added);
                button.setAttribute('aria-pressed', String(!added));
                const icon = button.querySelector('iconify-icon');
                if (icon) icon.setAttribute('icon', added ? 'solar:add-circle-linear' : 'solar:check-circle-bold');
                if (!icon) button.textContent = added ? 'Select plan' : 'Selected';
            });
        });

        document.querySelectorAll('[data-filter-chip]').forEach((button) => {
            button.addEventListener('click', () => {
                document.querySelectorAll('[data-filter-chip]').forEach((chip) => {
                    const selected = chip === button;
                    chip.setAttribute('aria-pressed', String(selected));
                    chip.classList.toggle('bg-neutral-950', selected);
                    chip.classList.toggle('text-white', selected);
                    chip.classList.toggle('border-neutral-950', selected);
                });
            });
        });

        document.querySelectorAll('[data-filter-section]').forEach((button) => {
            button.addEventListener('click', () => {
                const expanded = button.getAttribute('aria-expanded') === 'true';
                button.setAttribute('aria-expanded', String(!expanded));
                button.querySelector('iconify-icon')?.setAttribute('icon', expanded ? 'solar:add-linear' : 'solar:minus-linear');
            });
        });

        document.querySelector('[data-load-more]')?.addEventListener('click', (event) => {
            event.currentTarget.textContent = 'All available products are shown';
            event.currentTarget.disabled = true;
            event.currentTarget.classList.add('opacity-60', 'cursor-default');
        });

        const faqSearch = document.getElementById('faq-search');
        faqSearch?.addEventListener('input', () => {
            const query = faqSearch.value.trim().toLowerCase();
            let visible = 0;
            document.querySelectorAll('[data-faq-item]').forEach((item) => {
                const matches = item.textContent.toLowerCase().includes(query);
                item.classList.toggle('hidden', !matches);
                if (matches) visible += 1;
            });
            document.getElementById('faq-empty')?.classList.toggle('hidden', visible !== 0);
        });

        document.querySelector('[data-copy-referral]')?.addEventListener('click', async (event) => {
            const referral = 'https://quicklly.com/refer/GOODFOOD10';
            const status = document.querySelector('[data-copy-status]');
            try {
                await navigator.clipboard.writeText(referral);
                event.currentTarget.textContent = 'Referral link copied';
                if (status) status.textContent = 'Share it with a friend. They’ll get $10 off their first qualifying order.';
            } catch (_) {
                if (status) status.textContent = referral;
            }
        });

        const contactForm = document.getElementById('contact-form');
        contactForm?.addEventListener('submit', (event) => {
            event.preventDefault();
            const error = document.getElementById('contact-error');
            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const message = document.getElementById('contact-message').value.trim();
            const valid = name.length > 1 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && message.length > 9;
            error.textContent = valid
                ? 'Prototype only — connect this form to your support service before launch.'
                : 'Enter your name, a valid email, and a short message.';
            error.classList.remove('hidden');
            error.classList.toggle('text-red-700', !valid);
            error.classList.toggle('text-brand-dark', valid);
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeDrawer();
                if (addressBackdrop?.getAttribute('aria-hidden') === 'false') closeAddressModal();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeStandalonePage);
    } else {
        initializeStandalonePage();
    }
})();
