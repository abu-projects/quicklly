(function () {
    'use strict';

    const modalMarkup = `
        <div id="auth-modal-backdrop" class="auth-modal-layer fixed inset-0 bg-black/60 opacity-0 pointer-events-none flex items-center justify-center p-4" aria-hidden="true">
            <section id="auth-modal" class="w-full max-w-[580px] max-h-[92dvh] overflow-y-auto bg-white rounded-3xl shadow-2xl opacity-0 translate-y-4 transition-[transform,opacity] duration-200 outline-none" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title" tabindex="-1">
                <div class="relative px-6 py-7 sm:px-12 sm:py-10">
                    <button id="auth-modal-close" type="button" class="absolute right-5 top-5 size-10 rounded-full grid place-items-center text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green" aria-label="Close login">
                        <span aria-hidden="true" class="text-2xl leading-none">×</span>
                    </button>

                    <div id="auth-login-view">
                        <div class="text-center mb-8 pr-8 pl-8">
                            <span class="inline-flex items-center gap-2 text-xs font-semibold text-brand-dark mb-3"><span class="size-2 rounded-full bg-brand-green"></span>Welcome back</span>
                            <h2 id="auth-modal-title" class="text-3xl font-semibold text-neutral-950 text-balance">Log in to Quicklly</h2>
                            <p class="mt-3 text-sm text-neutral-600 text-pretty">Don’t have an account? <button type="button" data-auth-view="signup" class="font-semibold text-brand-dark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded">Create one</button></p>
                        </div>

                        <div class="grid grid-cols-2 gap-2 p-1 bg-neutral-100 rounded-xl mb-5" role="tablist" aria-label="Login method">
                            <button type="button" id="auth-phone-tab" class="auth-method-tab bg-white text-neutral-950 shadow-sm rounded-lg py-2.5 text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green" role="tab" aria-selected="true">Phone</button>
                            <button type="button" id="auth-email-tab" class="auth-method-tab text-neutral-600 rounded-lg py-2.5 text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green" role="tab" aria-selected="false">Email</button>
                        </div>

                        <form id="auth-login-form" novalidate>
                            <div id="auth-phone-field">
                                <label for="auth-phone" class="block text-sm font-medium text-neutral-800 mb-2">Mobile number</label>
                                <div class="flex rounded-xl border border-neutral-300 focus-within:border-brand-green focus-within:ring-2 focus-within:ring-brand-green/20 overflow-hidden bg-white">
                                    <label class="sr-only" for="auth-country-code">Country code</label>
                                    <select id="auth-country-code" class="bg-neutral-50 border-r border-neutral-200 px-3 text-sm text-neutral-800 outline-none">
                                        <option value="+1">+1</option>
                                        <option value="+91">+91</option>
                                        <option value="+20">+20</option>
                                        <option value="+1-ca">+1 CA</option>
                                    </select>
                                    <input id="auth-phone" type="tel" inputmode="tel" autocomplete="tel" class="min-w-0 flex-1 px-4 py-3.5 text-sm outline-none" placeholder="Enter mobile number" aria-describedby="auth-error">
                                </div>
                            </div>

                            <div id="auth-email-field" class="hidden">
                                <label for="auth-email" class="block text-sm font-medium text-neutral-800 mb-2">Email address</label>
                                <input id="auth-email" type="email" autocomplete="email" class="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-sm" placeholder="you@example.com" aria-describedby="auth-error">
                            </div>

                            <p id="auth-error" class="hidden mt-2 text-sm text-red-700" role="alert"></p>
                            <button type="submit" class="w-full mt-5 bg-brand-green hover:bg-brand-dark active:scale-[0.98] text-white rounded-full py-3.5 text-sm font-semibold transition-[transform,background-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2">Continue</button>
                        </form>

                        <div class="flex items-center gap-4 my-6" aria-hidden="true"><span class="h-px bg-neutral-200 flex-1"></span><span class="text-xs text-neutral-500">or continue with</span><span class="h-px bg-neutral-200 flex-1"></span></div>

                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <button type="button" class="auth-social flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 rounded-xl py-3 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green" data-provider="Google"><iconify-icon icon="logos:google-icon" width="18"></iconify-icon>Google</button>
                            <button type="button" class="auth-social flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 rounded-xl py-3 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green" data-provider="Facebook"><iconify-icon icon="logos:facebook" width="18"></iconify-icon>Facebook</button>
                            <button type="button" class="auth-social flex items-center justify-center gap-2 bg-neutral-100 hover:bg-neutral-200 rounded-xl py-3 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green" data-provider="Email"><iconify-icon icon="solar:letter-bold" width="19"></iconify-icon>Email</button>
                        </div>
                    </div>

                    <div id="auth-signup-view" class="hidden">
                        <div class="text-center mb-8 pr-8 pl-8">
                            <span class="inline-flex items-center gap-2 text-xs font-semibold text-brand-dark mb-3"><span class="size-2 rounded-full bg-brand-green"></span>$0 delivery fee on eligible orders</span>
                            <h2 id="auth-signup-title" class="text-3xl font-semibold text-neutral-950 text-balance">Create your account</h2>
                            <p class="mt-3 text-sm text-neutral-600">Already have an account? <button type="button" data-auth-view="login" class="font-semibold text-brand-dark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded">Log in</button></p>
                        </div>
                        <form id="auth-signup-form" class="space-y-4" novalidate>
                            <div><label for="signup-name" class="block text-sm font-medium text-neutral-800 mb-2">Full name</label><input id="signup-name" autocomplete="name" class="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-sm" placeholder="Your name"></div>
                            <div><label for="signup-email" class="block text-sm font-medium text-neutral-800 mb-2">Email address</label><input id="signup-email" type="email" autocomplete="email" class="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-sm" placeholder="you@example.com"></div>
                            <div><label for="signup-phone" class="block text-sm font-medium text-neutral-800 mb-2">Mobile number</label><input id="signup-phone" type="tel" inputmode="tel" autocomplete="tel" class="w-full px-4 py-3.5 rounded-xl border border-neutral-300 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none text-sm" placeholder="(312) 555-0148"></div>
                            <p id="signup-error" class="hidden text-sm text-red-700" role="alert"></p>
                            <p class="text-xs leading-5 text-neutral-500">By continuing, you agree to our <a href="terms.html" class="text-neutral-900 underline">Terms</a> and <a href="privacy.html" class="text-neutral-900 underline">Privacy Policy</a>.</p>
                            <button type="submit" class="w-full bg-brand-green hover:bg-brand-dark active:scale-[0.98] text-white rounded-full py-3.5 text-sm font-semibold transition-[transform,background-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2">Create account</button>
                        </form>
                    </div>

                    <div id="auth-otp-view" class="hidden text-center">
                        <div class="size-14 rounded-full bg-brand-light text-brand-dark grid place-items-center mx-auto mb-5"><iconify-icon icon="solar:chat-round-dots-bold" width="26"></iconify-icon></div>
                        <h2 id="auth-otp-title" class="text-3xl font-semibold text-neutral-950 text-balance">Verify your number</h2>
                        <p id="auth-otp-copy" class="mt-3 text-sm text-neutral-600 text-pretty">Enter the 5-digit code sent to your phone.</p>
                        <form id="auth-otp-form" class="mt-7" novalidate>
                            <label for="auth-otp" class="sr-only">Verification code</label>
                            <input id="auth-otp" inputmode="numeric" autocomplete="one-time-code" maxlength="5" class="w-full text-center text-2xl font-semibold tabular-nums px-4 py-4 rounded-xl border border-neutral-300 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none" placeholder="00000" aria-describedby="otp-error">
                            <p id="otp-error" class="hidden mt-2 text-sm text-red-700" role="alert"></p>
                            <button type="submit" class="w-full mt-5 bg-brand-green hover:bg-brand-dark active:scale-[0.98] text-white rounded-full py-3.5 text-sm font-semibold transition-[transform,background-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2">Verify</button>
                        </form>
                        <button type="button" data-auth-view="login" class="mt-5 text-sm font-semibold text-brand-dark hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green rounded">Use a different number</button>
                    </div>
                </div>
            </section>
        </div>`;

    let lastFocusedElement = null;
    let currentMethod = 'phone';

    function ensureModal() {
        if (document.getElementById('auth-modal-backdrop')) return;
        const styles = document.createElement('style');
        styles.textContent = '.auth-modal-layer{z-index:120}.auth-modal-open{overflow:hidden}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}';
        document.head.appendChild(styles);
        document.body.insertAdjacentHTML('beforeend', modalMarkup);
        bindModalEvents();
    }

    function getFocusable() {
        return Array.from(document.querySelectorAll('#auth-modal button:not([disabled]), #auth-modal input:not([disabled]), #auth-modal select:not([disabled]), #auth-modal a[href]')).filter((element) => element.offsetParent !== null);
    }

    function openAuthModal(view = 'login') {
        ensureModal();
        lastFocusedElement = document.activeElement;
        document.getElementById('side-drawer')?.classList.add('-translate-x-full');
        document.getElementById('side-drawer-backdrop')?.classList.add('opacity-0', 'pointer-events-none');
        showView(view);
        const backdrop = document.getElementById('auth-modal-backdrop');
        const modal = document.getElementById('auth-modal');
        backdrop.classList.remove('opacity-0', 'pointer-events-none');
        backdrop.setAttribute('aria-hidden', 'false');
        document.documentElement.classList.add('auth-modal-open');
        requestAnimationFrame(() => {
            modal.classList.remove('opacity-0', 'translate-y-4');
            document.getElementById('auth-modal-close').focus();
        });
    }

    function closeAuthModal() {
        const backdrop = document.getElementById('auth-modal-backdrop');
        const modal = document.getElementById('auth-modal');
        if (!backdrop || backdrop.getAttribute('aria-hidden') === 'true') return;
        modal.classList.add('opacity-0', 'translate-y-4');
        backdrop.classList.add('opacity-0', 'pointer-events-none');
        backdrop.setAttribute('aria-hidden', 'true');
        document.documentElement.classList.remove('auth-modal-open');
        if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') lastFocusedElement.focus();
    }

    function showView(view) {
        ['login', 'signup', 'otp'].forEach((name) => {
            const panel = document.getElementById(`auth-${name}-view`);
            if (panel) panel.classList.toggle('hidden', name !== view);
        });
        const labelIds = { login: 'auth-modal-title', signup: 'auth-signup-title', otp: 'auth-otp-title' };
        document.getElementById('auth-modal')?.setAttribute('aria-labelledby', labelIds[view] || labelIds.login);
    }

    function setMethod(method) {
        currentMethod = method;
        const phone = document.getElementById('auth-phone-field');
        const email = document.getElementById('auth-email-field');
        const phoneTab = document.getElementById('auth-phone-tab');
        const emailTab = document.getElementById('auth-email-tab');
        phone.classList.toggle('hidden', method !== 'phone');
        email.classList.toggle('hidden', method !== 'email');
        [phoneTab, emailTab].forEach((tab) => tab.classList.remove('bg-white', 'text-neutral-950', 'shadow-sm'));
        const active = method === 'phone' ? phoneTab : emailTab;
        active.classList.add('bg-white', 'text-neutral-950', 'shadow-sm');
        phoneTab.setAttribute('aria-selected', String(method === 'phone'));
        emailTab.setAttribute('aria-selected', String(method === 'email'));
    }

    function showError(id, message) {
        const error = document.getElementById(id);
        error.textContent = message;
        error.classList.toggle('hidden', !message);
    }

    function bindModalEvents() {
        const backdrop = document.getElementById('auth-modal-backdrop');
        document.getElementById('auth-modal-close').addEventListener('click', closeAuthModal);
        document.getElementById('auth-phone-tab').addEventListener('click', () => setMethod('phone'));
        document.getElementById('auth-email-tab').addEventListener('click', () => setMethod('email'));
        backdrop.addEventListener('click', (event) => { if (event.target === backdrop) closeAuthModal(); });

        document.querySelectorAll('[data-auth-view]').forEach((button) => button.addEventListener('click', () => showView(button.dataset.authView)));
        document.querySelectorAll('.auth-social').forEach((button) => button.addEventListener('click', () => {
            if (button.dataset.provider === 'Email') setMethod('email');
            document.getElementById('auth-email')?.focus();
        }));

        document.getElementById('auth-login-form').addEventListener('submit', (event) => {
            event.preventDefault();
            const value = currentMethod === 'phone' ? document.getElementById('auth-phone').value.trim() : document.getElementById('auth-email').value.trim();
            const valid = currentMethod === 'phone' ? /^\d[\d\s()-]{6,}$/.test(value) : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            if (!valid) {
                showError('auth-error', currentMethod === 'phone' ? 'Enter a valid mobile number.' : 'Enter a valid email address.');
                return;
            }
            showError('auth-error', '');
            document.getElementById('auth-otp-copy').textContent = `Enter the 5-digit code sent to ${value}.`;
            showView('otp');
            document.getElementById('auth-otp').focus();
        });

        document.getElementById('auth-signup-form').addEventListener('submit', (event) => {
            event.preventDefault();
            const name = document.getElementById('signup-name').value.trim();
            const email = document.getElementById('signup-email').value.trim();
            const phone = document.getElementById('signup-phone').value.trim();
            if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^\d[\d\s()-]{6,}$/.test(phone)) {
                showError('signup-error', 'Complete your name, email, and mobile number.');
                return;
            }
            showError('signup-error', '');
            document.getElementById('auth-otp-copy').textContent = `Enter the 5-digit code sent to ${phone}.`;
            showView('otp');
            document.getElementById('auth-otp').focus();
        });

        document.getElementById('auth-otp-form').addEventListener('submit', (event) => {
            event.preventDefault();
            const code = document.getElementById('auth-otp').value.trim();
            if (!/^\d{5}$/.test(code)) {
                showError('otp-error', 'Enter the complete 5-digit code.');
                return;
            }
            showError('otp-error', 'Prototype only — connect your authentication service to verify this code.');
        });

        document.addEventListener('keydown', (event) => {
            if (backdrop.getAttribute('aria-hidden') === 'true') return;
            if (event.key === 'Escape') closeAuthModal();
            if (event.key === 'Tab') {
                const focusable = getFocusable();
                if (!focusable.length) return;
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
                else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
            }
        });
    }

    function bindLoginTriggers() {
        ensureModal();
        document.querySelectorAll('button, a').forEach((element) => {
            const label = element.textContent.trim().replace(/\s+/g, ' ').toLowerCase();
            if (label === 'sign in' || label === 'login' || label === 'log in' || label === 'your account') {
                element.addEventListener('click', (event) => {
                    if (element.closest('#auth-modal')) return;
                    event.preventDefault();
                    openAuthModal('login');
                });
            }
        });
    }

    window.QuickllyAuth = { open: openAuthModal, close: closeAuthModal, bindTriggers: bindLoginTriggers };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bindLoginTriggers);
    else bindLoginTriggers();
})();
