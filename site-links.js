(function () {
    'use strict';

    const destinations = {
        'Grocery': 'category.html',
        'Meal Kits': 'meal-kits.html',
        'Meal Kit': 'meal-kits.html',
        'Indian Sweets': 'indian-sweets.html',
        'Indian Sweets & Snacks': 'indian-sweets.html',
        'Roti Kit': 'roti-kit.html',
        'Organic': 'organic.html',
        'Organic Grocery': 'organic.html',
        'Gifting': 'gifting.html',
        'Aha': 'aha.html',
        'aha': 'aha.html',
        'Catering': 'catering.html',
        'Astrology': 'astrology.html',
        'Events': 'events.html',
        'Chai Tea & Coffee Kit': 'chai-tea-coffee.html',
        'Only Luxury': 'only-luxury.html',
        'Quicklly Pass': 'quicklly-pass.html',
        'View all plans': 'quicklly-pass.html',
        'Grocery Stores': 'shop-by-stores.html',
        'About Us': 'about.html',
        'Careers': 'careers.html',
        'Press': 'press.html',
        'Blog': 'blog.html',
        'Contact Us': 'contact.html',
        'Grocery Delivery': 'category.html',
        'Nationwide Shipping': 'shop-by-stores.html',
        'Corporate Gifting': 'category.html',
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
        'My Wishlist': 'my-wishlist.html',
        'Circle Rewards': 'circle-rewards.html',
        'Gift Cards': 'gift-cards.html',
        'Change Password': 'change-password.html',
        'Buy It Again': 'past-products.html',
        'Past Products': 'past-products.html',
        'Keep Shopping': 'keep-shopping.html',
        'Direct From India': 'direct-from-india.html',
        'Ready-to-Eat': 'ready-to-eat.html',
        'Sign Out': 'index.html'
    };

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
            if (destinations[label]) anchor.href = destinations[label];
            if (anchor.querySelector('img[alt="Quicklly"]')) anchor.href = 'index.html';
        });

        document.querySelectorAll('button').forEach((button) => {
            const label = button.textContent.trim().replace(/\s+/g, ' ');
            if (label === 'View Offers' || label === 'Shop the Sale') button.addEventListener('click', () => { window.location.href = 'deals.html'; });
            if (label === 'Shop Groceries') button.addEventListener('click', () => { window.location.href = 'category.html'; });
            if (label === 'Explore Meal Kits') button.addEventListener('click', () => { window.location.href = 'meal-kits.html'; });
            if (label === 'Shop Sweets') button.addEventListener('click', () => { window.location.href = 'indian-sweets.html'; });
            if (label.includes('Join for') || label === 'Join Quicklly Pass') button.addEventListener('click', () => { window.location.href = 'quicklly-pass.html'; });
        });

        document.querySelectorAll('a[aria-label="Instagram"], a[aria-label="Facebook"], a[aria-label="Twitter"]').forEach((anchor) => {
            anchor.href = 'contact.html';
        });

        const search = document.querySelector('header input[placeholder*="Search groceries"]');
        const searchButton = search?.parentElement.querySelector('button');
        searchButton?.addEventListener('click', () => { window.location.href = 'search-results.html'; });
        search?.addEventListener('keydown', (event) => { if (event.key === 'Enter') window.location.href = 'search-results.html'; });

        document.querySelectorAll('button, a').forEach((control) => {
            control.classList.add('quicklly-control');
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', connectPages);
    else connectPages();
})();
