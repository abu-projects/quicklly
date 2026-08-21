# Quicklly — Missing Screens Inventory

> **حالة التنفيذ — 21 أغسطس 2026:** تم تنفيذ البنود M-01 إلى M-20 داخل المشروع. شاشة M-14 نُفذت كـoverlay مشترك في `commerce-pages.js` بدل ملف HTML مستقل. كما نُفذت U-01 إلى U-04 كمكونات مشتركة، ونُفذت U-05 داخل `system-states.html` والحالات السياقية في صفحات الـcommerce. يمكن إعادة توليد الملفات عبر `node build-commerce-pages.mjs`.

> آخر مراجعة: 15 أغسطس 2026  
> المقارنة: ملفات المشروع الحالية مقابل المسارات والتدفقات الظاهرة على `https://www.quicklly.com/` (Production).  
> ملاحظة: المستند القديم `# Quicklly Website Redesign.md` لم يعد يعكس الحالة الحالية؛ كثير من الشاشات التي كانت معلّمة كناقصة أصبحت منفذة بالفعل.

## ملخص الحالة الحالية

- الموجود حاليًا في المشروع: **39 ملف HTML**.
- صفحات الحساب الأساسية موجودة: الحساب، الطلبات، الطلبات القادمة، المفضلة، تغيير كلمة المرور، العناوين، بطاقات الهدايا، المكافآت، Quicklly Pass، وطلبات Shubhpuja.
- صفحات المتجر والتسويق الأساسية موجودة: Home، Category، Search Results، Shop by Stores، Deals، Meal Kits، Indian Sweets، Roti Kit، Organic، Gifting، Aha، Catering، Astrology، Events، Chai، Only Luxury، والصفحات التعريفية والقانونية.
- Login وSignup وOTP موجودة كـmodals داخل `auth-modal.js`.
- Cart Drawer وAddress Picker موجودان كمكونات مشتركة.

## الشاشات الناقصة ذات الأولوية العالية

### M-01 — Product Details

- **مسار Production النموذجي:** `/grocery-store/{product-slug}/{product-id}`
- **الملف المقترح:** `product-details.html`
- **المحتوى المطلوب:**
  - Breadcrumb: Home / Store / Category.
  - صورة المنتج أو معرض صور.
  - اسم المنتج، الحجم، السعر، السعر السابق والخصم عند وجودهما.
  - اختيار الكمية وحالة المخزون.
  - زر Add to Cart / تحديث الكمية.
  - اسم المتجر وبيانات التوصيل والحد الأدنى للطلب.
  - شارات Quality Assurance وHassle-Free Delivery وSatisfaction Guarantee.
  - Product Specifications.
  - Product Details.
  - Shipping & Delivery.
  - Product Description.
  - FAQ accordion.
  - منتجات مشابهة أو Frequently Bought Together.
  - حالات: out of stock، loading، product unavailable، وفشل الإضافة للسلة.

### M-02 — Checkout / Cart Review

- **مسار Production:** `/checkout`
- **الملف المقترح:** `checkout.html`
- **المحتوى المطلوب:**
  - عنوان Your Shopping Carts.
  - اختيار Delivery أو Curbside Pickup.
  - تقسيم المنتجات حسب المتجر.
  - عدد المنتجات، السعر، الكمية، وإزالة المنتج.
  - اختيار بديل للمنتج: Choose Replacement / Replace with Best Match.
  - Billing/Delivery Address مع Change Address.
  - مواعيد التوصيل لكل متجر ونوع طلب.
  - Delivery Notes.
  - Quicklly Pass savings upsell.
  - eVoucher، Reward Points، وMy Wallet.
  - إدخال وتطبيق coupon/voucher.
  - Order Summary: subtotals، taxes، shipping، minimum charges، tip، والإجمالي.
  - اختيار Tip: No Tip / 5% / 10% / 15% / 20%.
  - زر Pay by Card / Continue to Payment.
  - حالات: cart empty، minimum-order warning، item unavailable، address conflict، price change، وفشل تطبيق الكوبون.

### M-03 — Checkout Contact & Payment

- **النوع:** خطوة/حالة داخل رحلة Checkout ويمكن تنفيذها داخل `checkout.html` أو كصفحة مستقلة.
- **الملف المقترح إذا كانت مستقلة:** `checkout-payment.html`
- **المحتوى المطلوب:**
  - بيانات التواصل المؤكدة: email وphone.
  - عنوان الفاتورة والتوصيل.
  - اختيار وسيلة الدفع.
  - Cardholder name، card number، expiry، وCVV أو تكامل بوابة الدفع.
  - مراجعة نهائية للطلب.
  - الموافقة على الشروط وسياسات الاستبدال/الإلغاء.
  - زر Place Order / Confirm & Pay.
  - حالات: processing، card declined، payment timeout، و3DS/OTP إن كانت البوابة تحتاجه.

### M-04 — Order Success

- **المسار المقترح:** `/order-success`
- **الملف المقترح:** `order-success.html`
- **المحتوى المطلوب:**
  - رسالة تأكيد واضحة.
  - رقم الطلب.
  - المتاجر والمنتجات والإجمالي.
  - عنوان ومواعيد التوصيل.
  - وسيلة الدفع.
  - رابط View Order / Track Order.
  - Download Invoice عند توفره.
  - Continue Shopping.

### M-05 — Order / Payment Failure

- **المسار المقترح:** `/order-failed`
- **الملف المقترح:** `order-failed.html`
- **المحتوى المطلوب:**
  - سبب الفشل بصياغة مفهومة.
  - توضيح هل تم خصم المبلغ أم لا.
  - Retry Payment.
  - اختيار وسيلة دفع أخرى.
  - الرجوع إلى السلة بدون فقد المنتجات.
  - رابط التواصل مع الدعم ورقم مرجعي للمشكلة.

### M-06 — Forgot Password

- **مسار Production:** `/forgot-password`
- **الملف المقترح:** `forgot-password.html`
- **المحتوى المطلوب:**
  - Email أو mobile number.
  - Send Reset Code.
  - OTP verification.
  - New password وConfirm password.
  - قواعد كلمة المرور.
  - Success state والعودة إلى Login.
  - حالات: حساب غير موجود، كود خاطئ، كود منتهي، وإعادة إرسال الكود.

### M-07 — Full Order Details

- **المسار المقترح:** `/my-orders/{order-id}`
- **الملف المقترح:** `order-details.html`
- **سبب اعتباره ناقصًا:** `my-orders.html` يعرض حاليًا سطرًا مختصرًا قابلًا للفتح، لكنه لا يقدم تفاصيل طلب كاملة.
- **المحتوى المطلوب:**
  - رقم الطلب، التاريخ، والحالة.
  - تقسيم fulfillment حسب المتجر.
  - المنتجات، الكميات، substitutions، والأسعار.
  - عنوان التوصيل، الموعد، والملاحظات.
  - ملخص الدفع والرسوم والخصومات.
  - Contact Support.
  - Track Order، Reorder، Report an Issue، وDownload Invoice.

### M-08 — Order Tracking

- **المسار المقترح:** `/track-order/{order-id}`
- **الملف المقترح:** `order-tracking.html`
- **المحتوى المطلوب:**
  - Status timeline: confirmed، preparing، picked up/shipped، out for delivery، delivered.
  - حالة كل متجر عند وجود أكثر من fulfillment.
  - ETA أو delivery window.
  - بيانات شركة الشحن أو السائق عند توفرها.
  - Tracking number/link للشحن الوطني.
  - Delivery instructions.
  - Contact Support وReport an Issue.

### M-09 — Invoice

- **المسار المقترح:** `/my-orders/{order-id}/invoice`
- **الملف المقترح:** `invoice.html`
- **المحتوى المطلوب:**
  - بيانات Quicklly والعميل.
  - رقم الفاتورة والطلب والتاريخ.
  - بنود الطلب والكميات والأسعار.
  - الضرائب، الرسوم، الشحن، الخصومات، tip، والإجمالي.
  - وسيلة الدفع وحالة الدفع.
  - Print / Download PDF.

### M-10 — Returns, Issues & Reorder

- **المسار المقترح:** `/my-orders/{order-id}/help`
- **الملف المقترح:** `order-help.html`
- **المحتوى المطلوب:**
  - اختيار المنتجات المتأثرة.
  - نوع المشكلة: missing، damaged، wrong item، quality، late delivery.
  - وصف المشكلة وإرفاق صورة عند الحاجة.
  - Refund / Replacement preference.
  - ملخص الطلب قبل الإرسال.
  - حالة الطلب المرسل للدعم.
  - Reorder all / Reorder selected items.

## شاشات الاستكشاف والعودة للشراء

### M-11 — Past Products / Buy It Again

- **مسار Production:** `/past-products`
- **الملف المقترح:** `past-products.html`
- **المحتوى المطلوب:**
  - عنوان Past Products / Buy it again.
  - شبكة المنتجات التي اشتراها المستخدم سابقًا.
  - اسم المنتج، الحجم، السعر، والمتجر.
  - Add to Cart / quantity stepper.
  - حالة المنتج غير المتاح أو تغيّر السعر.
  - Filters أو grouping حسب المتجر/الفئة عند زيادة القائمة.

### M-12 — Keep Shopping

- **مسار Production:** `/keep-shopping`
- **الملف المقترح:** `keep-shopping.html`
- **المحتوى المطلوب:**
  - منتجات مستنتجة من التصفح والشراء السابق.
  - Product cards مع السعر والمتجر والإضافة السريعة.
  - View product details.
  - Empty state للمستخدم الجديد.

### M-13 — Pick Up Where You Left Off

- **مسار Production:** `/pick-up-where-you-left`
- **الملف المقترح:** `pick-up-where-you-left.html`
- **المحتوى المطلوب:**
  - المنتجات التي شاهدها المستخدم مؤخرًا.
  - آخر category/store تم تصفحه.
  - Add to Cart وWishlist.
  - Clear history أو empty state إذا كان ذلك ضمن المنتج.

### M-14 — Search Suggestions Overlay

- **النوع:** Overlay مرتبط بحقل البحث الموجود في الـHeader.
- **المحتوى المطلوب:**
  - Recent searches.
  - Suggested queries أثناء الكتابة.
  - نتائج سريعة للمنتجات والمتاجر والفئات.
  - Keyboard navigation.
  - حالات no results، loading، وerror.

## شاشات المحتوى والخدمات الناقصة

### M-15 — Blog Details

- **مسار Production النموذجي:** `/blog/{id}/{slug}`
- **الملف المقترح:** `blog-details.html`
- **سبب اعتباره ناقصًا:** `blog.html` ينفذ Listing فقط.
- **المحتوى المطلوب:**
  - عنوان المقال، الصورة الرئيسية، التاريخ، والتصنيف.
  - محتوى المقال بعناوين فرعية وصور وروابط.
  - Author / source information عند توفرها.
  - مشاركة المقال.
  - Related Blogs.
  - منتجات أو فئات مرتبطة بالمقال.
  - العودة إلى Blog Listing.

### M-16 — Event Dashboard / My Tickets

- **مسار Production:** `/event-dashboard`
- **الملف المقترح:** `event-dashboard.html`
- **المحتوى المطلوب:**
  - Welcome block.
  - Recent Bookings.
  - Upcoming وPast tickets.
  - اسم الحدث، التاريخ، المكان، وعدد التذاكر.
  - View Ticket / QR Code.
  - Booking details وحالة الدفع.
  - Empty state عند عدم وجود حجوزات.

### M-17 — Ready-to-Eat / Meal Subscription Listing

- **مسار Production:** `/ready-to-eat-indian-food`
- **الملف المقترح:** `ready-to-eat.html`
- **المحتوى المطلوب:**
  - Hero وتعريف بخدمة الاشتراك أو المنتجات الجاهزة.
  - Product/category filters.
  - شبكة وجبات ومنتجات مع Details وAdd to Cart.
  - One-time مقابل subscription frequency.
  - Dietary tags ومعلومات التحضير.
  - Subscription benefits وFAQ.

### M-18 — Indian Food Delivery / Restaurant Discovery

- **مسار Production:** `/indian-food-delivery`
- **الملف المقترح:** `food-delivery.html`
- **المحتوى المطلوب:**
  - اختيار الموقع.
  - المطاعم المتاحة وحالة open/closed.
  - Cuisine، dietary، rating، ETA، وdelivery fee filters.
  - Restaurant cards.
  - Empty state عندما لا تتوفر مطاعم في المنطقة.
  - محتوى تعريفي/SEO موجود في Production عن Indian Food.

### M-19 — Direct From India

- **مسار Production:** `/direct-from-india`
- **الملف المقترح:** `direct-from-india.html`
- **المحتوى المطلوب:**
  - Landing hero وتعريف بالشحن المباشر من الهند.
  - Featured brands وShark Tank India brands.
  - أقسام Outfits، Beauty & Personal Care، Recipe Kits وغيرها.
  - Store cards وView all products.
  - مدة وتكلفة الشحن والجمارك/الاسترجاع.
  - Store unavailable state حسب الموقع.

### M-20 — Generic Store / Brand Landing Template

- **مسارات Production النموذجية:** `/baklava-sweets-near-me`، `/indian-sweets-online`، `/chai-near-me`، ومسارات المتاجر المتخصصة المشابهة.
- **الملف المقترح:** `store-details.html`
- **المحتوى المطلوب:**
  - اسم المتجر، الصورة، الوصف، التقييم، ونطاق التوصيل.
  - الحد الأدنى للطلب ورسوم/موعد التوصيل.
  - Categories/tabs داخل المتجر.
  - Search within store.
  - Product listing مع filters وsorting.
  - Store unavailable / outside delivery area.
  - معلومات وسياسات المتجر.

## الـModals والـSystem States الناقصة

هذه ليست صفحات HTML مستقلة بالضرورة، لكنها لازمة لاكتمال تجربة Production:

### U-01 — Ask Quicklly Support

- Launcher ثابت أو رابط من القائمة.
- اختيار موضوع المساعدة.
- Chat/message form أو تحويل إلى قنوات الدعم.
- حالة offline/error وساعات العمل.

### U-02 — Share Cart Popup

- ملخص العناصر التي ستتم مشاركتها.
- Generate/Copy share link.
- Share عبر الرسائل أو البريد.
- حالة انتهاء صلاحية الرابط أو عدم توفر بعض المنتجات.

### U-03 — Product Replacement Modal

- المنتج غير المتاح.
- البدائل المقترحة مع فرق السعر والحجم.
- Replace with Best Match / Choose Manually / No Replacement.
- تطبيق الاختيار على منتج واحد أو جميع المنتجات المشابهة.

### U-04 — Delivery Slot Modal

- الأيام والمواعيد المتاحة لكل متجر.
- Change Slot وRemove Slot.
- توضيح الرسوم أو التأثير على الطلب.
- حالة عدم وجود مواعيد متاحة.

### U-05 — Standard Loading / Empty / Error States

- Search no results.
- Store/category empty.
- Network/API error مع Retry.
- Skeleton loading للقوائم والمنتج والحساب.
- 404 و500.
- Session expired.
- Service unavailable for selected address.

## الموجود ولا يجب عده ضمن الناقص

- Home — `index.html`.
- Category Listing — `category.html`.
- Search Results — `search-results.html`.
- Shop by Stores — `shop-by-stores.html`.
- Deals — `deals.html`.
- Login / Signup / OTP — داخل `auth-modal.js`.
- Address Picker وSaved Addresses — موجودان في الـshared shell و`my-account.html`.
- Cart Drawer — موجود كمكوّن مشترك.
- My Account / Update Profile — `my-account.html`.
- My Orders Listing — `my-orders.html`.
- Upcoming Orders — `my-upcoming-orders.html`.
- Wishlist + Empty State — `my-wishlist.html`.
- Change Password — `change-password.html`.
- Gift Cards — `gift-cards.html`.
- Circle Rewards — `circle-rewards.html`.
- Quicklly Pass Landing + Dashboard — `quicklly-pass.html` و`quicklly-pass-dashboard.html`.
- Refer a Friend، Brand Ambassador، Student Ambassador، Be a Hero.
- About، Contact، FAQ، Careers، Blog Listing، Press، Reviews، Privacy، Terms.

## صفحات خارج النطاق الحالي وتحتاج قرارًا

- **Seller Portal** الموجود على `seller.quicklly.com`: نظام منفصل للبائعين وليس مجرد صفحة داخل متجر العميل.
- **Events by Quicklly** الموجود على `eventsbyquicklly.com`: موقع خارجي، بينما المطلوب داخل هذا المشروع غالبًا هو صفحة Events التسويقية وMy Tickets فقط.
- صفحات SEO المتعددة التي تستخدم نفس بنية category/store لا تحتاج ملف HTML مستقل لكل رابط؛ الأفضل تنفيذها بقالب قابل لإعادة الاستخدام.

## ترتيب التنفيذ المقترح

1. Product Details.
2. Checkout + Contact/Payment.
3. Order Success + Failure.
4. Full Order Details + Tracking + Invoice + Order Help.
5. Forgot Password.
6. Past Products + Keep Shopping + Pick Up Where You Left Off.
7. Store Details template + Ready-to-Eat + Food Delivery.
8. Blog Details + My Tickets + Direct From India.
9. Search Suggestions، Share Cart، Replacement، Delivery Slot، والحالات النظامية.

## العدد المقترح المتبقي

- **20 شاشة/قالب رئيسي ناقص**.
- **5 مجموعات overlays/system states ناقصة**.
- يمكن تقليل عدد الملفات الفعلية بإعادة استخدام القوالب؛ خصوصًا Product، Store، Category، وOrder.
