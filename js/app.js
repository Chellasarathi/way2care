/* WAY2CARE MAIN JAVASCRIPT */
'use strict';

const WAY2CARE_WHATSAPP_NUMBER = '917598651801';
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
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    header && header.classList.toggle('is-menu-open', isOpen);
    document.body.classList.toggle('is-menu-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
  // Close on link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('is-open');
      header && header.classList.remove('is-menu-open');
      document.body.classList.remove('is-menu-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
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

/* ---- Reusable Product Detail Page ---- */
const WAY2CARE_PRODUCTS = {
  'xxl-herbal-pads': {
    name: 'XXL Premium Herbal Sanitary Pads', category: 'Period care', price: 280,
    description: 'Soft, absorbent everyday protection created for confident movement.',
    hoverImage: 'assets/images/xxl_premium_Product_detail_2.png',
    images: ['assets/images/produst__sanitary_napkin_1.png', 'assets/images/Herbal Sanitary Napkin Still Life (1).png', 'assets/images/Warm Minimalist Period Care Moment.png'],
    storyImage: 'assets/images/Warm Minimalist Period Care Moment.png',
    benefits: [['Comfort-led coverage', 'A practical format for everyday period-care routines.'], ['Made for movement', 'Designed around busy days and changing schedules.'], ['Clear care choices', 'Simple information and direct support before ordering.'], ['Everyday confidence', 'Thoughtful coverage that fits naturally into your routine.']],
    facts: [['Format', 'XXL · 320 mm'], ['Pack', '6 pads'], ['Price', '₹280']],
    details: [['Product description', 'A comfort-led XXL sanitary-pad format for everyday period-care routines.'], ['How to use', 'Use according to your personal routine and replace as needed. Follow the directions provided with the product pack.'], ['Ordering information', 'Add the product to your cart, enter your delivery details and send the generated message in WhatsApp. Availability is confirmed by the Way2Care team.']]
  },
  'xxxl-herbal-pads': {
    name: 'XXXL Premium Herbal Sanitary Pads', category: 'Period care', price: 300,
    description: 'Extra-long protection for heavier-flow days and restful nights.',
    hoverImage: 'assets/images/xxxl_premium_herbal_sanitary_Product_detail_2.png',
    images: ['assets/images/produst__sanitary_napkin_2.png', 'assets/images/Fresh Natural Care Essentials.png', 'assets/images/Elegant Pink Period Care Product Display.png'],
    storyImage: 'assets/images/Elegant Pink Period Care Product Display.png',
    benefits: [['Extra coverage', 'A longer format for routines that call for more coverage.'], ['Day-to-night flexibility', 'Made to support changing period-care moments.'], ['Comfort-focused', 'A thoughtful format designed around everyday ease.'], ['Direct care support', 'Ask questions before ordering through WhatsApp.']],
    facts: [['Format', 'XXXL · 320 mm'], ['Pack', '6 pads'], ['Price', '₹300']],
    details: [['Product description', 'An extra-long XXXL sanitary-pad format for heavier-flow days and night-time routines.'], ['How to use', 'Use according to your personal routine and replace as needed. Follow the directions provided with the product pack.'], ['Ordering information', 'Your WhatsApp order is submitted only after you review the prefilled message and press Send.']]
  },
  'herbal-panty-liners': {
    name: 'Herbal Panty Liners', category: 'Daily care', price: 200,
    description: 'Flexible, fresh-feeling support for everyday routines and light days.',
    hoverImage: 'assets/images/panty_liners_Product_detail_2.png',
    images: ['assets/images/Product_panty_liners.png', 'assets/images/Way2Care Herbal Panty Liners Spa Scene.png', 'assets/images/Sunlit Lavender Steps Lifestyle Moment.png'],
    storyImage: 'assets/images/Pastel Wellness Product Showcase.png',
    benefits: [['Light daily support', 'A compact format for lighter everyday routines.'], ['Routine friendly', 'Easy to include in changing schedules.'], ['Thoughtful comfort', 'Created for flexible, everyday use.'], ['Simple ordering', 'Save the selection and continue through WhatsApp.']],
    facts: [['Format', 'Panty liner'], ['Use', 'Daily care'], ['Price', '₹200']],
    details: [['Product description', 'A light, flexible liner format for everyday support and lighter days.'], ['How to use', 'Follow the use and replacement directions supplied with the product pack.'], ['Ordering information', 'Final availability is confirmed by the Way2Care team through WhatsApp.']]
  },
  'xl-premium-herbal-pads': {
    name: 'XL Premium Herbal Sanitary Pads', category: 'Period care', price: 268,
    description: 'Premium herbal protection for lighter-flow days and reliable everyday comfort.',
    hoverImage: 'assets/images/xl_premium_herbal_sanitary_Product_detail_2.png',
    images: ['assets/images/produst__sanitary_napkin_3.png'],
    storyImage: 'assets/images/Warm Minimalist Period Care Moment.png',
    benefits: [['280 mm coverage', 'An XL format for lighter-flow and everyday period-care routines.'], ['Premium format', 'A comfort-led pad format for changing schedules.'], ['Herbal range', 'Part of the Way2Care herbal sanitary-pad collection.'], ['Easy ordering', 'Save your selection and review it before sending on WhatsApp.']],
    facts: [['Format', 'XL · 280 mm'], ['Pack', '6 pads'], ['Price', '₹268']],
    details: [['Product description', 'An XL premium herbal sanitary-pad format with 280 mm coverage and six pads per pack.'], ['How to use', 'Use according to your personal routine and replace as needed. Follow the directions supplied with the product pack.'], ['Ordering information', 'Add the product to your cart, enter delivery details and press Send in WhatsApp to submit the order.']]
  },
  'xl-ultra-thin-herbal-pads': {
    name: 'XL Ultra Thin Herbal Sanitary Pads', category: 'Period care', price: 220,
    description: 'Slim 280 mm protection for light-to-medium flow with a comfortable dry feel.',
    hoverImage: 'assets/images/xxl_ultra_thin_Product_detail_.png',
    images: ['assets/images/produst__sanitary_napkin_4.png'],
    storyImage: 'assets/images/Warm Minimalist Period Care Moment.png',
    benefits: [['Ultra-thin profile', 'A slimmer pad format for an easy everyday routine.'], ['280 mm coverage', 'An XL format for lighter and medium-flow moments.'], ['Herbal range', 'Part of the Way2Care herbal sanitary-pad collection.'], ['Direct support', 'Ask the care team any product questions before ordering.']],
    facts: [['Format', 'XL ultra thin · 280 mm'], ['Pack', '6 pads'], ['Price', '₹220']],
    details: [['Product description', 'An XL ultra-thin herbal sanitary-pad format with 280 mm coverage and six pads per pack.'], ['How to use', 'Use according to your personal routine and replace as needed. Follow the directions supplied with the product pack.'], ['Ordering information', 'Your order is submitted only after you review the message and press Send in WhatsApp.']]
  },
  'xxl-ultra-thin-herbal-pads': {
    name: 'XXL Ultra Thin Herbal Sanitary Pads', category: 'Period care', price: 240,
    description: 'Ultra-thin 320 mm coverage for confident day and overnight comfort.',
    hoverImage: 'assets/images/xxl_ultra_thin_Product_detail_2.png',
    images: ['assets/images/produst__sanitary_napkin_5.png'],
    storyImage: 'assets/images/Warm Minimalist Period Care Moment.png',
    benefits: [['Ultra-thin profile', 'A slimmer format designed around everyday ease.'], ['320 mm coverage', 'An XXL format for day and overnight routines.'], ['Herbal range', 'Part of the Way2Care herbal sanitary-pad collection.'], ['Saved cart', 'Combine it with other products in one WhatsApp order.']],
    facts: [['Format', 'XXL ultra thin · 320 mm'], ['Pack', '6 pads'], ['Price', '₹240']],
    details: [['Product description', 'An XXL ultra-thin herbal sanitary-pad format with 320 mm coverage and six pads per pack.'], ['How to use', 'Use according to your personal routine and replace as needed. Follow the directions supplied with the product pack.'], ['Ordering information', 'Add it to the saved cart and complete the order details before opening WhatsApp.']]
  },
  'xxxl-ultra-thin-herbal-pads': {
    name: 'XXXL Ultra Thin Herbal Sanitary Pads', category: 'Period care', price: 260,
    description: 'Extra-long ultra-thin protection for heavier flow and night-time routines.',
    hoverImage: 'assets/images/xxxl_ultra_thin_Product_detail_2.png',
    images: ['assets/images/produst__sanitary_napkin_6.png'],
    storyImage: 'assets/images/Warm Minimalist Period Care Moment.png',
    benefits: [['Extra-long format', 'Extended coverage for changing flow and night-time routines.'], ['Ultra-thin profile', 'A slimmer format designed around everyday ease.'], ['Herbal range', 'Part of the Way2Care herbal sanitary-pad collection.'], ['Clear confirmation', 'Product availability is confirmed by the team on WhatsApp.']],
    facts: [['Format', 'XXXL ultra thin · 320 mm'], ['Pack', '6 pads'], ['Price', '₹260']],
    details: [['Product description', 'An XXXL ultra-thin herbal sanitary-pad format with 320 mm coverage and six pads per pack.'], ['How to use', 'Use according to your personal routine and replace as needed. Follow the directions supplied with the product pack.'], ['Ordering information', 'Review the prefilled WhatsApp message and press Send to submit your order.']]
  },
  'sanitary-pad-sample-pack': {
    name: 'Herbal Sanitary Pad Sample Pack', category: 'Period care', price: 200,
    description: 'A convenient sample pack for exploring Way2Care herbal sanitary pads.',
    hoverImage: 'assets/images/sample_pack_Product_detail_2.png',
    images: ['assets/images/produst__sanitary_napkin_7.png'],
    storyImage: 'assets/images/Warm Minimalist Period Care Moment.png',
    benefits: [['Sample format', 'A simple way to explore the Way2Care sanitary-pad range.'], ['Herbal range', 'Part of the current herbal period-care collection.'], ['Routine friendly', 'A practical introduction to the available formats.'], ['WhatsApp support', 'Confirm the current sample-pack contents before ordering.']],
    facts: [['Format', 'Sample pack'], ['Use', 'Period care'], ['Price', '₹200']],
    details: [['Product description', 'A sample-pack format for exploring Way2Care herbal sanitary pads.'], ['Pack information', 'The current sample-pack contents and availability are confirmed by the Way2Care team.'], ['Ordering information', 'Add the sample pack to your cart and press Send in WhatsApp after reviewing the order message.']]
  },
  'closing-day-herbal-pads': {
    name: 'Closing Day Herbal Sanitary Pads', category: 'Period care', price: 300,
    description: 'Light, comfortable protection designed for the closing days of your cycle.',
    hoverImage: 'assets/images/closing_day_pad_Product_detail_2.png',
    images: ['assets/images/produst__sanitary_napkin_8.png'],
    storyImage: 'assets/images/Warm Minimalist Period Care Moment.png',
    benefits: [['Closing-day care', 'A format designed around lighter-flow days near the end of a cycle.'], ['Comfort-led', 'A practical addition to a changing period-care routine.'], ['Herbal range', 'Part of the Way2Care herbal sanitary-pad collection.'], ['Simple ordering', 'Save it with other products and order through WhatsApp.']],
    facts: [['Format', 'Closing day pad'], ['Use', 'Light-flow period care'], ['Price', '₹300']],
    details: [['Product description', 'A herbal sanitary-pad format designed for lighter-flow closing days.'], ['How to use', 'Use according to your personal routine and replace as needed. Follow the directions supplied with the product pack.'], ['Ordering information', 'Review your delivery and product details, then press Send in WhatsApp to submit the order.']]
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
  const galleryImages = [...new Set([
    product.images[0],
    product.hoverImage,
    ...product.images.slice(1)
  ].filter(Boolean))];
  let activeImageIndex = 0;
  const chooseImage = (src, index) => {
    activeImageIndex = index;
    mainImage.classList.add('is-changing');
    setTimeout(() => { mainImage.src = src; mainImage.alt = `${product.name} product view ${index + 1}`; mainImage.classList.remove('is-changing'); }, 120);
    thumbRoot.querySelectorAll('button').forEach((button, buttonIndex) => button.classList.toggle('is-active', buttonIndex === index));
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
  page.querySelector('[data-pdp-story-image]').src = product.storyImage;
  page.querySelector('[data-pdp-story-image]').alt = `${product.name} in a Way2Care setting`;
  page.querySelector('[data-pdp-facts]').innerHTML = product.facts.map((fact) => `<div><small>${fact[0]}</small><strong>${fact[1]}</strong></div>`).join('');
  page.querySelector('[data-pdp-accordions]').innerHTML = product.details.map((detail, index) => `<details ${index === 0 ? 'open' : ''}><summary>${detail[0]}<span>+</span></summary><div><p>${detail[1]}</p></div></details>`).join('');

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

/* ---- Product Gallery ---- */
function initProductGallery() {
  const thumbs = document.querySelectorAll('.product-gallery__thumb');
  const mainImg = document.querySelector('.product-gallery__main-img');
  if (!thumbs.length || !mainImg) return;
  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const newSrc = thumb.querySelector('img')?.src;
      if (newSrc) mainImg.src = newSrc;
      thumbs.forEach(t => t.classList.remove('is-active'));
      thumb.classList.add('is-active');
    });
  });
}

/* ---- Product Variants ---- */
function initVariants() {
  document.querySelectorAll('.product-info__variants').forEach(group => {
    const btns = group.querySelectorAll('.product-info__variant');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
      });
    });
  });
  document.querySelectorAll('.product-card__variant-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const card = btn.closest('.product-card');
      card && card.querySelectorAll('.product-card__variant-btn').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      e.preventDefault();
    });
  });
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
    </aside>`;
  document.body.appendChild(cartRoot);

  const itemsRoot = cartRoot.querySelector('[data-cart-items]');
  const emptyRoot = cartRoot.querySelector('[data-cart-empty]');
  const summaryRoot = cartRoot.querySelector('[data-cart-summary]');
  const totalRoot = cartRoot.querySelector('[data-cart-total]');
  const pricingNote = cartRoot.querySelector('[data-cart-pricing-note]');
  const cartView = cartRoot.querySelector('[data-cart-view]');
  const orderForm = cartRoot.querySelector('[data-order-form]');
  const orderStatus = cartRoot.querySelector('[data-order-status]');
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

  cartRoot.querySelector('[data-order-cancel]').addEventListener('click', () => {
    if (!window.confirm('Remove all products and cancel this order?')) return;
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

/* ---- Product Tabs ---- */
function initProductTabs() {
  document.querySelectorAll('.tabs-nav').forEach(nav => {
    const panel = nav.closest('.product-tabs') || nav.parentElement;
    const btns = nav.querySelectorAll('.tab-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const targetId = btn.getAttribute('data-tab');
        panel && panel.querySelectorAll('.tab-panel').forEach(p => {
          p.classList.toggle('is-active', p.id === targetId);
        });
      });
    });
  });
}

/* ---- FAQ Accordion ---- */
function initFAQ() {
  document.querySelectorAll('.faq-item__question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('is-open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('is-open'));
      if (!isOpen) item.classList.add('is-open');
    });
  });
}

/* ---- Filter Toggle ---- */
function initFilters() {
  document.querySelectorAll('.filter-option').forEach(opt => {
    opt.addEventListener('click', () => {
      opt.classList.toggle('is-checked');
      filterProducts();
    });
  });
  document.querySelectorAll('.category-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      filterProductsByCategory(tab.dataset.category);
    });
  });
  const sortSelect = document.querySelector('.shop-sort');
  if (sortSelect) sortSelect.addEventListener('change', () => filterProducts());
}

function filterProducts() {
  // Frontend filter implementation
  const cards = document.querySelectorAll('.product-card');
  const checked = [...document.querySelectorAll('.filter-option.is-checked .filter-option__label')].map(l => l.textContent.trim().toLowerCase());
  const activeTab = document.querySelector('.category-tab.is-active');
  const activeCat = activeTab ? activeTab.dataset.category : 'all';
  const sortVal = document.querySelector('.shop-sort')?.value || 'featured';

  let visible = [...cards];
  if (activeCat && activeCat !== 'all') {
    visible = visible.filter(c => (c.dataset.category || '').toLowerCase() === activeCat.toLowerCase());
  }
  cards.forEach(c => c.style.display = 'none');
  visible.forEach(c => c.style.display = '');

  const countEl = document.querySelector('.shop-toolbar__count');
  if (countEl) countEl.textContent = visible.length + ' product' + (visible.length !== 1 ? 's' : '');
}

function filterProductsByCategory(cat) {
  filterProducts();
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

/* ---- Newsletter Form ---- */
function initNewsletterForm() {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-form__input');
      const btn = form.querySelector('.btn');
      if (!input || !input.value.trim()) return;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
        input.style.borderColor = 'var(--color-accent-pink)';
        return;
      }
      if (btn) { btn.textContent = 'Subscribed! ✓'; btn.style.background = 'var(--color-brand-teal)'; }
      input.value = '';
      // NOTE: Connect to email service here
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

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const selected = button.dataset.filter || 'all';
      let visible = 0;

      buttons.forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });

      cards.forEach((card) => {
        const show = selected === 'all' || card.dataset.category === selected;
        card.hidden = !show;
        if (show) visible += 1;
      });

      if (count) count.textContent = String(visible);
      if (empty) empty.hidden = visible !== 0;
    });
  });
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

/* ---- Wishlist Buttons ---- */
function initWishlist() {
  document.querySelectorAll('.product-card__wishlist').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const isLiked = btn.classList.toggle('is-liked');
      btn.setAttribute('aria-label', isLiked ? 'Remove from wishlist' : 'Add to wishlist');
      btn.innerHTML = isLiked
        ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.18L12 21z"/></svg>'
        : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
    });
  });
}

/* ---- Init All ---- */
document.addEventListener('DOMContentLoaded', () => {
  initAnnouncement();
  initHeader();
  initMobileMenu();
  initScrollProgress();
  initProductDetail();
  initProductCardImageSwaps();
  initPdpMotion();
  initReveal();
  initActiveNav();
  initProductGallery();
  initVariants();
  initQtyControls();
  initCart();
  initProductTabs();
  initFAQ();
  initFilters();
  initContactForm();
  initNewsletterForm();
  initCatalogueFilters();
  initTestimonialCarousel();
  initWishlist();
});
