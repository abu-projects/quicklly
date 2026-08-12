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
        'Astrology': 'category.html',
        'Events': 'category.html',
        'Chai Tea & Coffee Kit': 'category.html',
        'Only Luxury': 'category.html',
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
        'Track Order': 'search-results.html',
        'Return Policy': 'faq.html',
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
        'Refer a Friend': 'refer-a-friend.html'
    };

    function connectPages() {
        const promo = document.querySelector('body > div.bg-neutral-900');
        promo?.querySelector('button[aria-label="Dismiss"]')?.addEventListener('click', () => promo.remove());

        const header = document.getElementById('main-header');
        const updateHeaderShadow = () => header?.classList.toggle('shadow-sm', window.scrollY > 10);
        updateHeaderShadow();
        window.addEventListener('scroll', updateHeaderShadow, { passive: true });

        document.querySelectorAll('a').forEach((anchor) => {
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
