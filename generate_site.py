import os

DEST = r"e:\way to care\way2care_main"
PAGES_DIR = os.path.join(DEST, "pages")
os.makedirs(PAGES_DIR, exist_ok=True)

def render_header(title, depth=0, active_nav="home"):
    rel = "" if depth == 0 else "../"
    navs = [
        ("home", f"{rel}index.html", "Home"),
        ("shop", f"{rel}shop.html", "Shop All"),
        ("period", f"{rel}shop.html?cat=period", "Period Care"),
        ("daily", f"{rel}shop.html?cat=daily", "Daily Care"),
        ("about", f"{rel}about.html", "About Us"),
        ("contact", f"{rel}contact.html", "Contact Us"),
    ]
    nav_items = ""
    for k, href, label in navs:
        active_cls = " is-active" if k == active_nav else ""
        nav_items += f'          <li><a class="site-nav__link{active_cls}" href="{href}">{label}</a></li>\n'

    mobile_items = ""
    for k, href, label in navs:
        mobile_items += f'        <li><a class="mobile-menu__link" href="{href}">{label}</a></li>\n'

    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Way2Care - Safe, comfortable, confident everyday feminine care and personal hygiene." />
  <title>{title} | Way2Care</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="{rel}css/variables.css" />
  <link rel="stylesheet" href="{rel}css/main.css" />
</head>
<body>
  <div class="scroll-progress" aria-hidden="true"><span class="scroll-progress__bar"></span></div>

  <!-- Announcement Bar -->
  <aside class="announcement-bar" aria-label="Announcement">
    <div class="announcement-bar__text">
      Complimentary Shipping on all orders above &#8377;499 &bull; Use code <span class="announcement-bar__highlight">PURECARE</span> for 15% off
    </div>
    <button type="button" class="announcement-bar__close" aria-label="Dismiss banner">&times;</button>
  </aside>

  <!-- Site Header -->
  <header class="site-header" data-header>
    <div class="container site-header__inner">
      <a class="site-logo" href="{rel}index.html" aria-label="Way2Care home">
        <span>Way</span><span style="color:var(--color-accent-pink);">2</span><span class="site-logo__care">Care</span>
      </a>

      <nav class="site-nav" aria-label="Primary navigation">
        <ul class="site-nav__list">
{nav_items}        </ul>
      </nav>

      <div class="site-header__actions">
        <a href="{rel}cart.html" class="site-header__icon-btn" aria-label="View Shopping Cart">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          <span class="cart-count">2</span>
        </a>
        <a class="btn btn--primary site-header__cta" href="{rel}shop.html">Shop Now</a>
        <button type="button" class="site-header__menu-toggle" aria-expanded="false" aria-controls="mobile-menu" aria-label="Toggle navigation menu" data-menu-toggle>
          <span class="site-header__menu-bar"></span>
          <span class="site-header__menu-bar"></span>
          <span class="site-header__menu-bar"></span>
        </button>
      </div>
    </div>

    <!-- Mobile Nav Drawer -->
    <div class="mobile-menu" id="mobile-menu" data-mobile-menu aria-hidden="true">
      <ul class="mobile-menu__list">
{mobile_items}        <li><a class="mobile-menu__link" href="{rel}faq.html">Help &amp; FAQs</a></li>
        <li><a class="mobile-menu__link" href="{rel}cart.html">Cart (2 items)</a></li>
      </ul>
      <a class="btn btn--primary mobile-menu__cta" href="{rel}shop.html">Explore Products</a>
    </div>
  </header>
"""

def render_footer(depth=0):
    rel = "" if depth == 0 else "../"
    return f"""
  <!-- Site Footer -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <a class="footer-brand__logo" href="{rel}index.html">
            Way<span style="color:var(--color-accent-pink);">2</span><span>Care</span>
          </a>
          <p class="footer-brand__tagline">
            Thoughtfully formulated feminine hygiene &amp; intimate wellness. Pure organic materials, dermatologically approved, and crafted for real everyday comfort.
          </p>
          <div class="footer-social">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="footer-social__link" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="footer-social__link" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="footer-social__link" aria-label="Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="footer-social__link" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>

        <div class="footer-col">
          <h4 class="footer-col__heading">Care Essentials</h4>
          <ul class="footer-col__list">
            <li><a class="footer-col__link" href="{rel}shop.html?cat=period">Organic Sanitary Pads</a></li>
            <li><a class="footer-col__link" href="{rel}shop.html?cat=period">Overnight Maxi Pads</a></li>
            <li><a class="footer-col__link" href="{rel}shop.html?cat=daily">Natural Intimate Wash</a></li>
            <li><a class="footer-col__link" href="{rel}shop.html?cat=daily">Breathable Panty Liners</a></li>
            <li><a class="footer-col__link" href="{rel}shop.html?cat=ritual">Way2Care Ritual Kits</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 class="footer-col__heading">About &amp; Trust</h4>
          <ul class="footer-col__list">
            <li><a class="footer-col__link" href="{rel}about.html">Our Story &amp; Values</a></li>
            <li><a class="footer-col__link" href="{rel}about.html#ingredients">Pure Ingredients Standard</a></li>
            <li><a class="footer-col__link" href="{rel}about.html#sustainability">Sustainability Pledge</a></li>
            <li><a class="footer-col__link" href="{rel}contact.html">Contact Our Care Team</a></li>
            <li><a class="footer-col__link" href="{rel}faq.html">Help Center &amp; FAQs</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4 class="footer-col__heading">Care Club Newsletter</h4>
          <p style="font-size:0.875rem;margin-bottom:1rem;color:rgba(255,255,255,0.65);">
            Receive cycle wellness guides, science-backed care tips, and exclusive subscriber offers.
          </p>
          <form class="newsletter-form" onsubmit="event.preventDefault(); alert('Thank you for subscribing to Way2Care!'); this.reset();">
            <input type="email" class="newsletter-form__input" placeholder="Your email address" required aria-label="Email address for newsletter" />
            <button type="submit" class="btn btn--primary" style="padding:0.6rem 1.25rem;font-size:0.8125rem;">Join</button>
          </form>
          <div style="margin-top:1.25rem;display:flex;align-items:center;gap:0.5rem;font-size:0.75rem;color:rgba(255,255,255,0.45);">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-teal)" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            100% Privacy Protected &bull; No Spam Ever
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2026 Way2Care Personal Hygiene Pvt. Ltd. All rights reserved.</p>
        <div class="footer-bottom__links">
          <a class="footer-bottom__link" href="{rel}policy.html#privacy">Privacy Policy</a>
          <a class="footer-bottom__link" href="{rel}policy.html#terms">Terms of Service</a>
          <a class="footer-bottom__link" href="{rel}policy.html#shipping">Shipping &amp; Delivery</a>
          <a class="footer-bottom__link" href="{rel}policy.html#returns">Returns &amp; Refunds</a>
        </div>
      </div>
    </div>
  </footer>

  <script src="{rel}js/app.js"></script>
</body>
</html>
"""

# ========================================================
# 1. HOMEPAGE (index.html)
# ========================================================
def generate_index(depth=0):
    rel = "" if depth == 0 else "../"
    header = render_header("Care for Every You", depth, "home")
    footer = render_footer(depth)
    
    body = f"""
  <main id="main-content">
    <!-- SECTION 1: HERO BANNER -->
    <section class="section section--hero" aria-labelledby="hero-title">
      <div class="container hero__grid">
        <div class="hero__content" data-reveal="fade-up">
          <span class="hero__eyebrow">Pure Feminine Care &bull; Zero Compromise</span>
          <h1 class="hero__title" id="hero-title">
            <span class="hero__title-line">Care for</span>
            <span class="hero__title-line hero__title-italic">Every You.</span>
          </h1>
          <p class="hero__subtitle">
            Thoughtfully formulated for your comfort, confidence, and everyday wellbeing. Pure certified organic cotton, pH balanced botanicals, and zero harsh chemicals.
          </p>
          <div class="hero__cta-group">
            <a href="{rel}shop.html" class="btn btn--primary">Shop Now</a>
            <a href="{rel}about.html" class="btn btn--secondary" style="border:1.5px solid var(--color-brand-teal);color:var(--color-brand-teal);padding:0.8rem 1.75rem;border-radius:var(--radius-pill);text-decoration:none;font-weight:600;">Explore Our Care</a>
          </div>
          <div class="hero__trust-row">
            <div class="hero__trust-item">
              <span class="hero__trust-dot">&#10003;</span>
              <span>100% Organic Cotton</span>
            </div>
            <div class="hero__trust-item">
              <span class="hero__trust-dot">&#10003;</span>
              <span>Dermatologist Tested</span>
            </div>
            <div class="hero__trust-item">
              <span class="hero__trust-dot">&#10003;</span>
              <span>Rash-Free Guarantee</span>
            </div>
          </div>
        </div>

        <div class="hero__media" data-reveal="fade-left">
          <img
            class="hero__img"
            src="{rel}assets/images/hero-main.jpg"
            alt="Way2Care premium feminine care products with natural botanical touch"
            width="800"
            height="640"
            fetchpriority="high"
          />
        </div>
      </div>
    </section>

    <!-- SECTION 2: PRODUCT / CATEGORY DISCOVERY -->
    <section class="section section--bg-soft" aria-labelledby="categories-heading">
      <div class="container">
        <div class="section-header section-header--between" data-reveal="fade-up">
          <div>
            <span class="section__eyebrow">Thoughtful Categories</span>
            <h2 class="section__title" id="categories-heading">Formulated for Your Rhythm</h2>
          </div>
          <p class="section__subtitle">Explore purposeful hygiene crafted specifically for each distinct phase of your day and month.</p>
        </div>

        <div class="categories-grid">
          <!-- Card 1: Period Care -->
          <a href="{rel}shop.html?cat=period" class="cat-card" data-reveal="fade-up">
            <img class="cat-card__img" src="{rel}assets/images/product-period-care.jpg" alt="Period Care Products" loading="lazy" />
            <div class="cat-card__overlay"></div>
            <div class="cat-card__content">
              <span class="cat-card__eyebrow">Menstrual Comfort</span>
              <h3 class="cat-card__title">Period Care</h3>
              <span class="cat-card__link">
                Explore Pads &amp; Liners
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
            </div>
          </a>

          <!-- Card 2: Daily Care -->
          <a href="{rel}shop.html?cat=daily" class="cat-card" data-reveal="fade-up" style="transition-delay:0.1s;">
            <img class="cat-card__img" src="{rel}assets/images/product-daily-care.jpg" alt="Daily Care Hygiene" loading="lazy" />
            <div class="cat-card__overlay"></div>
            <div class="cat-card__content">
              <span class="cat-card__eyebrow">Everyday Freshness</span>
              <h3 class="cat-card__title">Daily Care</h3>
              <span class="cat-card__link">
                Explore Washes &amp; Wipes
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
            </div>
          </a>

          <!-- Card 3: Care Ritual -->
          <a href="{rel}shop.html?cat=ritual" class="cat-card" data-reveal="fade-up" style="transition-delay:0.2s;">
            <img class="cat-card__img" src="{rel}assets/images/product-care-ritual.jpg" alt="Care Ritual Box" loading="lazy" />
            <div class="cat-card__overlay"></div>
            <div class="cat-card__content">
              <span class="cat-card__eyebrow">Holistic Wellness</span>
              <h3 class="cat-card__title">Your Care Ritual</h3>
              <span class="cat-card__link">
                Explore Curated Kits
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- SECTION 3: BESTSELLERS PRODUCT GRID -->
    <section class="section" aria-labelledby="bestsellers-heading">
      <div class="container">
        <div class="section-header section-header--between" data-reveal="fade-up">
          <div>
            <span class="section__eyebrow">Loved by Thousands</span>
            <h2 class="section__title" id="bestsellers-heading">Customer Bestsellers</h2>
          </div>
          <a href="{rel}shop.html" class="btn" style="border:1.5px solid var(--color-border);padding:0.6rem 1.4rem;border-radius:var(--radius-pill);color:var(--color-text);font-weight:600;">View All Products &rarr;</a>
        </div>

        <div class="product-grid" data-stagger>
          <!-- Product 1 -->
          <article class="product-card" data-category="period">
            <div class="product-card__media">
              <img class="product-card__img" src="{rel}assets/images/product-period-care.jpg" alt="Ultra-Thin Organic Cotton Pads" loading="lazy" />
              <div class="product-card__badges">
                <span style="background:var(--color-accent-pink);color:#fff;font-size:0.65rem;font-weight:700;padding:0.25rem 0.65rem;border-radius:var(--radius-pill);text-transform:uppercase;letter-spacing:0.05em;">Bestseller</span>
                <span style="background:var(--color-brand-teal);color:#fff;font-size:0.65rem;font-weight:700;padding:0.25rem 0.65rem;border-radius:var(--radius-pill);text-transform:uppercase;letter-spacing:0.05em;">Organic</span>
              </div>
              <button type="button" class="product-card__wishlist" aria-label="Add to wishlist">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
              </button>
            </div>
            <div class="product-card__body">
              <span class="product-card__category">Period Care</span>
              <a href="{rel}product-detail.html" class="product-card__name">Ultra-Thin Organic Cotton Pads</a>
              <p class="product-card__desc">Breathable, rash-free protection with plant-based waterproof backsheet. Pack of 12.</p>
              <div class="product-card__footer">
                <div>
                  <span class="product-card__price">&#8377;299</span>
                  <span style="font-size:0.8rem;color:var(--color-text-muted);text-decoration:line-through;margin-left:0.35rem;">&#8377;349</span>
                </div>
                <button type="button" class="btn btn--primary product-card__add-btn" data-add-to-cart>Add to Cart</button>
              </div>
            </div>
          </article>

          <!-- Product 2 -->
          <article class="product-card" data-category="daily">
            <div class="product-card__media">
              <img class="product-card__img" src="{rel}assets/images/product-daily-care.jpg" alt="Gentle Foaming Intimate Wash" loading="lazy" />
              <div class="product-card__badges">
                <span style="background:var(--color-brand-teal);color:#fff;font-size:0.65rem;font-weight:700;padding:0.25rem 0.65rem;border-radius:var(--radius-pill);text-transform:uppercase;letter-spacing:0.05em;">pH 3.8 Balanced</span>
              </div>
              <button type="button" class="product-card__wishlist" aria-label="Add to wishlist">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
              </button>
            </div>
            <div class="product-card__body">
              <span class="product-card__category">Daily Care</span>
              <a href="{rel}product-detail.html" class="product-card__name">Gentle Foaming Intimate Wash</a>
              <p class="product-card__desc">Enriched with tea tree &amp; aloe vera to maintain healthy natural microflora. 150ml.</p>
              <div class="product-card__footer">
                <div>
                  <span class="product-card__price">&#8377;349</span>
                  <span style="font-size:0.8rem;color:var(--color-text-muted);text-decoration:line-through;margin-left:0.35rem;">&#8377;399</span>
                </div>
                <button type="button" class="btn btn--primary product-card__add-btn" data-add-to-cart>Add to Cart</button>
              </div>
            </div>
          </article>

          <!-- Product 3 -->
          <article class="product-card" data-category="period">
            <div class="product-card__media">
              <img class="product-card__img" src="{rel}assets/images/hero-main.jpg" alt="Overnight Maxi Heavy Flow Pads" loading="lazy" />
              <div class="product-card__badges">
                <span style="background:var(--color-text);color:#fff;font-size:0.65rem;font-weight:700;padding:0.25rem 0.65rem;border-radius:var(--radius-pill);text-transform:uppercase;letter-spacing:0.05em;">Overnight 320mm</span>
              </div>
              <button type="button" class="product-card__wishlist" aria-label="Add to wishlist">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
              </button>
            </div>
            <div class="product-card__body">
              <span class="product-card__category">Period Care</span>
              <a href="{rel}product-detail.html" class="product-card__name">Overnight Maxi Extra-Long Pads</a>
              <p class="product-card__desc">Extra wide contoured back for 360-degree anti-leak sleep protection. Pack of 10.</p>
              <div class="product-card__footer">
                <div>
                  <span class="product-card__price">&#8377;329</span>
                </div>
                <button type="button" class="btn btn--primary product-card__add-btn" data-add-to-cart>Add to Cart</button>
              </div>
            </div>
          </article>

          <!-- Product 4 -->
          <article class="product-card" data-category="ritual">
            <div class="product-card__media">
              <img class="product-card__img" src="{rel}assets/images/product-care-ritual.jpg" alt="The Complete Cycle Care Kit" loading="lazy" />
              <div class="product-card__badges">
                <span style="background:var(--color-accent-pink);color:#fff;font-size:0.65rem;font-weight:700;padding:0.25rem 0.65rem;border-radius:var(--radius-pill);text-transform:uppercase;letter-spacing:0.05em;">Best Value</span>
              </div>
              <button type="button" class="product-card__wishlist" aria-label="Add to wishlist">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
              </button>
            </div>
            <div class="product-card__body">
              <span class="product-card__category">Your Care Ritual</span>
              <a href="{rel}product-detail.html" class="product-card__name">The Complete Cycle Ritual Box</a>
              <p class="product-card__desc">Includes Regular Pads, Overnight Pads, Intimate Wash &amp; biodegradable disposal bags.</p>
              <div class="product-card__footer">
                <div>
                  <span class="product-card__price">&#8377;899</span>
                  <span style="font-size:0.8rem;color:var(--color-text-muted);text-decoration:line-through;margin-left:0.35rem;">&#8377;1,099</span>
                </div>
                <button type="button" class="btn btn--primary product-card__add-btn" data-add-to-cart>Add to Cart</button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- SECTION 4: BRAND VALUES -->
    <section class="section section--bg-mint" aria-labelledby="values-heading">
      <div class="container">
        <div class="section-header section-header--center" data-reveal="fade-up">
          <span class="section__eyebrow">Our Uncompromising Standard</span>
          <h2 class="section__title" id="values-heading">Every Phase Deserves Thoughtful Care</h2>
          <p class="section__subtitle section__subtitle--center">We reject synthetics, toxic bleach, and artificial fragrances in favor of pure comfort backed by science.</p>
        </div>

        <div class="values-grid" data-stagger>
          <!-- Value 1 -->
          <div class="value-card">
            <div class="value-card__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h3 class="value-card__title">100% Organic Cotton</h3>
            <p class="value-card__text">Pure GOTS-certified organic cotton topsheet that breathes naturally and prevents skin irritation or chafing.</p>
          </div>

          <!-- Value 2 -->
          <div class="value-card">
            <div class="value-card__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
            </div>
            <h3 class="value-card__title">Zero Chlorine &amp; Toxins</h3>
            <p class="value-card__text">Completely free from dioxins, chemical fragrances, chlorine bleach, phthalates, and artificial coloring.</p>
          </div>

          <!-- Value 3 -->
          <div class="value-card">
            <div class="value-card__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <h3 class="value-card__title">Dermatologically Safe</h3>
            <p class="value-card__text">Hypoallergenic and rigorously tested to ensure gentle compatibility with the most delicate, sensitive skin.</p>
          </div>

          <!-- Value 4 -->
          <div class="value-card">
            <div class="value-card__icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
            </div>
            <h3 class="value-card__title">Planet Kind &amp; Biodegradable</h3>
            <p class="value-card__text">Plant-based bio-films and individual paper wraps minimize plastic footprint without sacrificing leakproof safety.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 5: REDEFINING FREEDOM -->
    <section class="section" aria-labelledby="freedom-heading">
      <div class="container">
        <div class="section-header section-header--center" data-reveal="fade-up">
          <span class="section__eyebrow">Zero Compromise Protection</span>
          <h2 class="section__title" id="freedom-heading">Redefining Freedom with Total <span class="text-accent">Menstrual Care</span></h2>
          <p class="section__subtitle section__subtitle--center">Engineered with high-absorbency multi-layer cores for unbroken peace of mind all day and night.</p>
        </div>

        <div class="values-grid" style="grid-template-columns:repeat(auto-fit,minmax(280px,1fr));" data-stagger>
          <div class="value-card" style="text-align:left;padding:2.25rem 2rem;">
            <div style="width:3rem;height:3rem;background:var(--color-teal-10);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;color:var(--color-brand-teal);margin-bottom:1.5rem;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>
            </div>
            <h3 class="value-card__title" style="font-size:1.35rem;margin-bottom:0.75rem;">Freedom from Stains &amp; Leaks</h3>
            <p class="value-card__text">Advanced leak-lock barriers and micro-channel absorbent cores lock flow instantly deep within the core.</p>
          </div>

          <div class="value-card" style="text-align:left;padding:2.25rem 2rem;">
            <div style="width:3rem;height:3rem;background:var(--color-pink-10);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;color:var(--color-accent-pink);margin-bottom:1.5rem;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <h3 class="value-card__title" style="font-size:1.35rem;margin-bottom:0.75rem;">Freedom from Constant Changes</h3>
            <p class="value-card__text">High liquid retention ensures you stay dry, fresh, and worry-free during long workdays or extended travels.</p>
          </div>

          <div class="value-card" style="text-align:left;padding:2.25rem 2rem;">
            <div style="width:3rem;height:3rem;background:var(--color-teal-10);border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;color:var(--color-brand-teal);margin-bottom:1.5rem;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg>
            </div>
            <h3 class="value-card__title" style="font-size:1.35rem;margin-bottom:0.75rem;">Freedom from Movement Limits</h3>
            <p class="value-card__text">Feather-light ergonomic design flexes naturally with your body during yoga, sports, work, and restful sleep.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 6: LIFESTYLE / BRAND STORYTELLING -->
    <section class="section section--bg-soft" aria-labelledby="story-heading">
      <div class="container">
        <div class="split-grid">
          <div class="split-media" data-reveal="fade-right">
            <img class="split-media__img" src="{rel}assets/images/lifestyle-about.jpg" alt="Woman experiencing comfort with Way2Care feminine products" loading="lazy" />
          </div>
          <div class="split-content" data-reveal="fade-left">
            <span class="section__eyebrow">Real Comfort. True Confidence.</span>
            <h2 class="split-content__title" id="story-heading">Gentle Care Designed for Your Real Everyday Life</h2>
            <p class="split-content__text">
              We started Way2Care with one clear premise: no woman should have to trade skin health for leak protection. Most conventional pads contain plastics, chemical bleach, and synthetic fibers that trap moisture and cause persistent rashes.
            </p>
            <div class="split-content__bullets">
              <div class="split-content__bullet">
                <span class="split-content__bullet-dot">&#10003;</span>
                <div><strong>100% GOTS Certified Organic Cotton:</strong> Sourced sustainably, spun gently for softest touch.</div>
              </div>
              <div class="split-content__bullet">
                <span class="split-content__bullet-dot">&#10003;</span>
                <div><strong>pH Balance Integrity:</strong> Free of fragrances that disrupt your natural acidic balance.</div>
              </div>
              <div class="split-content__bullet">
                <span class="split-content__bullet-dot">&#10003;</span>
                <div><strong>Empathetic Design:</strong> Individual hygienic disposal envelopes included with each pad.</div>
              </div>
            </div>
            <a href="{rel}about.html" class="btn btn--primary">Discover Our Story</a>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 7: BRAND CAMPAIGN BANNER -->
    <section class="section" style="padding-block:clamp(2rem,4vw,3.5rem);">
      <div class="container">
        <div class="brand-banner" data-reveal="scale">
          <img class="brand-banner__bg" src="{rel}assets/images/brand-banner.jpg" alt="" aria-hidden="true" />
          <div class="brand-banner__content">
            <span class="brand-banner__eyebrow">Join the Way2Care Movement</span>
            <h2 class="brand-banner__title">Experience What <span class="brand-banner__title-italic">Pure Comfort</span> Truly Feels Like</h2>
            <p class="brand-banner__text">
              Over 50,000+ women have switched to our rash-free organic cotton care. Make your next cycle the gentlest one yet.
            </p>
            <div class="brand-banner__cta-group">
              <a href="{rel}shop.html" class="btn btn--primary">Shop the Collection</a>
              <a href="{rel}about.html" class="btn" style="background:#fff;color:var(--color-text);padding:0.8rem 2rem;border-radius:var(--radius-pill);font-weight:600;text-decoration:none;">Learn Our Science</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 8: EDUCATIONAL JOURNAL / INSPIRATION -->
    <section class="section" aria-labelledby="journal-heading">
      <div class="container">
        <div class="section-header section-header--between" data-reveal="fade-up">
          <div>
            <span class="section__eyebrow">The Wellness Journal</span>
            <h2 class="section__title" id="journal-heading">Feminine Care &amp; Wellbeing Insights</h2>
          </div>
          <p class="section__subtitle">Expert guidance on menstrual health, intimate hygiene, and body literacy.</p>
        </div>

        <div class="article-grid" data-stagger>
          <!-- Article 1 -->
          <article class="article-card">
            <div class="article-card__media">
              <img class="article-card__img" src="{rel}assets/images/product-period-care.jpg" alt="Understanding organic vs synthetic pads" loading="lazy" />
            </div>
            <div class="article-card__body">
              <span class="article-card__tag">Health &amp; Science</span>
              <a href="{rel}about.html" class="article-card__title">The Hidden Truth: Organic Cotton vs Synthetic Pads</a>
              <p class="article-card__excerpt">Why conventional pads trap moisture and lead to intimate rashes, and how breathable cotton restores comfort.</p>
              <a href="{rel}about.html" class="article-card__link">
                Read Article &rarr;
              </a>
            </div>
          </article>

          <!-- Article 2 -->
          <article class="article-card">
            <div class="article-card__media">
              <img class="article-card__img" src="{rel}assets/images/lifestyle-about.jpg" alt="Managing cycle phases" loading="lazy" />
            </div>
            <div class="article-card__body">
              <span class="article-card__tag">Cycle Literacy</span>
              <a href="{rel}about.html" class="article-card__title">Your 4 Cycle Phases: What Your Body Needs</a>
              <p class="article-card__excerpt">From follicular energy to luteal nourishment, learn how hormone fluctuations guide your hygiene routine.</p>
              <a href="{rel}about.html" class="article-card__link">
                Read Article &rarr;
              </a>
            </div>
          </article>

          <!-- Article 3 -->
          <article class="article-card">
            <div class="article-card__media">
              <img class="article-card__img" src="{rel}assets/images/product-daily-care.jpg" alt="Intimate hygiene routine" loading="lazy" />
            </div>
            <div class="article-card__body">
              <span class="article-card__tag">Daily Rituals</span>
              <a href="{rel}about.html" class="article-card__title">Everyday Intimate Hygiene: Doctor-Backed Habits</a>
              <p class="article-card__excerpt">Why maintaining the natural acidic pH of 3.8 is the single best protection against common infections.</p>
              <a href="{rel}about.html" class="article-card__link">
                Read Article &rarr;
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- SECTION 9: CUSTOMER CARE / CONTACT TEASER -->
    <section class="section section--bg-mint" aria-labelledby="support-heading">
      <div class="container">
        <div class="contact-section" style="background:#fff;border:1px solid var(--color-border-soft);" data-reveal="fade-up">
          <div class="contact-grid">
            <div>
              <span class="section__eyebrow">We Are Here For You</span>
              <h2 class="split-content__title" id="support-heading" style="margin-bottom:1rem;">Questions About Your Care Routine?</h2>
              <p style="font-size:0.95rem;color:var(--color-text-muted);line-height:1.7;margin-bottom:2rem;">
                Our women's care specialists are here to answer your sizing questions, delivery inquiries, or ingredient details.
              </p>
              <div class="contact-info">
                <div class="contact-info__item">
                  <div class="contact-info__icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <div>
                    <div class="contact-info__label">Email Support</div>
                    <div class="contact-info__value">support@way2care.in</div>
                  </div>
                </div>
                <div class="contact-info__item">
                  <div class="contact-info__icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div>
                    <div class="contact-info__label">WhatsApp &amp; Call Line</div>
                    <div class="contact-info__value">+91 98765 43210 (Mon-Sat, 9am - 7pm)</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div style="background:var(--color-bg-mint);padding:2rem;border-radius:var(--radius-xl);border:1px solid rgba(1,188,159,0.2);">
                <h3 style="font-family:var(--font-display);font-size:1.5rem;font-weight:500;margin-bottom:0.75rem;">Need Quick Help?</h3>
                <p style="font-size:0.9rem;color:var(--color-text-muted);line-height:1.6;margin-bottom:1.5rem;">
                  Find instant answers regarding shipping timeframes, tracking, pad sizes, and subscriptions on our Help Center.
                </p>
                <div style="display:flex;gap:0.75rem;flex-wrap:wrap;">
                  <a href="{rel}faq.html" class="btn btn--primary" style="font-size:0.875rem;">Browse FAQs</a>
                  <a href="{rel}contact.html" class="btn" style="background:#fff;border:1.5px solid var(--color-border);color:var(--color-text);font-size:0.875rem;border-radius:var(--radius-pill);padding:0.75rem 1.5rem;text-decoration:none;font-weight:600;">Send Message</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
"""
    return header + body + footer


# ========================================================
# 2. PRODUCT LISTING PAGE (shop.html)
# ========================================================
def generate_shop(depth=0):
    rel = "" if depth == 0 else "../"
    header = render_header("Shop All Feminine Care", depth, "shop")
    footer = render_footer(depth)

    body = f"""
  <main id="main-content">
    <div class="page-hero">
      <div class="container">
        <nav class="breadcrumb" style="display:flex;align-items:center;justify-content:center;gap:0.5rem;font-size:0.8125rem;color:var(--color-text-muted);margin-bottom:1rem;">
          <a href="{rel}index.html" style="text-decoration:none;">Home</a>
          <span>/</span>
          <span style="color:var(--color-text);font-weight:600;">Shop</span>
        </nav>
        <span class="page-hero__eyebrow section__eyebrow">Clean &bull; Organic &bull; Dermatologist Tested</span>
        <h1 class="page-hero__title">Our Complete Care Collection</h1>
        <p class="page-hero__subtitle">Everyday personal hygiene and menstrual care formulated with pure plant-based ingredients and zero harsh toxins.</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <!-- Category Pill Tabs -->
        <div class="category-tabs" data-reveal="fade-up">
          <button type="button" class="category-tab is-active" data-category="all">All Care (6)</button>
          <button type="button" class="category-tab" data-category="period">Period Care (3)</button>
          <button type="button" class="category-tab" data-category="daily">Daily Care (2)</button>
          <button type="button" class="category-tab" data-category="ritual">Care Rituals (1)</button>
        </div>

        <div class="shop-layout">
          <!-- Sidebar Filters -->
          <aside class="filters-sidebar" data-reveal="fade-right">
            <div style="background:var(--color-bg-soft);padding:1.5rem;border-radius:var(--radius-xl);border:1px solid var(--color-border-soft);">
              <h3 style="font-size:1.1rem;font-family:var(--font-display);font-weight:600;margin-bottom:1.25rem;">Filter Products</h3>
              
              <div class="filter-group">
                <h4 class="filter-group__title">Categories</h4>
                <div class="filter-options">
                  <label class="filter-option is-checked">
                    <span class="filter-option__check"></span>
                    <span class="filter-option__label">All Categories</span>
                  </label>
                  <label class="filter-option">
                    <span class="filter-option__check"></span>
                    <span class="filter-option__label">Menstrual Pads</span>
                  </label>
                  <label class="filter-option">
                    <span class="filter-option__check"></span>
                    <span class="filter-option__label">Panty Liners</span>
                  </label>
                  <label class="filter-option">
                    <span class="filter-option__check"></span>
                    <span class="filter-option__label">Intimate Washes</span>
                  </label>
                  <label class="filter-option">
                    <span class="filter-option__check"></span>
                    <span class="filter-option__label">Combo Kits</span>
                  </label>
                </div>
              </div>

              <div class="filter-group">
                <h4 class="filter-group__title">Benefits</h4>
                <div class="filter-options">
                  <label class="filter-option">
                    <span class="filter-option__check"></span>
                    <span class="filter-option__label">100% Organic Cotton</span>
                  </label>
                  <label class="filter-option">
                    <span class="filter-option__check"></span>
                    <span class="filter-option__label">Rash-Free Guarantee</span>
                  </label>
                  <label class="filter-option">
                    <span class="filter-option__check"></span>
                    <span class="filter-option__label">pH 3.8 Balanced</span>
                  </label>
                  <label class="filter-option">
                    <span class="filter-option__check"></span>
                    <span class="filter-option__label">Fragrance-Free</span>
                  </label>
                </div>
              </div>

              <div class="filter-group">
                <h4 class="filter-group__title">Flow / Intensity</h4>
                <div class="filter-options">
                  <label class="filter-option">
                    <span class="filter-option__check"></span>
                    <span class="filter-option__label">Regular Flow (280mm)</span>
                  </label>
                  <label class="filter-option">
                    <span class="filter-option__check"></span>
                    <span class="filter-option__label">Heavy / Overnight (320mm)</span>
                  </label>
                  <label class="filter-option">
                    <span class="filter-option__check"></span>
                    <span class="filter-option__label">Daily Discharge (155mm)</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          <!-- Main Shop Grid -->
          <div class="shop-main">
            <!-- Toolbar -->
            <div class="shop-toolbar">
              <span class="shop-toolbar__count">Showing 6 products</span>
              <div style="display:flex;align-items:center;gap:0.75rem;">
                <label for="shop-sort" style="font-size:0.875rem;color:var(--color-text-muted);">Sort by:</label>
                <select id="shop-sort" class="shop-sort">
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>

            <!-- Products -->
            <div class="product-grid" data-stagger>
              <!-- 1 -->
              <article class="product-card" data-category="period">
                <div class="product-card__media">
                  <img class="product-card__img" src="{rel}assets/images/product-period-care.jpg" alt="Way2Care Regular Pads" loading="lazy" />
                  <div class="product-card__badges">
                    <span style="background:var(--color-accent-pink);color:#fff;font-size:0.65rem;font-weight:700;padding:0.25rem 0.65rem;border-radius:var(--radius-pill);text-transform:uppercase;">Bestseller</span>
                  </div>
                  <button type="button" class="product-card__wishlist" aria-label="Add to wishlist"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg></button>
                </div>
                <div class="product-card__body">
                  <span class="product-card__category">Period Care</span>
                  <a href="{rel}product-detail.html" class="product-card__name">Ultra-Thin Organic Cotton Regular Pads</a>
                  <p class="product-card__desc">280mm wings, zero synthetic mesh, biodegradable individual wrappers.</p>
                  <div class="product-card__footer">
                    <div>
                      <span class="product-card__price">&#8377;299</span>
                      <span style="font-size:0.8rem;color:var(--color-text-muted);text-decoration:line-through;margin-left:0.35rem;">&#8377;349</span>
                    </div>
                    <button type="button" class="btn btn--primary product-card__add-btn" data-add-to-cart>Add to Cart</button>
                  </div>
                </div>
              </article>

              <!-- 2 -->
              <article class="product-card" data-category="daily">
                <div class="product-card__media">
                  <img class="product-card__img" src="{rel}assets/images/product-daily-care.jpg" alt="Gentle Foaming Intimate Wash" loading="lazy" />
                  <div class="product-card__badges">
                    <span style="background:var(--color-brand-teal);color:#fff;font-size:0.65rem;font-weight:700;padding:0.25rem 0.65rem;border-radius:var(--radius-pill);text-transform:uppercase;">pH 3.8 Balanced</span>
                  </div>
                  <button type="button" class="product-card__wishlist" aria-label="Add to wishlist"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg></button>
                </div>
                <div class="product-card__body">
                  <span class="product-card__category">Daily Care</span>
                  <a href="{rel}product-detail.html" class="product-card__name">Gentle Foaming Intimate Wash</a>
                  <p class="product-card__desc">Dermatologist formulated with organic chamomile, aloe and lactic acid.</p>
                  <div class="product-card__footer">
                    <div>
                      <span class="product-card__price">&#8377;349</span>
                      <span style="font-size:0.8rem;color:var(--color-text-muted);text-decoration:line-through;margin-left:0.35rem;">&#8377;399</span>
                    </div>
                    <button type="button" class="btn btn--primary product-card__add-btn" data-add-to-cart>Add to Cart</button>
                  </div>
                </div>
              </article>

              <!-- 3 -->
              <article class="product-card" data-category="period">
                <div class="product-card__media">
                  <img class="product-card__img" src="{rel}assets/images/hero-main.jpg" alt="Overnight Maxi Pads" loading="lazy" />
                  <div class="product-card__badges">
                    <span style="background:var(--color-text);color:#fff;font-size:0.65rem;font-weight:700;padding:0.25rem 0.65rem;border-radius:var(--radius-pill);text-transform:uppercase;">Overnight 320mm</span>
                  </div>
                  <button type="button" class="product-card__wishlist" aria-label="Add to wishlist"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg></button>
                </div>
                <div class="product-card__body">
                  <span class="product-card__category">Period Care</span>
                  <a href="{rel}product-detail.html" class="product-card__name">Overnight Heavy Flow Organic Pads</a>
                  <p class="product-card__desc">Extra wide curved rear design ensures total stain protection in any sleep position.</p>
                  <div class="product-card__footer">
                    <div>
                      <span class="product-card__price">&#8377;329</span>
                    </div>
                    <button type="button" class="btn btn--primary product-card__add-btn" data-add-to-cart>Add to Cart</button>
                  </div>
                </div>
              </article>

              <!-- 4 -->
              <article class="product-card" data-category="daily">
                <div class="product-card__media">
                  <img class="product-card__img" src="{rel}assets/images/product-daily-care.jpg" alt="Breathable Panty Liners" loading="lazy" />
                  <div class="product-card__badges">
                    <span style="background:var(--color-brand-teal);color:#fff;font-size:0.65rem;font-weight:700;padding:0.25rem 0.65rem;border-radius:var(--radius-pill);text-transform:uppercase;">Daily Comfort</span>
                  </div>
                  <button type="button" class="product-card__wishlist" aria-label="Add to wishlist"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg></button>
                </div>
                <div class="product-card__body">
                  <span class="product-card__category">Daily Care</span>
                  <a href="{rel}product-detail.html" class="product-card__name">Ultra-Thin Breathable Panty Liners</a>
                  <p class="product-card__desc">Feather-light 155mm organic cotton liners for daily fresh discharge protection. Pack of 24.</p>
                  <div class="product-card__footer">
                    <div>
                      <span class="product-card__price">&#8377;219</span>
                    </div>
                    <button type="button" class="btn btn--primary product-card__add-btn" data-add-to-cart>Add to Cart</button>
                  </div>
                </div>
              </article>

              <!-- 5 -->
              <article class="product-card" data-category="period">
                <div class="product-card__media">
                  <img class="product-card__img" src="{rel}assets/images/product-period-care.jpg" alt="Mixed Flow Custom Pad Box" loading="lazy" />
                  <div class="product-card__badges">
                    <span style="background:var(--color-accent-pink);color:#fff;font-size:0.65rem;font-weight:700;padding:0.25rem 0.65rem;border-radius:var(--radius-pill);text-transform:uppercase;">Custom Fit</span>
                  </div>
                  <button type="button" class="product-card__wishlist" aria-label="Add to wishlist"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg></button>
                </div>
                <div class="product-card__body">
                  <span class="product-card__category">Period Care</span>
                  <a href="{rel}product-detail.html" class="product-card__name">Mixed Flow Day &amp; Night Pad Box</a>
                  <p class="product-card__desc">10 Regular Pads (280mm) + 6 Overnight Pads (320mm) tailored for complete cycle coverage.</p>
                  <div class="product-card__footer">
                    <div>
                      <span class="product-card__price">&#8377;369</span>
                    </div>
                    <button type="button" class="btn btn--primary product-card__add-btn" data-add-to-cart>Add to Cart</button>
                  </div>
                </div>
              </article>

              <!-- 6 -->
              <article class="product-card" data-category="ritual">
                <div class="product-card__media">
                  <img class="product-card__img" src="{rel}assets/images/product-care-ritual.jpg" alt="Complete Ritual Box" loading="lazy" />
                  <div class="product-card__badges">
                    <span style="background:var(--color-accent-pink);color:#fff;font-size:0.65rem;font-weight:700;padding:0.25rem 0.65rem;border-radius:var(--radius-pill);text-transform:uppercase;">Best Value</span>
                  </div>
                  <button type="button" class="product-card__wishlist" aria-label="Add to wishlist"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg></button>
                </div>
                <div class="product-card__body">
                  <span class="product-card__category">Your Care Ritual</span>
                  <a href="{rel}product-detail.html" class="product-card__name">The Complete Cycle Ritual Box</a>
                  <p class="product-card__desc">Pads, Overnight Protection, Intimate Wash &amp; biodegradable disposal bags in eco keepsake box.</p>
                  <div class="product-card__footer">
                    <div>
                      <span class="product-card__price">&#8377;899</span>
                      <span style="font-size:0.8rem;color:var(--color-text-muted);text-decoration:line-through;margin-left:0.35rem;">&#8377;1,099</span>
                    </div>
                    <button type="button" class="btn btn--primary product-card__add-btn" data-add-to-cart>Add to Cart</button>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
"""
    return header + body + footer


# ========================================================
# 3. INDIVIDUAL PRODUCT DETAIL PAGE (product-detail.html)
# ========================================================
def generate_product_detail(depth=0):
    rel = "" if depth == 0 else "../"
    header = render_header("Ultra-Thin Organic Cotton Pads", depth, "shop")
    footer = render_footer(depth)

    body = f"""
  <main id="main-content">
    <div style="background:var(--color-bg-soft);padding:1rem 0;border-bottom:1px solid var(--color-border-soft);">
      <div class="container">
        <nav class="breadcrumb" style="display:flex;align-items:center;gap:0.5rem;font-size:0.8125rem;color:var(--color-text-muted);">
          <a href="{rel}index.html" style="text-decoration:none;">Home</a>
          <span>/</span>
          <a href="{rel}shop.html" style="text-decoration:none;">Shop</a>
          <span>/</span>
          <a href="{rel}shop.html?cat=period" style="text-decoration:none;">Period Care</a>
          <span>/</span>
          <span style="color:var(--color-text);font-weight:600;">Ultra-Thin Organic Cotton Sanitary Pads</span>
        </nav>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="product-detail-grid">
            <!-- Left: Gallery -->
            <div class="product-gallery" style="display:flex;flex-direction:column;gap:1rem;">
              <div class="product-gallery__main" style="border-radius:var(--radius-2xl);overflow:hidden;background:var(--color-bg-mint);border:1px solid var(--color-border-soft);aspect-ratio:1/1;">
                <img class="product-gallery__main-img" src="{rel}assets/images/product-period-care.jpg" alt="Way2Care Ultra-Thin Organic Cotton Pads" style="width:100%;height:100%;object-fit:cover;" />
              </div>
              <div class="product-gallery__thumbs" style="display:flex;gap:0.75rem;">
                <button type="button" class="product-gallery__thumb is-active" style="width:5rem;height:5rem;border-radius:var(--radius-md);overflow:hidden;border:2px solid var(--color-accent-pink);cursor:pointer;padding:0;background:#fff;">
                  <img src="{rel}assets/images/product-period-care.jpg" alt="Front pack view" style="width:100%;height:100%;object-fit:cover;" />
                </button>
                <button type="button" class="product-gallery__thumb" style="width:5rem;height:5rem;border-radius:var(--radius-md);overflow:hidden;border:2px solid transparent;cursor:pointer;padding:0;background:#fff;">
                  <img src="{rel}assets/images/hero-main.jpg" alt="Botanical flatlay" style="width:100%;height:100%;object-fit:cover;" />
                </button>
                <button type="button" class="product-gallery__thumb" style="width:5rem;height:5rem;border-radius:var(--radius-md);overflow:hidden;border:2px solid transparent;cursor:pointer;padding:0;background:#fff;">
                  <img src="{rel}assets/images/product-care-ritual.jpg" alt="Pack contents and wrap" style="width:100%;height:100%;object-fit:cover;" />
                </button>
              </div>
            </div>

            <!-- Right: Info -->
            <div class="product-info">
              <span class="product-info__eyebrow section__eyebrow">Menstrual Care &bull; Rash-Free</span>
              <h1 class="product-info__title" style="font-family:var(--font-display);font-size:clamp(2rem,4vw,3rem);font-weight:500;line-height:1.15;margin-bottom:0.75rem;">Ultra-Thin Organic Cotton Sanitary Pads</h1>
              
              <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1.25rem;">
                <div class="stars">★★★★★</div>
                <span style="font-size:0.875rem;font-weight:600;color:var(--color-text);">4.9/5</span>
                <span style="font-size:0.875rem;color:var(--color-text-muted);">(1,248 verified reviews)</span>
              </div>

              <div class="product-info__price-row">
                <span class="product-info__price">&#8377;299</span>
                <span class="product-info__price-original">&#8377;349</span>
                <span style="background:var(--color-pink-10);color:var(--color-accent-pink);font-size:0.75rem;font-weight:700;padding:0.25rem 0.65rem;border-radius:var(--radius-pill);">Save 14%</span>
              </div>

              <p class="product-info__desc">
                Engineered with 100% pure certified organic cotton topsheet. Zero artificial fragrance, chlorine bleach, or plastic mesh that trigger persistent rashes. Plant-based micro-porous backsheet allows natural airflow while locking away flow safely.
              </p>

              <!-- Pack Variants -->
              <span class="product-info__option-label">Select Pack Size:</span>
              <div class="product-info__variants">
                <button type="button" class="product-info__variant is-active">Pack of 12 (Regular 280mm)</button>
                <button type="button" class="product-info__variant">Pack of 24 (Value Pack)</button>
                <button type="button" class="product-info__variant">Pack of 36 (Quarterly Cycle)</button>
              </div>

              <!-- Quantity and Add to Cart -->
              <div class="product-info__qty-row">
                <div class="qty-control">
                  <button type="button" class="qty-control__btn" data-qty-dec aria-label="Decrease quantity">&minus;</button>
                  <input type="text" class="qty-control__val" value="1" readonly aria-label="Selected quantity" />
                  <button type="button" class="qty-control__btn" data-qty-inc aria-label="Increase quantity">&#43;</button>
                </div>
                <button type="button" class="btn btn--primary" style="flex:1;padding:0.85rem 2rem;" data-add-to-cart>Add to Cart &bull; &#8377;299</button>
              </div>

              <!-- Trust / Delivery Perks -->
              <div class="product-info__meta" style="background:var(--color-bg-mint);padding:1.25rem 1.5rem;border-radius:var(--radius-lg);margin-top:1.5rem;border:1px solid rgba(1,188,159,0.15);">
                <div class="product-info__meta-item">
                  <span class="product-info__meta-icon">&#10003;</span>
                  <span><strong>Discreet &amp; Eco Shipping:</strong> Delivered in 100% recyclable, unmarked paper packaging</span>
                </div>
                <div class="product-info__meta-item">
                  <span class="product-info__meta-icon">&#10003;</span>
                  <span><strong>Rash-Free Guarantee:</strong> Dermatologist-certified non-irritating for sensitive intimate skin</span>
                </div>
                <div class="product-info__meta-item">
                  <span class="product-info__meta-icon">&#10003;</span>
                  <span><strong>Complimentary Disposal Bags:</strong> Included inside each individual pad pack</span>
                </div>
              </div>
            </div>
          </div>

        <!-- Tabbed Information -->
        <div class="product-tabs" data-reveal="fade-up">
          <nav class="tabs-nav" aria-label="Product Information Tabs">
            <button type="button" class="tab-btn is-active" data-tab="tab-details">Product Details</button>
            <button type="button" class="tab-btn" data-tab="tab-materials">Pure Ingredients &amp; Materials</button>
            <button type="button" class="tab-btn" data-tab="tab-usage">How to Use &amp; Dispose</button>
            <button type="button" class="tab-btn" data-tab="tab-faq">Frequently Asked Questions</button>
          </nav>

          <div class="tab-panel is-active" id="tab-details">
            <h3 style="font-family:var(--font-display);font-size:1.5rem;">Why You'll Love Way2Care Organic Pads</h3>
            <p>
              Traditional sanitary pads are made with up to 90% crude oil-derived plastics, synthetic chemical perfumes, and chlorine bleaching. This creates a closed greenhouse effect against your sensitive intimate skin, trapping moisture and breeding harmful bacteria that lead to painful itching, burning, and rashes.
            </p>
            <p>
              Way2Care sanitary pads are engineered with an authentic, breathable GOTS-certified organic cotton topsheet. The natural micro-fibers absorb moisture instantly while allowing air circulation to keep you dry and comfortable for up to 8 continuous hours.
            </p>
            <ul>
              <li><strong>Length:</strong> 280 mm with wide contoured wings for secure hold.</li>
              <li><strong>Core:</strong> Natural FSC-certified wood pulp core with non-toxic Japanese SAP absorbency.</li>
              <li><strong>Backsheet:</strong> Breathable cornstarch-derived bio-film that blocks leaks while letting skin breathe.</li>
              <li><strong>Adhesive:</strong> Non-toxic food-grade adhesive that stays firmly in place without leaving sticky residue on underwear.</li>
            </ul>
          </div>

          <div class="tab-panel" id="tab-materials">
            <h3 style="font-family:var(--font-display);font-size:1.5rem;">Clean Ingredient &amp; Material Standards</h3>
            <p>We are completely transparent about everything that touches your skin:</p>
            <ul>
              <li><strong>Topsheet:</strong> 100% GOTS Certified Organic Cotton (Zero pesticides, zero GMOs).</li>
              <li><strong>Absorbent Core:</strong> Elemental chlorine-free (ECF) sustainable plant cellulose fluff pulp.</li>
              <li><strong>Leak Protection:</strong> Cornstarch-based bioplastic waterproof film.</li>
              <li><strong>Free From:</strong> Dioxins, artificial fragrances, parabens, phthalates, synthetic dye stripes, and optical brighteners.</li>
            </ul>
          </div>

          <div class="tab-panel" id="tab-usage">
            <h3 style="font-family:var(--font-display);font-size:1.5rem;">Recommended Usage &amp; Thoughtful Disposal</h3>
            <p>
              1. Unwrap the pad from its individual biodegradable envelope.<br />
              2. Peel off the release paper strip from the back and wings.<br />
              3. Press firmly onto the center of your underwear and wrap the wings securely underneath.<br />
              4. Change your pad every 4 to 6 hours, or as your flow requires.<br />
              5. For disposal: Roll the used pad tightly, place it inside the complimentary disposal envelope, and discard in your household dry waste bin. Never flush down the toilet.
            </p>
          </div>

          <div class="tab-panel" id="tab-faq">
            <div class="faq-item is-open">
              <button type="button" class="faq-item__question">
                <span>Are these pads really 100% rash-free?</span>
                <span class="faq-item__icon">&#43;</span>
              </button>
              <div class="faq-item__answer">
                <div class="faq-item__answer-inner">
                  Yes! Rashes are primarily caused by synthetic plastic topsheets and chemical perfumes that trap heat and sweat. Our pure organic cotton topsheet allows continuous airflow, preventing bacterial irritation and friction.
                </div>
              </div>
            </div>
            <div class="faq-item">
              <button type="button" class="faq-item__question">
                <span>How many pads come in one pack?</span>
                <span class="faq-item__icon">&#43;</span>
              </button>
              <div class="faq-item__answer">
                <div class="faq-item__answer-inner">
                  Our standard pack contains 12 pads. We also offer 24-pad value bundles and 36-pad quarterly subscription boxes with free delivery.
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Related Products Section -->
        <div style="margin-top:clamp(4rem,7vw,6rem);" data-reveal="fade-up">
          <div class="section-header section-header--between">
            <h2 class="section__title">Complete Your Care Routine</h2>
            <a href="{rel}shop.html" class="btn" style="border:1.5px solid var(--color-border);padding:0.6rem 1.4rem;border-radius:var(--radius-pill);color:var(--color-text);font-weight:600;">View All &rarr;</a>
          </div>
          <div class="product-grid" style="grid-template-columns:repeat(auto-fill,minmax(min(100%,16rem),1fr));">
            <article class="product-card">
              <div class="product-card__media">
                <img class="product-card__img" src="{rel}assets/images/product-daily-care.jpg" alt="Intimate Wash" loading="lazy" />
              </div>
              <div class="product-card__body">
                <span class="product-card__category">Daily Care</span>
                <a href="{rel}product-detail.html" class="product-card__name">Gentle Foaming Intimate Wash</a>
                <p class="product-card__desc">pH 3.8 balanced cleanser with soothing aloe vera.</p>
                <div class="product-card__footer">
                  <span class="product-card__price">&#8377;349</span>
                  <button type="button" class="btn btn--primary product-card__add-btn" data-add-to-cart>Add to Cart</button>
                </div>
              </div>
            </article>
            <article class="product-card">
              <div class="product-card__media">
                <img class="product-card__img" src="{rel}assets/images/hero-main.jpg" alt="Overnight Pads" loading="lazy" />
              </div>
              <div class="product-card__body">
                <span class="product-card__category">Period Care</span>
                <a href="{rel}product-detail.html" class="product-card__name">Overnight Heavy Flow Organic Pads</a>
                <p class="product-card__desc">Extra wide 320mm back for leakproof night sleep.</p>
                <div class="product-card__footer">
                  <span class="product-card__price">&#8377;329</span>
                  <button type="button" class="btn btn--primary product-card__add-btn" data-add-to-cart>Add to Cart</button>
                </div>
              </div>
            </article>
            <article class="product-card">
              <div class="product-card__media">
                <img class="product-card__img" src="{rel}assets/images/product-care-ritual.jpg" alt="The Ritual Kit" loading="lazy" />
              </div>
              <div class="product-card__body">
                <span class="product-card__category">Your Care Ritual</span>
                <a href="{rel}product-detail.html" class="product-card__name">The Complete Cycle Ritual Box</a>
                <p class="product-card__desc">Full menstrual &amp; daily hygiene starter kit.</p>
                <div class="product-card__footer">
                  <span class="product-card__price">&#8377;899</span>
                  <button type="button" class="btn btn--primary product-card__add-btn" data-add-to-cart>Add to Cart</button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  </main>
"""
    return header + body + footer


# ========================================================
# 4. ABOUT US PAGE (about.html)
# ========================================================
def generate_about(depth=0):
    rel = "" if depth == 0 else "../"
    header = render_header("About Our Care Philosophy", depth, "about")
    footer = render_footer(depth)

    body = f"""
  <main id="main-content">
    <div class="page-hero">
      <div class="container">
        <span class="page-hero__eyebrow section__eyebrow">Our Story &amp; Purpose</span>
        <h1 class="page-hero__title">Care Designed with Empathy,<br /><span class="hero__title-italic">Rooted in Science</span></h1>
        <p class="page-hero__subtitle">Way2Care was born from a fundamental belief: every woman deserves feminine hygiene that protects without compromise, irritation, or shame.</p>
      </div>
    </div>

    <!-- Section 1: Story Split -->
    <section class="section">
      <div class="container">
        <div class="split-grid">
          <div class="split-media" data-reveal="fade-right">
            <img class="split-media__img" src="{rel}assets/images/lifestyle-about.jpg" alt="Way2Care brand mission and founder story" />
          </div>
          <div class="split-content" data-reveal="fade-left">
            <span class="section__eyebrow">The Way2Care Mission</span>
            <h2 class="split-content__title">Why We Rethought Everyday Feminine Care</h2>
            <p class="split-content__text">
              For decades, mainstream feminine hygiene prioritized cheap plastic manufacturing and artificial perfumes over women's actual biological comfort. Rashes, itching, and anxiety during work or travel were treated as "inevitable side effects" of having a period.
            </p>
            <p class="split-content__text">
              We knew there had to be a better way. By partnering with leading gynecologists and sustainable textile scientists, we formulated Way2Care: ultra-absorbent, hypoallergenic care made with 100% certified organic cotton and biocompatible botanicals that honor your natural microflora.
            </p>
            <div style="display:flex;gap:2rem;margin-top:2rem;border-top:1px solid var(--color-border-soft);padding-top:1.5rem;">
              <div>
                <div style="font-family:var(--font-display);font-size:2rem;font-weight:700;color:var(--color-brand-teal);">50K+</div>
                <div style="font-size:0.8125rem;color:var(--color-text-muted);">Happy Women</div>
              </div>
              <div>
                <div style="font-family:var(--font-display);font-size:2rem;font-weight:700;color:var(--color-accent-pink);">100%</div>
                <div style="font-size:0.8125rem;color:var(--color-text-muted);">Toxin Free</div>
              </div>
              <div>
                <div style="font-family:var(--font-display);font-size:2rem;font-weight:700;color:var(--color-text);">0%</div>
                <div style="font-size:0.8125rem;color:var(--color-text-muted);">Plastic Mesh</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 2: Four Core Pillars -->
    <section class="section section--bg-mint" id="ingredients">
      <div class="container">
        <div class="section-header section-header--center" data-reveal="fade-up">
          <span class="section__eyebrow">Our Pure Ingredients Standard</span>
          <h2 class="section__title">What Goes In &bull; What Stays Out</h2>
          <p class="section__subtitle section__subtitle--center">We hold our formulations to the strictest dermatological and ecological standards in the industry.</p>
        </div>

        <div class="values-grid" data-stagger>
          <div class="value-card">
            <div class="value-card__icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
            <h3 class="value-card__title">Pure Organic Cotton</h3>
            <p class="value-card__text">Free of synthetic glues, harsh bleach, and artificial chemical whitening agents.</p>
          </div>
          <div class="value-card">
            <div class="value-card__icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg></div>
            <h3 class="value-card__title">Zero Added Perfume</h3>
            <p class="value-card__text">Synthetic fragrances are the #1 culprit of intimate contact dermatitis. We are 100% perfume-free.</p>
          </div>
          <div class="value-card">
            <div class="value-card__icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
            <h3 class="value-card__title">Physiologic pH 3.8</h3>
            <p class="value-card__text">Our daily washes and wipes match the naturally acidic intimate flora, keeping bad bacteria in check.</p>
          </div>
          <div class="value-card" id="sustainability">
            <div class="value-card__icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/></svg></div>
            <h3 class="value-card__title">Eco-Responsible</h3>
            <p class="value-card__text">Biodegradable paper wrappers and compostable biopolymer backsheets protect both you and our earth.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Section 3: Call to Action -->
    <section class="section">
      <div class="container">
        <div class="brand-banner" data-reveal="scale">
          <img class="brand-banner__bg" src="{rel}assets/images/brand-banner.jpg" alt="" aria-hidden="true" />
          <div class="brand-banner__content">
            <span class="brand-banner__eyebrow">Ready for Better Care?</span>
            <h2 class="brand-banner__title">Experience the Difference from Your Very Next Cycle</h2>
            <p class="brand-banner__text">Browse our complete range of certified organic pads, intimate washes, and daily essentials.</p>
            <div class="brand-banner__cta-group">
              <a href="{rel}shop.html" class="btn btn--primary">Shop All Products</a>
              <a href="{rel}contact.html" class="btn" style="background:#fff;color:var(--color-text);padding:0.8rem 2rem;border-radius:var(--radius-pill);font-weight:600;text-decoration:none;">Talk to Our Team</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
"""
    return header + body + footer


# ========================================================
# 5. CONTACT US PAGE (contact.html)
# ========================================================
def generate_contact(depth=0):
    rel = "" if depth == 0 else "../"
    header = render_header("Contact Our Care Team", depth, "contact")
    footer = render_footer(depth)

    body = f"""
  <main id="main-content">
    <div class="page-hero">
      <div class="container">
        <span class="page-hero__eyebrow section__eyebrow">Customer Support &amp; Enquiries</span>
        <h1 class="page-hero__title">We Are Here For You</h1>
        <p class="page-hero__subtitle">Have a question about pad sizes, shipping, wholesale orders, or your subscription? We'd love to hear from you.</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="contact-section" style="background:#fff;border:1px solid var(--color-border-soft);" data-reveal="fade-up">
          <div class="contact-grid">
            <!-- Left Info -->
            <div>
              <span class="section__eyebrow">Reach Out Directly</span>
              <h2 class="split-content__title" style="margin-bottom:1.25rem;">Let's Talk About Better Care</h2>
              <p style="font-size:0.95rem;color:var(--color-text-muted);line-height:1.7;margin-bottom:2.5rem;">
                Our women's care specialists typically reply within 2-4 business hours. You can also reach us via phone or WhatsApp for urgent order assistance.
              </p>

              <div class="contact-info">
                <div class="contact-info__item">
                  <div class="contact-info__icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <div>
                    <div class="contact-info__label">Email Support</div>
                    <div class="contact-info__value"><a href="mailto:care@way2care.in" style="color:var(--color-text);text-decoration:none;">care@way2care.in</a></div>
                    <div style="font-size:0.8rem;color:var(--color-text-muted);">24/7 dedicated inbox</div>
                  </div>
                </div>

                <div class="contact-info__item">
                  <div class="contact-info__icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div>
                    <div class="contact-info__label">Phone &amp; WhatsApp</div>
                    <div class="contact-info__value">+91 98765 43210</div>
                    <div style="font-size:0.8rem;color:var(--color-text-muted);">Mon-Sat from 9:00 AM to 7:00 PM IST</div>
                  </div>
                </div>

                <div class="contact-info__item">
                  <div class="contact-info__icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <div class="contact-info__label">Headquarters</div>
                    <div class="contact-info__value">Way2Care Personal Hygiene Pvt. Ltd.</div>
                    <div style="font-size:0.8rem;color:var(--color-text-muted);">Bengaluru, Karnataka 560001, India</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right: Interactive Validated Form -->
            <div>
              <form id="contact-form" class="contact-form" novalidate style="background:var(--color-bg-soft);padding:2.5rem;border-radius:var(--radius-xl);border:1px solid var(--color-border-soft);">
                <h3 style="font-family:var(--font-display);font-size:1.5rem;font-weight:600;margin-bottom:1.5rem;">Send Us a Message</h3>

                <div class="contact-form__field">
                  <label for="contact-name" class="contact-form__label">Full Name *</label>
                  <input type="text" id="contact-name" name="name" class="contact-form__input" placeholder="e.g. Ananya Sharma" required />
                </div>

                <div class="contact-form__field">
                  <label for="contact-email" class="contact-form__label">Email Address *</label>
                  <input type="email" id="contact-email" name="email" class="contact-form__input" placeholder="e.g. ananya@example.com" required />
                </div>

                <div class="contact-form__field">
                  <label for="contact-subject" class="contact-form__label">Enquiry Topic</label>
                  <select id="contact-subject" name="subject" class="contact-form__select">
                    <option value="general">Product Recommendation / Sizing</option>
                    <option value="order">Order Tracking &amp; Delivery</option>
                    <option value="subscription">Subscriptions &amp; Pause/Cancel</option>
                    <option value="wholesale">Wholesale &amp; Retail Partnerships</option>
                    <option value="press">Press &amp; Collaborations</option>
                  </select>
                </div>

                <div class="contact-form__field">
                  <label for="contact-message" class="contact-form__label">Your Message *</label>
                  <textarea id="contact-message" name="message" class="contact-form__textarea" placeholder="How can we help your care routine today?" required></textarea>
                </div>

                <button type="submit" class="btn btn--primary contact-form__submit">Send Message</button>
                <div id="contact-form-status" style="margin-top:1rem;display:none;"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
"""
    return header + body + footer


# ========================================================
# 6. SHOPPING CART PAGE (cart.html)
# ========================================================
def generate_cart(depth=0):
    rel = "" if depth == 0 else "../"
    header = render_header("Your Shopping Cart", depth, "cart")
    footer = render_footer(depth)

    body = f"""
  <main id="main-content">
    <div class="page-hero">
      <div class="container">
        <h1 class="page-hero__title">Your Care Bag</h1>
        <p class="page-hero__subtitle">Review your items, apply promotional codes, and enjoy complimentary shipping.</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <!-- Free Shipping Progress Indicator -->
        <div style="background:var(--color-bg-mint);border:1px solid rgba(1,188,159,0.25);border-radius:var(--radius-lg);padding:1.25rem 1.75rem;margin-bottom:2.5rem;" data-reveal="fade-up">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.65rem;">
            <span style="font-size:0.9375rem;font-weight:600;color:var(--color-brand-teal);">🎉 You've Unlocked Free Shipping!</span>
            <span style="font-size:0.875rem;font-weight:700;">Orders over &#8377;499</span>
          </div>
          <div style="height:6px;background:rgba(1,188,159,0.15);border-radius:3px;overflow:hidden;">
            <div style="width:100%;height:100%;background:var(--color-brand-teal);"></div>
          </div>
        </div>

        <div style="display:grid;gap:2.5rem;align-items:start;" class="split-grid">
          <!-- Cart Items List -->
          <div>
            <div style="background:#fff;border:1px solid var(--color-border-soft);border-radius:var(--radius-xl);overflow:hidden;">
              <!-- Item 1 -->
              <div style="display:flex;gap:1.25rem;padding:1.5rem;border-bottom:1px solid var(--color-border-soft);align-items:center;">
                <img src="{rel}assets/images/product-period-care.jpg" alt="Ultra-Thin Pads" style="width:5.5rem;height:5.5rem;object-fit:cover;border-radius:var(--radius-md);" />
                <div style="flex:1;">
                  <span style="font-size:0.75rem;font-weight:700;color:var(--color-brand-teal);text-transform:uppercase;">Period Care</span>
                  <h4 style="font-family:var(--font-display);font-size:1.15rem;font-weight:600;"><a href="{rel}product-detail.html" style="text-decoration:none;color:inherit;">Ultra-Thin Organic Cotton Pads</a></h4>
                  <p style="font-size:0.85rem;color:var(--color-text-muted);">Pack of 12 &bull; Regular 280mm</p>
                  <div style="margin-top:0.65rem;display:flex;align-items:center;gap:1rem;">
                    <div class="qty-control" style="transform:scale(0.85);transform-origin:left center;">
                      <button type="button" class="qty-control__btn" data-qty-dec>&minus;</button>
                      <input type="text" class="qty-control__val" value="1" readonly />
                      <button type="button" class="qty-control__btn" data-qty-inc>&#43;</button>
                    </div>
                    <button type="button" style="font-size:0.8rem;color:var(--color-accent-pink);text-decoration:underline;cursor:pointer;">Remove</button>
                  </div>
                </div>
                <div style="text-align:right;">
                  <span style="font-family:var(--font-display);font-size:1.25rem;font-weight:600;">&#8377;299</span>
                </div>
              </div>

              <!-- Item 2 -->
              <div style="display:flex;gap:1.25rem;padding:1.5rem;align-items:center;">
                <img src="{rel}assets/images/product-daily-care.jpg" alt="Foaming Intimate Wash" style="width:5.5rem;height:5.5rem;object-fit:cover;border-radius:var(--radius-md);" />
                <div style="flex:1;">
                  <span style="font-size:0.75rem;font-weight:700;color:var(--color-brand-teal);text-transform:uppercase;">Daily Care</span>
                  <h4 style="font-family:var(--font-display);font-size:1.15rem;font-weight:600;"><a href="{rel}product-detail.html" style="text-decoration:none;color:inherit;">Gentle Foaming Intimate Wash</a></h4>
                  <p style="font-size:0.85rem;color:var(--color-text-muted);">150ml Bottle &bull; pH 3.8</p>
                  <div style="margin-top:0.65rem;display:flex;align-items:center;gap:1rem;">
                    <div class="qty-control" style="transform:scale(0.85);transform-origin:left center;">
                      <button type="button" class="qty-control__btn" data-qty-dec>&minus;</button>
                      <input type="text" class="qty-control__val" value="1" readonly />
                      <button type="button" class="qty-control__btn" data-qty-inc>&#43;</button>
                    </div>
                    <button type="button" style="font-size:0.8rem;color:var(--color-accent-pink);text-decoration:underline;cursor:pointer;">Remove</button>
                  </div>
                </div>
                <div style="text-align:right;">
                  <span style="font-family:var(--font-display);font-size:1.25rem;font-weight:600;">&#8377;349</span>
                </div>
              </div>
            </div>

            <div style="margin-top:1.5rem;display:flex;justify-content:space-between;align-items:center;">
              <a href="{rel}shop.html" class="btn" style="border:1.5px solid var(--color-border);padding:0.6rem 1.4rem;border-radius:var(--radius-pill);color:var(--color-text);font-weight:600;">&larr; Continue Shopping</a>
            </div>
          </div>

          <!-- Order Summary Sidebar -->
          <div>
            <div style="background:var(--color-bg-soft);padding:2rem;border-radius:var(--radius-xl);border:1px solid var(--color-border-soft);">
              <h3 style="font-family:var(--font-display);font-size:1.45rem;font-weight:600;margin-bottom:1.5rem;">Order Summary</h3>
              
              <div style="display:flex;justify-content:space-between;margin-bottom:0.75rem;font-size:0.9375rem;">
                <span style="color:var(--color-text-muted);">Subtotal (2 items)</span>
                <span style="font-weight:600;">&#8377;648</span>
              </div>

              <div style="display:flex;justify-content:space-between;margin-bottom:0.75rem;font-size:0.9375rem;">
                <span style="color:var(--color-text-muted);">Shipping</span>
                <span style="font-weight:600;color:var(--color-brand-teal);">FREE</span>
              </div>

              <div style="display:flex;justify-content:space-between;margin-bottom:1.25rem;font-size:0.9375rem;">
                <span style="color:var(--color-text-muted);">Coupon (PURECARE - 15%)</span>
                <span style="font-weight:600;color:var(--color-accent-pink);">- &#8377;97</span>
              </div>

              <div style="border-top:1px solid var(--color-border-soft);padding-top:1.25rem;margin-top:1.25rem;display:flex;justify-content:space-between;align-items:center;margin-bottom:1.5rem;">
                <span style="font-size:1.1rem;font-weight:700;">Total Amount</span>
                <span style="font-family:var(--font-display);font-size:1.85rem;font-weight:700;color:var(--color-text);">&#8377;551</span>
              </div>

              <!-- Coupon form -->
              <div style="display:flex;gap:0.5rem;margin-bottom:1.5rem;">
                <input type="text" value="PURECARE" placeholder="Promo Code" style="flex:1;padding:0.6rem 0.85rem;border:1.5px solid var(--color-border);border-radius:var(--radius-pill);font-size:0.875rem;" />
                <button type="button" class="btn btn--secondary" style="border:1.5px solid var(--color-brand-teal);color:var(--color-brand-teal);padding:0.6rem 1.1rem;border-radius:var(--radius-pill);font-size:0.8125rem;">Applied</button>
              </div>

              <button type="button" class="btn btn--primary" style="width:100%;padding:0.9rem;font-size:1rem;" onclick="alert('Proceeding to Secure Checkout with Razorpay / UPI / Cards');">Proceed to Checkout</button>

              <div style="margin-top:1.25rem;display:flex;align-items:center;justify-content:center;gap:0.5rem;font-size:0.75rem;color:var(--color-text-muted);">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                256-bit Bank Grade Encrypted Checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
"""
    return header + body + footer


# ========================================================
# 7. FAQ PAGE (faq.html)
# ========================================================
def generate_faq(depth=0):
    rel = "" if depth == 0 else "../"
    header = render_header("Frequently Asked Questions", depth, "contact")
    footer = render_footer(depth)

    body = f"""
  <main id="main-content">
    <div class="page-hero">
      <div class="container">
        <span class="page-hero__eyebrow section__eyebrow">Help &amp; Knowledge Base</span>
        <h1 class="page-hero__title">Frequently Asked Questions</h1>
        <p class="page-hero__subtitle">Find instant answers about our organic pad materials, sizing differences, shipping times, and cycle subscriptions.</p>
      </div>
    </div>

    <section class="section">
      <div class="container" style="max-width:54rem;">
        <!-- Category 1: Products & Safety -->
        <div style="margin-bottom:3rem;" data-reveal="fade-up">
          <h2 style="font-family:var(--font-display);font-size:1.75rem;font-weight:600;margin-bottom:1.25rem;color:var(--color-brand-teal);">Product Materials &amp; Rash Prevention</h2>

          <div class="faq-item is-open">
            <button type="button" class="faq-item__question">
              <span>Why do conventional pads cause itching and rashes?</span>
              <span class="faq-item__icon">&#43;</span>
            </button>
            <div class="faq-item__answer">
              <div class="faq-item__answer-inner">
                Conventional pads use perforated plastic mesh topsheets (often petroleum-based polyethylene) along with artificial fragrance and chlorine bleach. This traps sweat and menstrual blood in a zero-airflow environment, causing friction, heat-rashes, and bacterial imbalances. Way2Care uses 100% GOTS-certified organic cotton which breathes naturally, keeping your vulva dry and calm.
              </div>
            </div>
          </div>

          <div class="faq-item">
            <button type="button" class="faq-item__question">
              <span>Are Way2Care pads chlorine-free and fragrance-free?</span>
              <span class="faq-item__icon">&#43;</span>
            </button>
            <div class="faq-item__answer">
              <div class="faq-item__answer-inner">
                Yes, 100%. We use totally chlorine-free (TCF) oxygen-purified organic cotton without any artificial fragrances, dyes, or phthalates. What touches your skin is pure, natural, and dermatologically approved.
              </div>
            </div>
          </div>

          <div class="faq-item">
            <button type="button" class="faq-item__question">
              <span>What is the difference between Regular and Overnight pads?</span>
              <span class="faq-item__icon">&#43;</span>
            </button>
            <div class="faq-item__answer">
              <div class="faq-item__answer-inner">
                Our Regular pad is 280mm long, designed for daytime moderate flow with flexible wings. Our Overnight pad is 320mm long with a wider contoured rear flare to prevent back leaks while sleeping or lying down.
              </div>
            </div>
          </div>
        </div>

        <!-- Category 2: Shipping & Delivery -->
        <div style="margin-bottom:3rem;" data-reveal="fade-up">
          <h2 style="font-family:var(--font-display);font-size:1.75rem;font-weight:600;margin-bottom:1.25rem;color:var(--color-brand-teal);">Orders, Delivery &amp; Packaging</h2>

          <div class="faq-item">
            <button type="button" class="faq-item__question">
              <span>How discreet is the shipping packaging?</span>
              <span class="faq-item__icon">&#43;</span>
            </button>
            <div class="faq-item__answer">
              <div class="faq-item__answer-inner">
                All Way2Care orders are shipped in unmarked, plain recyclable cardboard boxes or paper envelopes. There is no product imagery or mention of sanitary pads on the exterior label.
              </div>
            </div>
          </div>

          <div class="faq-item">
            <button type="button" class="faq-item__question">
              <span>How long does delivery take?</span>
              <span class="faq-item__icon">&#43;</span>
            </button>
            <div class="faq-item__answer">
              <div class="faq-item__answer-inner">
                Metro cities (Bengaluru, Mumbai, Delhi-NCR, Hyderabad, Chennai) typically receive orders within 2 to 3 business days. Other destinations across India are delivered within 4 to 6 business days. Tracking details are emailed immediately upon dispatch.
              </div>
            </div>
          </div>
        </div>

        <!-- Still have questions? -->
        <div style="background:var(--color-bg-mint);border:1px solid rgba(1,188,159,0.2);border-radius:var(--radius-xl);padding:2.5rem;text-align:center;" data-reveal="fade-up">
          <h3 style="font-family:var(--font-display);font-size:1.75rem;font-weight:500;margin-bottom:0.75rem;">Still Have a Question?</h3>
          <p style="font-size:0.95rem;color:var(--color-text-muted);margin-bottom:1.5rem;">Our customer care team is available to assist you Monday through Saturday.</p>
          <a href="{rel}contact.html" class="btn btn--primary">Contact Our Care Team</a>
        </div>
      </div>
    </section>
  </main>
"""
    return header + body + footer


# ========================================================
# 8. POLICY & LEGAL PAGE (policy.html)
# ========================================================
def generate_policy(depth=0):
    rel = "" if depth == 0 else "../"
    header = render_header("Policies & Terms", depth, "about")
    footer = render_footer(depth)

    body = f"""
  <main id="main-content">
    <div class="page-hero">
      <div class="container">
        <h1 class="page-hero__title">Policies &amp; Terms</h1>
        <p class="page-hero__subtitle">Clear, transparent information regarding privacy, shipping, returns, and terms of service.</p>
      </div>
    </div>

    <section class="section">
      <div class="container" style="max-width:54rem;">
        <div style="background:#fff;border:1px solid var(--color-border-soft);border-radius:var(--radius-xl);padding:clamp(2rem,5vw,3.5rem);" class="legal-content">
          <div id="privacy" style="margin-bottom:3rem;">
            <h2 style="font-family:var(--font-display);font-size:2rem;font-weight:600;margin-bottom:1rem;color:var(--color-brand-teal);">1. Privacy Policy</h2>
            <p style="font-size:0.95rem;line-height:1.75;color:var(--color-text-muted);margin-bottom:1rem;">
              At Way2Care Personal Hygiene Pvt. Ltd., your privacy is of utmost importance. We never sell, rent, or trade your personal information to third parties. Information collected during checkout (name, address, telephone number, email) is strictly used to fulfill orders and provide tracking updates.
            </p>
            <p style="font-size:0.95rem;line-height:1.75;color:var(--color-text-muted);">
              All payment transactions are encrypted using TLS 1.3 protocol and processed directly through PCI-DSS Level 1 compliant gateways. We do not store credit card or debit card numbers on our servers.
            </p>
          </div>

          <div id="shipping" style="margin-bottom:3rem;border-top:1px solid var(--color-border-soft);padding-top:2.5rem;">
            <h2 style="font-family:var(--font-display);font-size:2rem;font-weight:600;margin-bottom:1rem;color:var(--color-brand-teal);">2. Shipping &amp; Delivery Policy</h2>
            <p style="font-size:0.95rem;line-height:1.75;color:var(--color-text-muted);margin-bottom:1rem;">
              We offer complimentary delivery across India on all prepaid orders exceeding &#8377;499. Orders below &#8377;499 incur a nominal flat shipping fee of &#8377;49.
            </p>
            <p style="font-size:0.95rem;line-height:1.75;color:var(--color-text-muted);">
              All orders are dispatched within 24 hours of confirmation. You will receive an automated tracking link via SMS and email. Packages are shipped in discreet, 100% recyclable, plain cardboard or paper mailers.
            </p>
          </div>

          <div id="returns" style="margin-bottom:3rem;border-top:1px solid var(--color-border-soft);padding-top:2.5rem;">
            <h2 style="font-family:var(--font-display);font-size:2rem;font-weight:600;margin-bottom:1rem;color:var(--color-brand-teal);">3. Returns &amp; Replacement Policy</h2>
            <p style="font-size:0.95rem;line-height:1.75;color:var(--color-text-muted);margin-bottom:1rem;">
              Due to strict intimate hygiene and sanitary regulations, opened or used packs of sanitary pads or washes cannot be returned.
            </p>
            <p style="font-size:0.95rem;line-height:1.75;color:var(--color-text-muted);">
              However, if your order arrives damaged, defective, or incorrect, please email <a href="mailto:care@way2care.in" style="color:var(--color-accent-pink);">care@way2care.in</a> within 7 days of delivery with photographic evidence, and our team will issue an immediate free replacement or full refund.
            </p>
          </div>

          <div id="terms" style="border-top:1px solid var(--color-border-soft);padding-top:2.5rem;">
            <h2 style="font-family:var(--font-display);font-size:2rem;font-weight:600;margin-bottom:1rem;color:var(--color-brand-teal);">4. Terms of Service</h2>
            <p style="font-size:0.95rem;line-height:1.75;color:var(--color-text-muted);">
              By accessing and using this website, you agree to comply with Indian laws and regulations under the Information Technology Act. Content and visual assets are copyright Way2Care Personal Hygiene Pvt. Ltd. and may not be reproduced without written permission.
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
"""
    return header + body + footer


# ========================================================
# BUILD ALL PAGES
# ========================================================
def build():
    pages = [
        ("index.html", generate_index),
        ("shop.html", generate_shop),
        ("product-detail.html", generate_product_detail),
        ("about.html", generate_about),
        ("contact.html", generate_contact),
        ("cart.html", generate_cart),
        ("faq.html", generate_faq),
        ("policy.html", generate_policy),
    ]

    print("Building Way2Care pages...")
    # 1. Root level
    for filename, gen_fn in pages:
        path = os.path.join(DEST, filename)
        content = gen_fn(depth=0)
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  [Root] Generated {filename} ({len(content)} bytes)")

    # 2. Inside pages/ directory
    for filename, gen_fn in pages:
        path = os.path.join(PAGES_DIR, filename)
        content = gen_fn(depth=1)
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  [Pages] Generated pages/{filename} ({len(content)} bytes)")

    print("\nAll Way2Care website pages successfully built!")

if __name__ == "__main__":
    build()
