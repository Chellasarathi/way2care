/* WAY2CARE MAIN JAVASCRIPT */
'use strict';

const WAY2CARE_WHATSAPP_NUMBER = '919944351536';
const WAY2CARE_CART_KEY = 'way2care-cart-v1';

/* ---- Announcement Bar ---- */
function initAnnouncement() {
  const bar = document.querySelector('.announcement-bar');
  const closeBtn = bar && bar.querySelector('.announcement-bar__close');
  if (!bar || !closeBtn) return;
  closeBtn.addEventListener('click', () => {
    bar.style.maxHeight = bar.offsetHeight + 'px';
    bar.offsetHeight; // reflow
    bar.style.transition = 'max-height 0.4s ease, opacity 0.3s ease';
    bar.style.overflow = 'hidden';
    bar.style.maxHeight = '0';
    bar.style.opacity = '0';
    document.body.classList.add('announcement-hidden');
    const header = document.querySelector('.site-header');
    if (header) header.style.top = '0';
    setTimeout(() => bar.remove(), 400);
  });
}

/* ---- Sticky Header ---- */
function initHeader() {
  const header = document.querySelector('[data-header]');
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---- Mobile Menu ---- */
function initMobileMenu() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-mobile-menu]');
  const header = document.querySelector('[data-header]');
  if (!toggle || !menu) return;

  const setMenuState = (isOpen) => {
    menu.classList.toggle('is-open', isOpen);
    header && header.classList.toggle('is-menu-open', isOpen);
    document.body.classList.toggle('is-menu-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    menu.setAttribute('aria-hidden', String(!isOpen));
  };

  setMenuState(false);
  toggle.addEventListener('click', () => {
    setMenuState(!menu.classList.contains('is-open'));
  });
  // Close on link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setMenuState(false));
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      setMenuState(false);
      toggle.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 700 && menu.classList.contains('is-open')) setMenuState(false);
  }, { passive: true });
}

/* ---- Scroll Progress ---- */
function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress__bar');
  if (!bar) return;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', update, { passive: true });
}

/* ---- Reveal Animations ---- */
function initReveal() {
  const els = document.querySelectorAll('[data-reveal], [data-stagger]');
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  els.forEach(el => io.observe(el));
}

/* ---- Active Nav Link ---- */
function initActiveNav() {
  const links = document.querySelectorAll('.site-nav__link, .mobile-menu__link');
  const current = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === current || (current === 'index.html' && href === '#') || href === current.replace('.html', '')) {
      link.classList.add('is-active');
    }
  });
}

/* ---- Floating WhatsApp Button ---- */
function initFloatingWhatsApp() {
  if (document.querySelector('.floating-whatsapp')) return;

  const button = document.createElement('a');
  button.className = 'floating-whatsapp';
  button.href = `https://wa.me/${WAY2CARE_WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello Way2Care, I would like to know more about your products.')}`;
  button.target = '_blank';
  button.rel = 'noopener noreferrer';
  button.setAttribute('aria-label', 'Chat with Way2Care on WhatsApp');
  button.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12.04 2a9.84 9.84 0 0 0-8.51 14.77L2 22l5.39-1.42A9.98 9.98 0 1 0 12.04 2Zm0 17.96a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.2.84.86-3.12-.2-.32a8.06 8.06 0 1 1 6.97 3.91Zm4.43-6.04c-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2a7.2 7.2 0 0 1-1.34-1.67c-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.79-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.39 1.37.5.58.18 1.1.16 1.51.1.46-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z"/>
    </svg>`;
  document.body.appendChild(button);
}

/* ---- Reusable Product Detail Page ---- */
const WAY2CARE_COTTON_DESCRIPTION = 'Pure cotton sanitary napkins are designed to provide softness, comfort, and reliable protection throughout the menstrual cycle. Made with breathable cotton layers, they offer excellent absorbency while helping to keep the skin dry and comfortable. Their hypoallergenic and skin-friendly properties make them ideal for women with sensitive skin, reducing the risk of irritation and rashes. In addition to providing dependable leakage protection, cotton sanitary napkins are biodegradable and environmentally friendly, making them a sustainable choice for everyday menstrual care.';
const WAY2CARE_PREMIUM_DESCRIPTION = 'Premium Herbal Sanitary Napkins are enriched with natural ingredients such as Aloe Vera, Neem, and Vetiver (Vettiveru), known for their soothing, antibacterial, and refreshing properties. They provide comfort, hygiene, and freshness during menstruation while helping to reduce irritation, odor, and discomfort. Made with breathable cotton layers, these napkins offer excellent absorbency and help keep the skin dry and comfortable. By combining natural herbal extracts with reliable leak protection, they provide a gentle alternative to conventional sanitary pads, supporting confidence, comfort, and well-being during every cycle.';
const WAY2CARE_ULTRA_THIN_DESCRIPTION = 'Ultra-Thin Herbal Sanitary Napkins are enriched with natural ingredients such as Aloe Vera, Neem, and Vetiver (Vettiveru), known for their soothing, antibacterial, and refreshing properties. They provide comfort, hygiene, and freshness during menstruation while helping to reduce irritation, odor, and discomfort. Made with breathable cotton layers, these napkins offer excellent absorbency and help keep the skin dry and comfortable. By combining natural herbal extracts with reliable leak protection, they provide a gentle alternative to conventional sanitary pads, supporting confidence, comfort, and well-being during every cycle.';
const WAY2CARE_LINER_DESCRIPTION = 'Pure cotton panty liners are designed to provide softness, comfort, and support for spotting or light leaks throughout everyday routines. Made with breathable cotton layers, they offer absorbency while helping to keep the skin dry and comfortable. Their hypoallergenic and skin-friendly properties make them suitable for sensitive skin. Herbal panty liners are biodegradable and environmentally friendly, making them a thoughtful choice for everyday care. Designed to absorb normal vaginal discharge and light spotting, liners are ideal for pre- and post-period use, everyday freshness, active lifestyles and gym routines. Their breathable design provides all-day comfort while helping keep underwear clean, dry, and fresh.';
const WAY2CARE_PRODUCTS = {
  'xxl-herbal-pads': {
    name: 'XXL Premium Herbal Sanitary Pads', category: 'Period care', price: 280,
    description: `${WAY2CARE_PREMIUM_DESCRIPTION} Designed for regular to high menstrual flow, this XXL (320 mm) size provides high-to-heavy-flow coverage.`,
    hoverImage: 'assets/images/xxl-premium-product-detail-2.png',
    images: [
      'assets/images/product-sanitary-napkin-1.png',
      'assets/images/xxl-premium-product-detail-2.png',
      'assets/images/xxl-premium-product-detail-3.png',
      'assets/images/Product_detail-4.png',
      'assets/images/Product_detail-5.png',
      'assets/images/xxl-premium-product-detail-6.png'
    ],
    storyImage: 'assets/images/pastel-wellness-product-showcase.png',
    benefits: [['Comfort-led coverage', 'A practical format for everyday period-care routines.'], ['Made for movement', 'Designed around busy days and changing schedules.'], ['Clear care choices', 'Simple information and direct support before ordering.'], ['Everyday confidence', 'Thoughtful coverage that fits naturally into your routine.']],
    facts: [['Format', 'XXL · 320 mm'], ['Pack', '6 pads'], ['Price', '₹280']],
    details: [['Product description', 'A comfort-led XXL sanitary-pad format for everyday period-care routines.'], ['How to use', 'Use according to your personal routine and replace as needed. Follow the directions provided with the product pack.'], ['Ordering information', 'Add the product to your cart, enter your delivery details and send the generated message in WhatsApp. Availability is confirmed by the Way2Care team.']]
  },
  'xxxl-herbal-pads': {
    name: 'XXXL Premium Herbal Sanitary Pads', category: 'Period care', price: 300,
    description: `${WAY2CARE_PREMIUM_DESCRIPTION} Designed for heavy or overnight menstrual flow, this XXXL (360 mm) size offers extended coverage.`,
    hoverImage: 'assets/images/xxxl-premium-herbal-sanitary-product-detail-2.png',
    images: [
      'assets/images/product-sanitary-napkin-2.png',
      'assets/images/xxxl-premium-herbal-sanitary-product-detail-2.png',
      'assets/images/xxxl-premium-herbal-sanitary-product-detail-3.png',
      'assets/images/Product_detail-4.png',
      'assets/images/Product_detail-5.png',
      'assets/images/xxxl-premium-herbal-sanitary-product-detail-6.png'
    ],
    storyImage: 'assets/images/pastel-wellness-product-showcase.png',
    benefits: [['Extra coverage', 'A longer format for routines that call for more coverage.'], ['Day-to-night flexibility', 'Made to support changing period-care moments.'], ['Comfort-focused', 'A thoughtful format designed around everyday ease.'], ['Direct care support', 'Ask questions before ordering through WhatsApp.']],
    facts: [['Format', 'XXXL · 320 mm'], ['Pack', '6 pads'], ['Price', '₹300']],
    details: [['Product description', 'An extra-long XXXL sanitary-pad format for heavier-flow days and night-time routines.'], ['How to use', 'Use according to your personal routine and replace as needed. Follow the directions provided with the product pack.'], ['Ordering information', 'Your WhatsApp order is submitted only after you review the prefilled message and press Send.']]
  },
  'herbal-panty-liners': {
    name: 'Herbal Panty Liners', category: 'Daily care', price: 200,
    description: WAY2CARE_LINER_DESCRIPTION,
    hoverImage: 'assets/images/panty-liners-product-detail-2.png',
    images: [
      'assets/images/product-panty-liners.png',
      'assets/images/panty-liners-product-detail-2.png',
      'assets/images/panty-liners-product-detail-3.png',
      'assets/images/Product_detail-4.png',
      'assets/images/Product_detail-5.png',
      'assets/images/panty-liners-product-detail-6.png'
    ],
    storyImage: 'assets/images/pastel-wellness-product-showcase.png',
    benefits: [['Light daily support', 'A compact format for lighter everyday routines.'], ['Routine friendly', 'Easy to include in changing schedules.'], ['Thoughtful comfort', 'Created for flexible, everyday use.'], ['Simple ordering', 'Save the selection and continue through WhatsApp.']],
    facts: [['Format', 'Panty liner'], ['Use', 'Daily care'], ['Price', '₹200']],
    details: [['Product description', 'A light, flexible liner format for everyday support and lighter days.'], ['How to use', 'Follow the use and replacement directions supplied with the product pack.'], ['Ordering information', 'Final availability is confirmed by the Way2Care team through WhatsApp.']]
  },
  'xl-premium-herbal-pads': {
    name: 'XL Premium Herbal Sanitary Pads', category: 'Period care', price: 268,
    description: `${WAY2CARE_PREMIUM_DESCRIPTION} Designed for regular menstrual flow, this XL (280 mm) size offers comfortable everyday protection.`,
    hoverImage: 'assets/images/xl-premium-herbal-sanitary-product-detail-2.png',
    images: [
      'assets/images/product-sanitary-napkin-3.png',
      'assets/images/xl-premium-herbal-sanitary-product-detail-2.png',
      'assets/images/xl-premium-herbal-sanitary-product-detail-3.png',
      'assets/images/Product_detail-4.png',
      'assets/images/Product_detail-5.png',
      'assets/images/xl-premium-herbal-sanitary-product-detail-6.png'
    ],
    storyImage: 'assets/images/pastel-wellness-product-showcase.png',
    benefits: [['280 mm coverage', 'An XL format for lighter-flow and everyday period-care routines.'], ['Premium format', 'A comfort-led pad format for changing schedules.'], ['Herbal range', 'Part of the Way2Care herbal sanitary-pad collection.'], ['Easy ordering', 'Save your selection and review it before sending on WhatsApp.']],
    facts: [['Format', 'XL · 280 mm'], ['Pack', '6 pads'], ['Price', '₹268']],
    details: [['Product description', 'An XL premium herbal sanitary-pad format with 280 mm coverage and six pads per pack.'], ['How to use', 'Use according to your personal routine and replace as needed. Follow the directions supplied with the product pack.'], ['Ordering information', 'Add the product to your cart, enter delivery details and press Send in WhatsApp to submit the order.']]
  },
  'xl-ultra-thin-herbal-pads': {
    name: 'XL Ultra Thin Herbal Sanitary Pads', category: 'Period care', price: 220,
    description: `${WAY2CARE_ULTRA_THIN_DESCRIPTION} Designed for light-to-low menstrual flow, this XL (280 mm) size offers a slim, comfortable fit.`,
    hoverImage: 'assets/images/xl-ultra-thin-product-detail-2.png',
    images: [
      'assets/images/product-sanitary-napkin-4.png',
      'assets/images/xl-ultra-thin-product-detail-2.png',
      'assets/images/xl-ultra-thin-product-detail-3.png',
      'assets/images/Product_detail-4.png',
      'assets/images/Product_detail-5.png',
      'assets/images/xl-ultra-thin-product-detail-6.png'
    ],
    storyImage: 'assets/images/pastel-wellness-product-showcase.png',
    benefits: [['Ultra-thin profile', 'A slimmer pad format for an easy everyday routine.'], ['280 mm coverage', 'An XL format for lighter and medium-flow moments.'], ['Herbal range', 'Part of the Way2Care herbal sanitary-pad collection.'], ['Direct support', 'Ask the care team any product questions before ordering.']],
    facts: [['Format', 'XL ultra thin · 280 mm'], ['Pack', '6 pads'], ['Price', '₹220']],
    details: [['Product description', 'An XL ultra-thin herbal sanitary-pad format with 280 mm coverage and six pads per pack.'], ['How to use', 'Use according to your personal routine and replace as needed. Follow the directions supplied with the product pack.'], ['Ordering information', 'Your order is submitted only after you review the message and press Send in WhatsApp.']]
  },
  'xxl-ultra-thin-herbal-pads': {
    name: 'XXL Ultra Thin Herbal Sanitary Pads', category: 'Period care', price: 240,
    description: `${WAY2CARE_ULTRA_THIN_DESCRIPTION} Designed for low-to-medium menstrual flow, this XXL (320 mm) size offers comfortable, reliable coverage.`,
    hoverImage: 'assets/images/xxl-ultra-thin-product-detail-2.png',
    images: [
      'assets/images/product-sanitary-napkin-5.png',
      'assets/images/xxl-ultra-thin-product-detail-2.png',
      'assets/images/xxl-ultra-thin-product-detail-3.png',
      'assets/images/Product_detail-4.png',
      'assets/images/Product_detail-5.png',
      'assets/images/xxl-ultra-thin-product-detail-6.png'
    ],
    storyImage: 'assets/images/pastel-wellness-product-showcase.png',
    benefits: [['Ultra-thin profile', 'A slimmer format designed around everyday ease.'], ['320 mm coverage', 'An XXL format for day and overnight routines.'], ['Herbal range', 'Part of the Way2Care herbal sanitary-pad collection.'], ['Saved cart', 'Combine it with other products in one WhatsApp order.']],
    facts: [['Format', 'XXL ultra thin · 320 mm'], ['Pack', '6 pads'], ['Price', '₹240']],
    details: [['Product description', 'An XXL ultra-thin herbal sanitary-pad format with 320 mm coverage and six pads per pack.'], ['How to use', 'Use according to your personal routine and replace as needed. Follow the directions supplied with the product pack.'], ['Ordering information', 'Add it to the saved cart and complete the order details before opening WhatsApp.']]
  },
  'xxxl-ultra-thin-herbal-pads': {
    name: 'XXXL Ultra Thin Herbal Sanitary Pads', category: 'Period care', price: 260,
    description: `${WAY2CARE_ULTRA_THIN_DESCRIPTION} This XXXL (360 mm) size is designed for medium-to-regular menstrual flow and extended coverage.`,
    hoverImage: 'assets/images/xxxl-ultra-thin-product-detail-2.png',
    images: [
      'assets/images/product-sanitary-napkin-6.png',
      'assets/images/xxxl-ultra-thin-product-detail-2.png',
      'assets/images/xxxl-ultra-thin-product-detail-3.png',
      'assets/images/Product_detail-4.png',
      'assets/images/Product_detail-5.png',
      'assets/images/xxxl-ultra-thin-product-detail-6.png'
    ],
    storyImage: 'assets/images/pastel-wellness-product-showcase.png',
    benefits: [['Extra-long format', 'Extended coverage for changing flow and night-time routines.'], ['Ultra-thin profile', 'A slimmer format designed around everyday ease.'], ['Herbal range', 'Part of the Way2Care herbal sanitary-pad collection.'], ['Clear confirmation', 'Product availability is confirmed by the team on WhatsApp.']],
    facts: [['Format', 'XXXL ultra thin · 320 mm'], ['Pack', '6 pads'], ['Price', '₹260']],
    details: [['Product description', 'An XXXL ultra-thin herbal sanitary-pad format with 320 mm coverage and six pads per pack.'], ['How to use', 'Use according to your personal routine and replace as needed. Follow the directions supplied with the product pack.'], ['Ordering information', 'Review the prefilled WhatsApp message and press Send to submit your order.']]
  },
  'sanitary-pad-sample-pack': {
    name: 'Herbal Sanitary Pad Sample Pack', category: 'Period care', price: 200,
    description: 'A convenient sample pack for exploring Way2Care herbal sanitary pads.',
    hoverImage: 'assets/images/sample-pack-product-detail-2.png',
    images: [
      'assets/images/product-sanitary-napkin-7.png',
      'assets/images/sample-pack-product-detail-2.png',
      'assets/images/sample-pack-product-detail-3.png',
      'assets/images/Product_detail-4.png',
      'assets/images/Product_detail-5.png',
      'assets/images/sample-pack-product-detail-6.png'
    ],
    storyImage: 'assets/images/pastel-wellness-product-showcase.png',
    benefits: [['Sample format', 'A simple way to explore the Way2Care sanitary-pad range.'], ['Herbal range', 'Part of the current herbal period-care collection.'], ['Routine friendly', 'A practical introduction to the available formats.'], ['WhatsApp support', 'Confirm the current sample-pack contents before ordering.']],
    facts: [['Format', 'Sample pack'], ['Use', 'Period care'], ['Price', '₹200']],
    details: [['Product description', 'A sample-pack format for exploring Way2Care herbal sanitary pads.'], ['Pack information', 'The current sample-pack contents and availability are confirmed by the Way2Care team.'], ['Ordering information', 'Add the sample pack to your cart and press Send in WhatsApp after reviewing the order message.']]
  },
  'closing-day-herbal-pads': {
    name: 'Closing Day Herbal Sanitary Pads', category: 'Period care', price: 300,
    description: 'Light, comfortable protection designed for the closing days of your cycle.',
    hoverImage: 'assets/images/closing-day-pad-product-detail-2.png',
    images: [
      'assets/images/product-sanitary-napkin-8.png',
      'assets/images/closing-day-pad-product-detail-2.png',
      'assets/images/closing-day-pad-product-detail-3.png',
      'assets/images/Product_detail-4.png',
      'assets/images/Product_detail-5.png',
      'assets/images/closing-day-pad-product-detail-6.png'
    ],
    storyImage: 'assets/images/pastel-wellness-product-showcase.png',
    benefits: [['Closing-day care', 'A format designed around lighter-flow days near the end of a cycle.'], ['Comfort-led', 'A practical addition to a changing period-care routine.'], ['Herbal range', 'Part of the Way2Care herbal sanitary-pad collection.'], ['Simple ordering', 'Save it with other products and order through WhatsApp.']],
    facts: [['Format', 'Closing day pad'], ['Use', 'Light-flow period care'], ['Price', '₹300']],
    details: [['Product description', 'A herbal sanitary-pad format designed for lighter-flow closing days.'], ['How to use', 'Use according to your personal routine and replace as needed. Follow the directions supplied with the product pack.'], ['Ordering information', 'Review your delivery and product details, then press Send in WhatsApp to submit the order.']]
  },
  'cotton-pads': {
    name: 'Cotton Sanitary Napkins – Ultra Thin', category: 'Period care', price: 260,
    description: `${WAY2CARE_COTTON_DESCRIPTION} Designed for women experiencing light to heavy menstrual flow, these ultra-thin pads offer comfort, absorbency, and reliable protection throughout the day.`,
    hoverImage: 'assets/images/aqua-fabric-pad-cross-section.png',
    images: ['assets/images/aqua-fabric-pad-cross-section.png'],
    storyImage: 'assets/images/pastel-wellness-product-showcase.png',
    benefits: [['Soft cotton layers', 'Breathable layers designed for softness and everyday comfort.'], ['Flow options', 'XL, XXL and XXXL formats are described for light, medium and heavy flow.'], ['Sensitive-skin mindful', 'Hypoallergenic and skin-friendly properties, as described for this range.'], ['Thoughtful materials', 'Biodegradable and environmentally friendly product positioning.']],
    facts: [['Format', 'Ultra-thin cotton sanitary napkin'], ['Sizes', 'XL 280 mm · XXL 320 mm · XXXL 360 mm'], ['Price', 'Price on request']],
    details: [['Product description', `${WAY2CARE_COTTON_DESCRIPTION} Designed for women experiencing light to heavy menstrual flow, these ultra-thin pads offer comfort, absorbency, and reliable protection throughout the day.`], ['How to use', 'Use according to your personal routine and replace as needed. Follow the directions supplied with the product pack.'], ['Ordering information', 'Contact the Way2Care team to confirm current availability, pack details and price before ordering.']]
  }
};

/* ---- Shared Product Card Images ---- */
function initProductCardImageSwaps() {
  const cards = document.querySelectorAll([
    '[data-product-card]',
    '.all-products__grid .collection-card',
    '.product-grid .product-card',
    '.pdp-related__grid article'
  ].join(', '));

  cards.forEach((card) => {
    const productLink = card.querySelector('a[href*="product-detail.html?product="]');
    const productButton = card.querySelector('[data-product-id]');
    let productId = productButton?.dataset.productId || '';

    if (!productId && productLink) {
      try {
        productId = new URL(productLink.href, window.location.href).searchParams.get('product') || '';
      } catch (_) {
        productId = '';
      }
    }

    const product = WAY2CARE_PRODUCTS[productId];
    if (!product) return;

    const media = card.querySelector('.shop-card__media, .collection-card__media, .product-image, .pdp-related__image');
    const primaryImage = media?.querySelector('img');
    if (!media || !primaryImage) return;

    card.classList.add('way2care-product-card');
    card.dataset.productId = productId;
    media.classList.add('product-image-swap');
    primaryImage.classList.add('product-image-swap__primary');
    primaryImage.src = product.images[0];
    primaryImage.alt = product.name;

    if (!product.hoverImage || media.querySelector('.product-image-swap__secondary')) return;

    const secondaryImage = document.createElement('img');
    secondaryImage.className = 'product-image-swap__secondary';
    secondaryImage.src = product.hoverImage;
    secondaryImage.alt = '';
    secondaryImage.loading = 'lazy';
    secondaryImage.decoding = 'async';
    secondaryImage.setAttribute('aria-hidden', 'true');
    primaryImage.insertAdjacentElement('afterend', secondaryImage);
  });
}

function initProductDetail() {
  const page = document.querySelector('[data-product-detail]');
  if (!page) return;
  const requested = new URLSearchParams(window.location.search).get('product') || 'xxl-herbal-pads';
  const productId = WAY2CARE_PRODUCTS[requested] ? requested : 'xxl-herbal-pads';
  const product = WAY2CARE_PRODUCTS[productId];
  const money = (value) => Number(value) ? `₹${Number(value).toLocaleString('en-IN')}` : 'Price on request';
  const setText = (selector, value) => { const el = page.querySelector(selector); if (el) el.textContent = value; };
  document.title = `${product.name} | Way2Care`;
  setText('[data-pdp-breadcrumb]', product.name);
  setText('[data-pdp-category]', product.category);
  setText('[data-pdp-name]', product.name);
  setText('[data-pdp-description]', product.description);
  setText('[data-pdp-price]', money(product.price));
  setText('[data-pdp-price-note]', product.price ? 'Inclusive of applicable taxes' : 'Confirmed by the Way2Care team on WhatsApp');

  const stickyImage = document.querySelector('[data-pdp-sticky-image]');
  const stickyName = document.querySelector('[data-pdp-sticky-name]');
  const stickyPrice = document.querySelector('[data-pdp-sticky-price]');
  if (stickyImage) {
    stickyImage.src = product.images[0];
    stickyImage.alt = product.name;
  }
  if (stickyName) stickyName.textContent = product.name;
  if (stickyPrice) stickyPrice.textContent = money(product.price);

  const quickBenefits = page.querySelector('[data-pdp-quick-benefits]');
  if (quickBenefits) {
    quickBenefits.innerHTML = product.benefits.slice(0, 4).map((benefit) => `<li><span aria-hidden="true">✓</span>${benefit[0]}</li>`).join('');
  }

  const featureChips = page.querySelector('[data-pdp-feature-chips]');
  if (featureChips) {
    const featureIcons = ['✦', '◇', '○', '♡'];
    featureChips.innerHTML = product.benefits.slice(0, 4).map((benefit, index) => `<div><i aria-hidden="true">${featureIcons[index]}</i><span>${benefit[0]}</span></div>`).join('');
  }

  const idealChips = page.querySelector('[data-pdp-ideal-chips]');
  if (idealChips) {
    const description = product.description.toLowerCase();
    let idealFor = ['Everyday flow', 'Busy routines', 'Daytime comfort'];
    if (productId === 'herbal-panty-liners') idealFor = ['Daily routines', 'Light days', 'Flexible care'];
    else if (productId === 'sanitary-pad-sample-pack') idealFor = ['First-time users', 'Exploring formats', 'Easy trial'];
    else if (productId === 'closing-day-herbal-pads') idealFor = ['Closing days', 'Lighter flow', 'Routine changes'];
    else if (description.includes('heavier') || description.includes('night')) idealFor = ['Heavier-flow days', 'Night-time routines', 'Extra coverage'];
    idealChips.innerHTML = idealFor.map((label, index) => `<span><i aria-hidden="true">${['☼', '☾', '↗'][index]}</i>${label}</span>`).join('');
  }

  const mainImage = page.querySelector('[data-pdp-main-image]');
  const thumbRoot = page.querySelector('[data-pdp-thumbnails]');
  const galleryImages = (product.images && product.images.length >= 2)
    ? product.images
    : [...new Set([
        product.images[0],
        product.hoverImage,
        ...product.images.slice(1)
      ].filter(Boolean))];
  let activeImageIndex = 0;
  const imageBadge = page.querySelector('[data-pdp-image-badge]');
  const chooseImage = (src, index) => {
    activeImageIndex = index;
    mainImage.classList.add('is-changing');
    setTimeout(() => { 
      mainImage.src = src; 
      mainImage.alt = `${product.name} product view ${index + 1} of ${galleryImages.length}`; 
      mainImage.classList.remove('is-changing'); 
    }, 120);
    thumbRoot.querySelectorAll('button').forEach((button, buttonIndex) => button.classList.toggle('is-active', buttonIndex === index));
    if (imageBadge) imageBadge.textContent = `${index + 1} / ${galleryImages.length}`;
  };
  thumbRoot.innerHTML = galleryImages.map((src, index) => `<button type="button" class="${index === 0 ? 'is-active' : ''}" aria-label="View image ${index + 1}"><img src="${src}" alt="" loading="lazy"></button>`).join('');
  thumbRoot.querySelectorAll('button').forEach((button, index) => button.addEventListener('click', () => chooseImage(galleryImages[index], index)));
  const galleryPrevious = page.querySelector('[data-pdp-gallery-prev]');
  const galleryNext = page.querySelector('[data-pdp-gallery-next]');
  if (galleryPrevious) galleryPrevious.hidden = galleryImages.length < 2;
  if (galleryNext) galleryNext.hidden = galleryImages.length < 2;
  galleryPrevious?.addEventListener('click', () => {
    const nextIndex = activeImageIndex <= 0 ? galleryImages.length - 1 : activeImageIndex - 1;
    chooseImage(galleryImages[nextIndex], nextIndex);
  });
  galleryNext?.addEventListener('click', () => {
    const nextIndex = activeImageIndex >= galleryImages.length - 1 ? 0 : activeImageIndex + 1;
    chooseImage(galleryImages[nextIndex], nextIndex);
  });
  chooseImage(galleryImages[0], 0);

  const flowSelector = page.querySelector('[data-pdp-flow-selector]');
  const flowOptions = page.querySelector('[data-pdp-flow-options]');
  const regularFlow = [
    ['xl-premium-herbal-pads', 'XL (Light-medium)'],
    ['xxl-herbal-pads', 'XXL (Heavy)'],
    ['xxxl-herbal-pads', 'XXXL (Extra heavy)']
  ];
  const ultraThinFlow = [
    ['xl-ultra-thin-herbal-pads', 'XL Ultra Thin'],
    ['xxl-ultra-thin-herbal-pads', 'XXL Ultra Thin'],
    ['xxxl-ultra-thin-herbal-pads', 'XXXL Ultra Thin']
  ];
  const flowGroup = regularFlow.some(([id]) => id === productId) ? regularFlow
    : ultraThinFlow.some(([id]) => id === productId) ? ultraThinFlow : [];
  if (flowSelector && flowOptions && flowGroup.length) {
    flowSelector.hidden = false;
    flowOptions.innerHTML = flowGroup.map(([id, label]) => `<a href="product-detail.html?product=${id}" class="${id === productId ? 'is-active' : ''}" ${id === productId ? 'aria-current="page"' : ''}>${label}</a>`).join('');
  }

  page.querySelector('[data-pdp-share]')?.addEventListener('click', async (event) => {
    const button = event.currentTarget;
    const shareData = { title: product.name, text: product.description, url: window.location.href };
    try {
      if (navigator.share) await navigator.share(shareData);
      else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        button.innerHTML = '<span aria-hidden="true">&#10003;</span> Link copied';
        setTimeout(() => { button.innerHTML = '<span aria-hidden="true">&#8599;</span> Share'; }, 1800);
      }
    } catch (_) {
      // The native share sheet can be dismissed without changing the page.
    }
  });

  page.querySelector('[data-pdp-variants]').hidden = true;
  const quantity = page.querySelector('[data-pdp-quantity]');
  const syncButtons = () => document.querySelectorAll('[data-pdp-add], [data-pdp-buy]').forEach((button) => {
    button.dataset.productId = productId;
    button.dataset.productName = product.name;
    button.dataset.productPrice = String(product.price);
    button.dataset.productImage = product.images[0];
    button.dataset.productQuantity = quantity.textContent;
    button.dataset.productVariant = product.category;
  });
  page.querySelector('[data-qty-dec]').addEventListener('click', () => setTimeout(syncButtons));
  page.querySelector('[data-qty-inc]').addEventListener('click', () => setTimeout(syncButtons));
  syncButtons();

  const benefitIcons = [
    '<svg viewBox="0 0 24 24"><path d="M12 3C9 7 6 10 6 14a6 6 0 0 0 12 0c0-4-3-7-6-11Z"></path><path d="M9 15c.5 1.5 1.5 2 3 2"></path></svg>',
    '<svg viewBox="0 0 24 24"><path d="M5 7h11"></path><path d="m13 4 3 3-3 3"></path><path d="M19 17H8"></path><path d="m11 14-3 3 3 3"></path></svg>',
    '<svg viewBox="0 0 24 24"><path d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"></path><path d="m8.5 12 2.2 2.2 4.8-5"></path></svg>',
    '<svg viewBox="0 0 24 24"><path d="M12 3v4"></path><path d="M12 17v4"></path><path d="M3 12h4"></path><path d="M17 12h4"></path><path d="m5.6 5.6 2.8 2.8"></path><path d="m15.6 15.6 2.8 2.8"></path><path d="m18.4 5.6-2.8 2.8"></path><path d="m8.4 15.6-2.8 2.8"></path><circle cx="12" cy="12" r="3"></circle></svg>'
  ];
  page.querySelector('[data-pdp-benefits]').innerHTML = product.benefits.map((benefit, index) => `<article><span>0${index + 1}</span><i class="pdp-benefit-icon" aria-hidden="true">${benefitIcons[index]}</i><h3>${benefit[0]}</h3><p>${benefit[1]}</p></article>`).join('');
  const storyImage = page.querySelector('[data-pdp-story-image]');
  if (storyImage) {
    storyImage.src = product.storyImage;
    storyImage.alt = `${product.name} in a Way2Care setting`;
  }
  const storyFacts = page.querySelector('[data-pdp-facts]');
  if (storyFacts) storyFacts.innerHTML = product.facts.map((fact) => `<div><small>${fact[0]}</small><strong>${fact[1]}</strong></div>`).join('');
  page.querySelector('[data-pdp-accordions]').innerHTML = product.details.map((detail, index) => {
    const body = detail[0] === 'Product description' ? product.description : detail[1];
    return `<details ${index === 0 ? 'open' : ''}><summary>${detail[0]}<span>+</span></summary><div><p>${body}</p></div></details>`;
  }).join('');

  const related = Object.entries(WAY2CARE_PRODUCTS).filter(([id]) => id !== productId).slice(0, 3);
  page.querySelector('[data-pdp-related]').innerHTML = related.map(([id, item]) => `<article><a class="pdp-related__image" href="product-detail.html?product=${id}"><img src="${item.images[0]}" alt="${item.name}" loading="lazy"><span>${item.category}</span></a><div><h3><a href="product-detail.html?product=${id}">${item.name}</a></h3><p>${money(item.price)}</p><a href="product-detail.html?product=${id}">View details &rarr;</a></div></article>`).join('');

  const lightbox = document.querySelector('[data-pdp-lightbox]');
  const lightboxImage = lightbox?.querySelector('[data-pdp-lightbox-image]');
  page.querySelector('[data-pdp-zoom]')?.addEventListener('click', () => { if (!lightbox || !lightboxImage) return; lightboxImage.src = mainImage.src; lightboxImage.alt = mainImage.alt; lightbox.showModal(); });
  lightbox?.querySelector('[data-pdp-lightbox-close]')?.addEventListener('click', () => lightbox.close());
  lightbox?.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });
}

/* ---- Product Detail Scroll Story ---- */
function initPdpMotion() {
  const page = document.querySelector('[data-product-detail]');
  if (!page) return;

  const animated = [...page.querySelectorAll('[data-pdp-animate]')];
  const staggerGroups = [...page.querySelectorAll('[data-pdp-motion-stagger]')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  staggerGroups.forEach((group) => {
    [...group.children].forEach((child, index) => child.style.setProperty('--pdp-motion-index', index));
  });

  document.body.classList.add('pdp-motion-ready');

  if (reducedMotion || !('IntersectionObserver' in window)) {
    animated.forEach((element) => element.classList.add('is-inview'));
    staggerGroups.forEach((element) => element.classList.add('is-inview'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-inview');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

    animated.forEach((element) => observer.observe(element));
    staggerGroups.forEach((element) => observer.observe(element));
  }

  const parallaxItems = [...page.querySelectorAll('[data-pdp-parallax]')];
  const stickyBuy = document.querySelector('[data-pdp-sticky-buy]');
  const hero = page.querySelector('.pdp-hero');
  const footer = document.querySelector('.final-footer');
  let ticking = false;

  const updateScrollEffects = () => {
    const viewportHeight = window.innerHeight || 1;

    if (!reducedMotion) {
      parallaxItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const progress = Math.max(-1, Math.min(1, (viewportHeight * .5 - (rect.top + rect.height * .5)) / viewportHeight));
        item.style.setProperty('--pdp-parallax-y', `${progress * 28}px`);
      });
    }

    if (stickyBuy && hero) {
      const heroBottom = hero.getBoundingClientRect().bottom;
      const footerNear = footer ? footer.getBoundingClientRect().top < viewportHeight * .92 : false;
      const shouldShow = heroBottom < 90 && !footerNear;
      stickyBuy.classList.toggle('is-visible', shouldShow);
      stickyBuy.setAttribute('aria-hidden', shouldShow ? 'false' : 'true');
    }

    ticking = false;
  };

  const requestScrollUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateScrollEffects);
  };

  window.addEventListener('scroll', requestScrollUpdate, { passive: true });
  window.addEventListener('resize', requestScrollUpdate);
  updateScrollEffects();
}

/* ---- Quantity Controls ---- */
function initQtyControls() {
  document.querySelectorAll('.qty-control').forEach(ctrl => {
    const val = ctrl.querySelector('.qty-control__val');
    const dec = ctrl.querySelector('[data-qty-dec]');
    const inc = ctrl.querySelector('[data-qty-inc]');
    if (!val) return;
    let qty = parseInt(val.value || val.textContent) || 1;
    const update = () => { val.value ? (val.value = qty) : (val.textContent = qty); };
    dec && dec.addEventListener('click', () => { if (qty > 1) { qty--; update(); } });
    inc && inc.addEventListener('click', () => { qty++; update(); });
  });
}

/* ---- Add to Cart ---- */
function initCart() {
  const nav = document.querySelector('.nav-right-wrap');
  if (!nav) return;

  const talkIcon = nav.querySelector('.header-shop span');
  if (talkIcon) {
    talkIcon.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M5 12h14"></path>
        <path d="m14 7 5 5-5 5"></path>
      </svg>`;
  }

  const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[character]);
  const money = (value) => Number(value) > 0 ? `₹${Number(value).toLocaleString('en-IN')}` : 'To confirm';
  const readCart = () => {
    try {
      const stored = JSON.parse(localStorage.getItem(WAY2CARE_CART_KEY) || '[]');
      return Array.isArray(stored) ? stored.filter((item) => item && item.id && item.name && item.quantity > 0) : [];
    } catch (_error) {
      return [];
    }
  };

  let cart = readCart();
  let checkoutVisible = false;

  const cartButton = document.createElement('button');
  cartButton.className = 'header-cart-button';
  cartButton.type = 'button';
  cartButton.setAttribute('aria-label', 'Open shopping cart');
  cartButton.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M3.5 4.5h2l1.7 9.1a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.5l1.2-5.2H6.3"></path>
      <circle cx="9.5" cy="19" r="1.25"></circle>
      <circle cx="17.5" cy="19" r="1.25"></circle>
    </svg>
    <span data-site-cart-count>0</span>`;
  nav.insertBefore(cartButton, nav.querySelector('.menu-toggle'));

  const cartRoot = document.createElement('div');
  cartRoot.className = 'commerce-cart';
  cartRoot.innerHTML = `
    <div class="commerce-cart__backdrop" data-cart-close></div>
    <aside class="commerce-cart__panel" role="dialog" aria-modal="true" aria-labelledby="commerce-cart-title">
      <header class="commerce-cart__header">
        <div><small>Your Way2Care order</small><h2 id="commerce-cart-title">Your cart.</h2></div>
        <button type="button" class="commerce-cart__close" data-cart-close aria-label="Close cart">×</button>
      </header>
      <div class="commerce-cart__view" data-cart-view>
        <div class="commerce-cart__items" data-cart-items></div>
        <div class="commerce-cart__empty" data-cart-empty><strong>Your cart is waiting.</strong><p>Add an essential or combo pack to begin your WhatsApp order.</p><a href="shop-all.html">Explore all care →</a></div>
        <div class="commerce-cart__summary" data-cart-summary>
          <div><span>Estimated total</span><strong data-cart-total>₹0</strong></div>
          <p data-cart-pricing-note>Final availability is confirmed by the Way2Care team.</p>
          <button type="button" class="commerce-cart__checkout" data-cart-checkout>Continue to order details</button>
        </div>
      </div>
      <form class="commerce-order" data-order-form novalidate hidden>
        <div class="commerce-order__intro"><button type="button" data-order-back>← Back to cart</button><h3>Delivery details.</h3><p>We use these details only to prepare your WhatsApp order message.</p></div>
        <label>Full name *<input name="name" autocomplete="name" required></label>
        <label>Mobile number *<input name="mobile" type="tel" inputmode="numeric" autocomplete="tel" maxlength="10" pattern="[0-9]{10}" required></label>
        <label>Email address <input name="email" type="email" autocomplete="email"></label>
        <label>Complete delivery address *<textarea name="address" autocomplete="street-address" required></textarea></label>
        <div class="commerce-order__row"><label>City *<input name="city" autocomplete="address-level2" required></label><label>State *<input name="state" autocomplete="address-level1" required></label></div>
        <label>Pincode *<input name="pincode" inputmode="numeric" autocomplete="postal-code" maxlength="6" pattern="[0-9]{6}" required></label>
        <label>Additional instructions <textarea name="instructions"></textarea></label>
        <p class="commerce-order__notice">WhatsApp will open with a prefilled message. You must press Send in WhatsApp to submit the order.</p>
        <button type="submit" class="commerce-order__submit">Review order in WhatsApp</button>
        <button type="button" class="commerce-order__cancel" data-order-cancel>Cancel this order</button>
        <p class="commerce-order__status" data-order-status aria-live="polite"></p>
      </form>
    </aside>
    <dialog class="commerce-confirm" data-order-confirm aria-labelledby="commerce-confirm-title" aria-describedby="commerce-confirm-copy">
      <span class="commerce-confirm__eyebrow">Your Way2Care order</span>
      <h2 id="commerce-confirm-title">Cancel this order?</h2>
      <p id="commerce-confirm-copy">Remove all products and cancel this order?</p>
      <div class="commerce-confirm__actions">
        <button type="button" class="commerce-confirm__keep" data-confirm-cancel>Keep my order</button>
        <button type="button" class="commerce-confirm__remove" data-confirm-accept>Remove products</button>
      </div>
    </dialog>`;
  document.body.appendChild(cartRoot);

  const itemsRoot = cartRoot.querySelector('[data-cart-items]');
  const emptyRoot = cartRoot.querySelector('[data-cart-empty]');
  const summaryRoot = cartRoot.querySelector('[data-cart-summary]');
  const totalRoot = cartRoot.querySelector('[data-cart-total]');
  const pricingNote = cartRoot.querySelector('[data-cart-pricing-note]');
  const cartView = cartRoot.querySelector('[data-cart-view]');
  const orderForm = cartRoot.querySelector('[data-order-form]');
  const orderStatus = cartRoot.querySelector('[data-order-status]');
  const orderConfirm = cartRoot.querySelector('[data-order-confirm]');
  const countRoot = cartButton.querySelector('[data-site-cart-count]');

  const save = () => localStorage.setItem(WAY2CARE_CART_KEY, JSON.stringify(cart));
  const render = () => {
    const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + (Number(item.price) || 0) * item.quantity, 0);
    const hasPendingPrice = cart.some((item) => !Number(item.price));
    countRoot.textContent = String(quantity);
    countRoot.hidden = quantity === 0;
    emptyRoot.hidden = cart.length !== 0;
    summaryRoot.hidden = cart.length === 0;
    totalRoot.textContent = hasPendingPrice
      ? (total > 0 ? `${money(total)} + items to confirm` : 'To be confirmed')
      : money(total);
    pricingNote.textContent = hasPendingPrice
      ? 'One or more prices will be confirmed by the Way2Care team on WhatsApp.'
      : 'Final product availability is confirmed by the Way2Care team.';
    itemsRoot.innerHTML = cart.map((item) => `
      <article class="commerce-cart-item" data-cart-item="${escapeHtml(item.id)}">
        <img src="${escapeHtml(item.image || '')}" alt="">
        <div><h3>${escapeHtml(item.name)}</h3>${item.variant ? `<small>${escapeHtml(item.variant)}</small>` : ''}<p>${money(item.price)}${Number(item.price) ? ' each' : ''}</p>
          <div class="commerce-cart-item__controls"><button type="button" data-cart-decrease aria-label="Decrease quantity">−</button><span>${item.quantity}</span><button type="button" data-cart-increase aria-label="Increase quantity">+</button><button type="button" data-cart-remove>Remove</button></div>
        </div>
      </article>`).join('');
    save();
  };

  const setCheckout = (visible) => {
    checkoutVisible = Boolean(visible && cart.length);
    cartView.hidden = checkoutVisible;
    orderForm.hidden = !checkoutVisible;
    if (checkoutVisible) orderForm.querySelector('input')?.focus();
  };
  const openCart = (showCheckout = false) => {
    render();
    setCheckout(showCheckout);
    cartRoot.classList.add('is-open');
    document.body.classList.add('cart-is-open');
  };
  const closeCart = () => {
    cartRoot.classList.remove('is-open');
    document.body.classList.remove('cart-is-open');
    setCheckout(false);
    cartButton.focus();
  };
  const productFromButton = (button) => ({
    id: button.dataset.productId,
    name: button.dataset.productName,
    price: Number(button.dataset.productPrice) || 0,
    image: button.dataset.productImage || '',
    variant: button.dataset.productVariant || '',
    quantity: Math.max(1, Number(button.dataset.productQuantity) || 1)
  });
  const addProduct = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) existing.quantity += product.quantity;
    else cart.push(product);
    render();
  };

  cartButton.addEventListener('click', () => openCart(false));
  cartRoot.querySelectorAll('[data-cart-close]').forEach((button) => button.addEventListener('click', closeCart));
  cartRoot.querySelector('[data-cart-checkout]').addEventListener('click', () => setCheckout(true));
  cartRoot.querySelector('[data-order-back]').addEventListener('click', () => setCheckout(false));

  document.addEventListener('click', (event) => {
    const addButton = event.target.closest('[data-add-to-cart], [data-buy-now]');
    if (!addButton || !addButton.dataset.productId) return;
    event.preventDefault();
    addProduct(productFromButton(addButton));
    if (addButton.matches('[data-buy-now]')) {
      openCart(true);
    } else {
      const original = addButton.textContent;
      addButton.textContent = 'Added ✓';
      addButton.classList.add('is-added');
      setTimeout(() => { addButton.textContent = original; addButton.classList.remove('is-added'); }, 1400);
    }
  });

  itemsRoot.addEventListener('click', (event) => {
    const itemRoot = event.target.closest('[data-cart-item]');
    if (!itemRoot) return;
    const item = cart.find((entry) => entry.id === itemRoot.dataset.cartItem);
    if (!item) return;
    if (event.target.closest('[data-cart-increase]')) item.quantity += 1;
    if (event.target.closest('[data-cart-decrease]')) item.quantity = Math.max(1, item.quantity - 1);
    if (event.target.closest('[data-cart-remove]')) cart = cart.filter((entry) => entry.id !== item.id);
    render();
  });

  const cancelOrderButton = cartRoot.querySelector('[data-order-cancel]');
  cancelOrderButton.addEventListener('click', () => orderConfirm.showModal());
  orderConfirm.querySelector('[data-confirm-cancel]').addEventListener('click', () => orderConfirm.close());
  orderConfirm.addEventListener('click', (event) => { if (event.target === orderConfirm) orderConfirm.close(); });
  orderConfirm.querySelector('[data-confirm-accept]').addEventListener('click', () => {
    orderConfirm.close();
    cart = [];
    orderForm.reset();
    orderStatus.textContent = '';
    render();
    setCheckout(false);
  });

  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(orderForm);
    const mobile = String(formData.get('mobile') || '').trim();
    const pincode = String(formData.get('pincode') || '').trim();
    orderForm.elements.mobile.setCustomValidity(/^\d{10}$/.test(mobile) ? '' : 'Enter a valid 10-digit mobile number.');
    orderForm.elements.pincode.setCustomValidity(/^\d{6}$/.test(pincode) ? '' : 'Enter a valid 6-digit pincode.');
    if (!orderForm.reportValidity()) return;

    const total = cart.reduce((sum, item) => sum + (Number(item.price) || 0) * item.quantity, 0);
    const hasPendingPrice = cart.some((item) => !Number(item.price));
    const orderLines = cart.map((item, index) => {
      const subtotal = Number(item.price) ? money(item.price * item.quantity) : 'To be confirmed';
      return `${index + 1}. Product: ${item.name}\nSelected Variant: ${item.variant || 'Not applicable'}\nQuantity: ${item.quantity}\nUnit Price: ${money(item.price)}\nSubtotal: ${subtotal}`;
    }).join('\n\n');
    const orderTotal = hasPendingPrice
      ? (total > 0 ? `${money(total)} plus items to be confirmed` : 'To be confirmed by Way2Care')
      : money(total);
    const message = `NEW ORDER – WAY2CARE\n\nCustomer Details:\nName: ${formData.get('name')}\nMobile: ${mobile}\nEmail: ${formData.get('email') || 'Not provided'}\n\nDelivery Address:\n${formData.get('address')}\nCity: ${formData.get('city')}\nState: ${formData.get('state')}\nPincode: ${pincode}\n\nOrder Details:\n${orderLines}\n\nTotal Order Amount: ${orderTotal}\n\nAdditional Instructions:\n${formData.get('instructions') || 'None'}\n\nPlease confirm this order.`;
    window.open(`https://wa.me/${WAY2CARE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    orderStatus.textContent = 'WhatsApp opened with your order. Please press Send there to submit it. Your cart remains saved until you cancel or clear it.';
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && cartRoot.classList.contains('is-open')) closeCart();
  });
  render();
}

/* ---- Home Enquiry Form ---- */
function initHomeEnquiryForm() {
  const form = document.querySelector('.message-card');
  if (!form) return;
  form.removeAttribute('onsubmit');
  const status = document.createElement('p');
  status.className = 'message-card__note home-form-status';
  status.setAttribute('aria-live', 'polite');
  form.appendChild(status);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    status.textContent = 'Thank you, your message has been received.';
    form.reset();
  });
}

/* ---- Contact Form ---- */
function initContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      const errEl = field.parentElement.querySelector('.contact-form__error');
      if (!field.value.trim()) {
        field.classList.add('is-error');
        if (errEl) errEl.textContent = 'This field is required.';
        valid = false;
      } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
        field.classList.add('is-error');
        if (errEl) errEl.textContent = 'Please enter a valid email address.';
        valid = false;
      } else if (field.type === 'tel' && !/^\d{10}$/.test(field.value.trim())) {
        field.classList.add('is-error');
        if (errEl) errEl.textContent = 'Please enter a valid 10-digit mobile number.';
        valid = false;
      } else {
        field.classList.remove('is-error');
        if (errEl) errEl.textContent = '';
      }
    });
    if (!valid) return;
    const formData = new FormData(form);
    const message = `WAY2CARE ENQUIRY\n\nName: ${formData.get('name')}\nMobile: ${formData.get('phone')}\nEmail: ${formData.get('email')}\nTopic: ${formData.get('topic')}\n\nMessage:\n${formData.get('message')}\n\nPlease respond when convenient.`;
    window.open(`https://wa.me/${WAY2CARE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    const successEl = document.querySelector('#form-success');
    if (successEl) { successEl.style.display = 'flex'; }
    form.style.display = 'none';
  });
  form.querySelectorAll('[required]').forEach(field => {
    field.addEventListener('input', () => {
      field.classList.remove('is-error');
      const errEl = field.parentElement.querySelector('.contact-form__error');
      if (errEl) errEl.textContent = '';
    });
  });
}

/* ---- Shop All Catalogue Filters ---- */
function initCatalogueFilters() {
  const toolbar = document.querySelector('[data-product-filter]');
  const cards = Array.from(document.querySelectorAll('[data-product-card]'));
  if (!toolbar || !cards.length) return;

  const buttons = Array.from(toolbar.querySelectorAll('[data-filter]'));
  const count = document.querySelector('[data-product-count]');
  const empty = document.querySelector('[data-filter-empty]');
  const priceSlider = toolbar.querySelector('[data-price-slider]');
  const priceMaxLabel = toolbar.querySelector('[data-price-max-label]');
  const resetBtn = toolbar.querySelector('[data-reset-filters]');
  const sortSelect = document.querySelector('[data-sort-select]');
  const gridSwitcherBtns = Array.from(document.querySelectorAll('[data-grid-cols]'));
  const productGrid = document.querySelector('[data-product-grid]');
  const filterGroups = Array.from(toolbar.querySelectorAll('[data-filter-group]'));

  let currentCategory = 'all';
  let currentMaxPrice = priceSlider ? Number(priceSlider.value) : 9999;
  let currentSort = 'featured';

  // Toggle accordions
  filterGroups.forEach((group) => {
    const headerBtn = group.querySelector('.filter-group__header');
    if (!headerBtn) return;
    headerBtn.addEventListener('click', () => {
      const isOpen = group.classList.toggle('is-open');
      group.classList.toggle('is-collapsed', !isOpen);
      headerBtn.setAttribute('aria-expanded', String(isOpen));
      const icon = headerBtn.querySelector('.toggle-icon');
      if (icon) icon.innerHTML = isOpen ? '&minus;' : '&#43;';
    });
  });

  const cardMatchesCategory = (card, cat) => {
    if (cat === 'all') return true;
    const cats = (card.dataset.categories || card.dataset.shopCategory || card.dataset.category || '').split(',').map(c => c.trim());
    return cats.includes(cat);
  };

  // Update category counts
  buttons.forEach((button) => {
    const category = button.dataset.filter || 'all';
    const badge = button.querySelector('.filter-count') || button.querySelector('span');
    if (!badge) return;
    const catCount = cards.filter((card) => cardMatchesCategory(card, category)).length;
    const formattedCount = catCount < 10 ? `(0${catCount})` : `(${catCount})`;
    badge.textContent = formattedCount;
  });

  // Apply filters and sort
  const renderCards = () => {
    let visibleCount = 0;
    cards.forEach((card) => {
      const price = Number(card.dataset.price || 0);
      const matchesCat = cardMatchesCategory(card, currentCategory);
      const matchesPrice = price <= currentMaxPrice;
      const show = matchesCat && matchesPrice;
      card.hidden = !show;
      if (show) visibleCount += 1;
    });

    if (count) count.textContent = String(visibleCount);
    if (empty) empty.hidden = visibleCount > 0;

    // Sorting
    if (productGrid) {
      const sortedCards = [...cards];
      if (currentSort === 'price-asc') {
        sortedCards.sort((a, b) => Number(a.dataset.price || 0) - Number(b.dataset.price || 0));
      } else if (currentSort === 'price-desc') {
        sortedCards.sort((a, b) => Number(b.dataset.price || 0) - Number(a.dataset.price || 0));
      } else if (currentSort === 'name-asc') {
        sortedCards.sort((a, b) => (a.dataset.name || '').localeCompare(b.dataset.name || ''));
      } else {
        // featured: sort by data-order
        sortedCards.sort((a, b) => Number(a.dataset.order || 0) - Number(b.dataset.order || 0));
      }
      sortedCards.forEach((card) => productGrid.appendChild(card));
    }
  };

  // Category button clicks
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      currentCategory = button.dataset.filter || 'all';
      buttons.forEach((b) => {
        const active = b === button;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });
      renderCards();
    });
  });

  // Price slider change
  if (priceSlider) {
    const updateSlider = () => {
      currentMaxPrice = Number(priceSlider.value);
      if (priceMaxLabel) {
        priceMaxLabel.innerHTML = `&#8377;${currentMaxPrice}`;
      }
      renderCards();
    };
    priceSlider.addEventListener('input', updateSlider);
  }

  // Reset filters
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      currentCategory = 'all';
      buttons.forEach((b) => {
        const isAll = (b.dataset.filter || 'all') === 'all';
        b.classList.toggle('is-active', isAll);
        b.setAttribute('aria-pressed', String(isAll));
      });
      if (priceSlider) {
        priceSlider.value = priceSlider.max;
        currentMaxPrice = Number(priceSlider.max);
        if (priceMaxLabel) priceMaxLabel.innerHTML = `&#8377;${currentMaxPrice}`;
      }
      if (sortSelect) {
        sortSelect.value = 'featured';
        currentSort = 'featured';
      }
      renderCards();
    });
  }

  // Sort change
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      currentSort = sortSelect.value;
      renderCards();
    });
  }

  // Grid view switcher (3 cols vs 4 cols)
  gridSwitcherBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const cols = btn.dataset.gridCols;
      gridSwitcherBtns.forEach((b) => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });
      if (productGrid) {
        productGrid.classList.toggle('grid-cols-4', cols === '4');
      }
    });
  });

  renderCards();
}

/* ---- Flow and pad-size guide ---- */
function initFlowSizeGuide() {
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  if (mobileMenu && !mobileMenu.querySelector('[data-flow-guide-open]')) {
    const mobileTrigger = document.createElement('a');
    mobileTrigger.href = '#flow-size-guide';
    mobileTrigger.dataset.flowGuideOpen = '';
    mobileTrigger.className = 'mobile-menu__guide';
    mobileTrigger.textContent = 'How to choose your flow pad size →';
    mobileMenu.appendChild(mobileTrigger);
  }
  const triggers = document.querySelectorAll('[data-flow-guide-open]');
  if (!triggers.length || document.querySelector('[data-flow-guide]')) return;

  const dialog = document.createElement('dialog');
  dialog.className = 'flow-guide';
  dialog.setAttribute('data-flow-guide', '');
  dialog.setAttribute('aria-labelledby', 'flow-guide-title');
  dialog.innerHTML = `
    <div class="flow-guide__top"><a class="flow-guide__logo" href="index.html" aria-label="Way2Care home"><img src="assets/logos/way2care-logo.png" alt="Way2Care"></a><button class="flow-guide__close" type="button" data-guide-close aria-label="Close size guide">×</button></div>
    <div class="flow-guide__progress" aria-label="Guide progress"><span class="is-current" data-step-mark="1">1 <b>Your flow</b></span><i></i><span data-step-mark="2">2 <b>Time of use</b></span><i></i><span data-step-mark="3">3 <b>Your match</b></span></div>
    <section class="flow-guide__step is-active" data-guide-step="1"><p class="flow-guide__eyebrow">Step 1 · Current cycle</p><h2 id="flow-guide-title">How would you describe your flow these days?</h2><p class="flow-guide__sub">Pick what feels right for your current cycle.</p><div class="flow-guide__choices" role="group" aria-label="Choose flow"><button type="button" data-guide-choice="flow" data-value="light"><span aria-hidden="true">💧</span><strong>Light</strong><small>Spotting to light flow</small></button><button type="button" data-guide-choice="flow" data-value="medium"><span aria-hidden="true">💧💧</span><strong>Medium</strong><small>Steady, regular days</small></button><button type="button" data-guide-choice="flow" data-value="heavy"><span aria-hidden="true">💧💧💧</span><strong>Heavy</strong><small>Full, heavier days</small></button></div><div class="flow-guide__actions"><span></span><button type="button" class="flow-guide__next" data-guide-next disabled>Next <span>→</span></button></div></section>
    <section class="flow-guide__step" data-guide-step="2"><p class="flow-guide__eyebrow">Step 2 · Your routine</p><h2>When do you need this protection?</h2><p class="flow-guide__sub">Day and night can call for different support.</p><div class="flow-guide__choices flow-guide__choices--two" role="group" aria-label="Choose time of use"><button type="button" data-guide-choice="time" data-value="day"><span aria-hidden="true">☀️</span><strong>During the day</strong><small>Everyday comfort and freshness</small></button><button type="button" data-guide-choice="time" data-value="night"><span aria-hidden="true">🌙</span><strong>Overnight</strong><small>Extra coverage and leak protection</small></button></div><div class="flow-guide__actions"><button type="button" class="flow-guide__back" data-guide-back>← Back</button><button type="button" class="flow-guide__next" data-guide-next disabled>Next <span>→</span></button></div></section>
    <section class="flow-guide__step" data-guide-step="3"><p class="flow-guide__eyebrow">Your Way2Care match</p><h2 data-guide-result-title>Your care match</h2><p class="flow-guide__sub" data-guide-result-copy></p><div class="flow-guide__results" data-guide-results></div><p class="flow-guide__disclaimer">A simple starting point, not medical advice. Flow and comfort vary from person to person.</p><div class="flow-guide__actions"><button type="button" class="flow-guide__back" data-guide-back>← Change answers</button><a class="flow-guide__explore" href="shop-all.html">Explore all products <span>→</span></a></div></section>`;
  document.body.appendChild(dialog);

  const steps = Array.from(dialog.querySelectorAll('[data-guide-step]'));
  const marks = Array.from(dialog.querySelectorAll('[data-step-mark]'));
  const selections = { flow: '', time: '' };
  const products = {
    ultraXL: { name: 'XL Herbal Ultra-thin Pads', detail: '280 mm · Light to low flow', category: 'ultra-thin', slug: 'xl-ultra-thin-herbal-pads', image: 'assets/images/product-sanitary-napkin-4.png' },
    ultraXXL: { name: 'XXL Herbal Ultra-thin Pads', detail: '320 mm · Low to medium flow', category: 'ultra-thin', slug: 'xxl-ultra-thin-herbal-pads', image: 'assets/images/product-sanitary-napkin-5.png' },
    ultraXXXL: { name: 'XXXL Herbal Ultra-thin Pads', detail: '360 mm · Medium to regular flow', category: 'ultra-thin', slug: 'xxxl-ultra-thin-herbal-pads', image: 'assets/images/product-sanitary-napkin-6.png' },
    premiumXL: { name: 'XL Herbal Premium Pads', detail: '280 mm · Regular to high flow', category: 'premium', slug: 'xl-premium-herbal-pads', image: 'assets/images/product-sanitary-napkin-3.png' },
    premiumXXL: { name: 'XXL Herbal Premium Pads', detail: '320 mm · High to heavy flow', category: 'premium', slug: 'xxl-herbal-pads', image: 'assets/images/product-sanitary-napkin-1.png' },
    premiumXXXL: { name: 'XXXL Herbal Premium Pads', detail: '360 mm · Heavy flow and overnight', category: 'premium', slug: 'xxxl-herbal-pads', image: 'assets/images/product-sanitary-napkin-2.png' },
    cottonXL: { name: 'XL Cotton Pads', detail: '280 mm · Light flow', category: 'cotton', contact: 'cotton-pads', image: 'assets/images/aqua-fabric-pad-cross-section.png' },
    cottonXXL: { name: 'XXL Cotton Pads', detail: '320 mm · Medium flow', category: 'cotton', contact: 'cotton-pads', image: 'assets/images/aqua-fabric-pad-cross-section.png' },
    cottonXXXL: { name: 'XXXL Cotton Pads', detail: '360 mm · Heavy flow', category: 'cotton', contact: 'cotton-pads', image: 'assets/images/aqua-fabric-pad-cross-section.png' },
    closing: { name: 'Closing Day Pads', detail: 'XL 280 mm · Ultra-thin protection', category: 'closing-day', slug: 'closing-day-herbal-pads', image: 'assets/images/product-sanitary-napkin-8.png' },
    neem: { name: 'Neem Therapy Pads', detail: 'XL 280 mm · Ultra-thin herbal pad', category: 'neem', contact: 'neem-therapy-pads', image: 'assets/images/product-sanitary-napkin-3.png' },
    liners: { name: 'Herbal Panty Liners', detail: '180 mm · Light daily freshness', category: 'panty-liners', slug: 'herbal-panty-liners', image: 'assets/images/product-panty-liners.png' },
    sample: { name: 'Herbal Sanitary Pad Sample Pack', detail: 'A mix of four pad sizes plus two panty liners', category: 'sample-pack', slug: 'sanitary-pad-sample-pack', image: 'assets/images/product-sanitary-napkin-7.png' }
  };

  const recommendationMap = {
    'light-day': ['ultraXL', 'cottonXL', 'closing', 'neem', 'liners'],
    'light-night': ['premiumXL', 'ultraXXL', 'cottonXXL'],
    'medium-day': ['ultraXXL', 'premiumXL', 'cottonXXL', 'liners'],
    'medium-night': ['premiumXXL', 'ultraXXXL', 'closing'],
    'heavy-day': ['premiumXXL', 'premiumXXXL', 'cottonXXXL'],
    'heavy-night': ['premiumXXXL', 'premiumXXL', 'sample']
  };

  const goToStep = (stepNo) => {
    steps.forEach((step) => step.classList.toggle('is-active', Number(step.dataset.guideStep) === stepNo));
    marks.forEach((mark) => {
      const n = Number(mark.dataset.stepMark);
      mark.classList.toggle('is-current', n === stepNo);
      mark.classList.toggle('is-complete', n < stepNo);
    });
  };

  const renderResults = () => {
    const key = `${selections.flow}-${selections.time}`;
    const chosen = (recommendationMap[key] || []).slice(0, 3).map((id) => products[id]).filter(Boolean);
    const lead = chosen[0];
    dialog.querySelector('[data-guide-result-title]').textContent = `${selections.flow[0].toUpperCase()}${selections.flow.slice(1)} flow · ${selections.time === 'night' ? 'overnight' : 'daytime'} care`;
    dialog.querySelector('[data-guide-result-copy]').textContent = `Based on your answers, start with ${lead.name}. Here are a few related options from the 11-product collection.`;
    const results = dialog.querySelector('[data-guide-results]');
    let allProductsLink = dialog.querySelector('[data-guide-all-products]');
    if (!allProductsLink) {
      allProductsLink = document.createElement('a');
      allProductsLink.className = 'flow-guide__all-products';
      allProductsLink.href = 'shop-all.html';
      allProductsLink.dataset.guideAllProducts = '';
      allProductsLink.textContent = 'View all products →';
      results.before(allProductsLink);
    }
    results.innerHTML = chosen.map((product, index) => {
      const href = product.slug ? `product-detail.html?product=${product.slug}` : `contact.html?product=${product.contact}`;
      return `<article class="flow-guide__product ${index === 0 ? 'is-recommended' : ''}"><img class="flow-guide__product-image" src="${product.image}" alt="${product.name}" loading="lazy"><div class="flow-guide__product-copy"><span class="flow-guide__product-tag">${index === 0 ? 'Recommended size' : 'Also explore'}</span><h3>${product.name}</h3><p>${product.detail}</p><a href="${href}">${product.slug ? 'View details' : 'Ask about availability'} <span>→</span></a></div></article>`;
    }).join('');
  };

  triggers.forEach((trigger) => trigger.addEventListener('click', (event) => {
    event.preventDefault();
    dialog.showModal();
    goToStep(1);
  }));
  dialog.querySelector('[data-guide-close]').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    selections.flow = ''; selections.time = '';
    dialog.querySelectorAll('[data-guide-choice]').forEach((button) => button.classList.remove('is-selected'));
    dialog.querySelectorAll('[data-guide-next]').forEach((button) => { button.disabled = true; });
    goToStep(1);
  });
  dialog.querySelectorAll('[data-guide-choice]').forEach((button) => button.addEventListener('click', () => {
    const group = button.dataset.guideChoice;
    selections[group] = button.dataset.value;
    dialog.querySelectorAll(`[data-guide-choice="${group}"]`).forEach((item) => item.classList.toggle('is-selected', item === button));
    const next = button.closest('[data-guide-step]').querySelector('[data-guide-next]');
    if (next) next.disabled = false;
  }));
  dialog.querySelectorAll('[data-guide-next]').forEach((button) => button.addEventListener('click', () => {
    const step = Number(button.closest('[data-guide-step]').dataset.guideStep);
    if (step === 1 && selections.flow) goToStep(2);
    else if (step === 2 && selections.time) { renderResults(); goToStep(3); }
  }));
  dialog.querySelectorAll('[data-guide-back]').forEach((button) => button.addEventListener('click', () => goToStep(Number(button.closest('[data-guide-step]').dataset.guideStep) - 1)));
}

/* ---- Products Testimonials Carousel ---- */
function initTestimonialCarousel() {
  document.querySelectorAll('[data-testimonial-carousel]').forEach((carousel) => {
    const viewport = carousel.querySelector('[data-carousel-viewport]');
    const track = carousel.querySelector('[data-carousel-track]');
    const slides = Array.from(track?.children || []);
    const previous = carousel.querySelector('[data-carousel-prev]');
    const next = carousel.querySelector('[data-carousel-next]');
    const status = carousel.querySelector('[data-carousel-status]');
    if (!viewport || !track || !slides.length || !previous || !next) return;

    let current = 0;
    let touchStartX = 0;
    let resizeFrame = 0;

    const visibleCount = () => {
      if (window.innerWidth <= 620) return 1;
      if (window.innerWidth <= 900) return 2;
      return 3;
    };

    const update = (announce = true) => {
      const visible = visibleCount();
      const maximum = Math.max(0, slides.length - visible);
      current = Math.min(Math.max(current, 0), maximum);

      const styles = window.getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap) || 0;
      const cardWidth = (viewport.clientWidth - gap * (visible - 1)) / visible;
      track.style.transform = `translate3d(${-current * (cardWidth + gap)}px, 0, 0)`;

      slides.forEach((slide, index) => {
        const isVisible = index >= current && index < current + visible;
        slide.setAttribute('aria-hidden', String(!isVisible));
      });

      if (status) {
        const end = Math.min(current + visible, slides.length);
        status.textContent = `${current + 1}–${end} / ${slides.length}`;
        if (!announce) status.setAttribute('aria-live', 'off');
        else status.setAttribute('aria-live', 'polite');
      }
    };

    const move = (direction) => {
      const maximum = Math.max(0, slides.length - visibleCount());
      if (direction > 0) current = current >= maximum ? 0 : current + 1;
      else current = current <= 0 ? maximum : current - 1;
      update();
    };

    previous.addEventListener('click', () => move(-1));
    next.addEventListener('click', () => move(1));

    viewport.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        move(-1);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        move(1);
      }
    });

    viewport.addEventListener('touchstart', (event) => {
      touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    viewport.addEventListener('touchend', (event) => {
      const distance = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(distance) > 45) move(distance < 0 ? 1 : -1);
    }, { passive: true });

    window.addEventListener('resize', () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => update(false));
    });

    update(false);
  });
}

/* ---- Init All ---- */
document.addEventListener('DOMContentLoaded', () => {
  initCatalogueFilters();
  initFlowSizeGuide();
  initAnnouncement();
  initHeader();
  initMobileMenu();
  initScrollProgress();
  initProductDetail();
  initProductCardImageSwaps();
  initPdpMotion();
  initReveal();
  initActiveNav();
  initFloatingWhatsApp();
  initQtyControls();
  initCart();
  initHomeEnquiryForm();
  initContactForm();
  initTestimonialCarousel();
});
