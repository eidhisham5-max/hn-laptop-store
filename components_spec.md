# Component Specifications

## 1. Button Component

### HTML Structure
```html
<button class="btn btn--primary btn--md" type="button" aria-label="Add to Cart">
  <span class="btn__content">Add to Cart</span>
  <span class="btn__icon" aria-hidden="true">+</span>
</button>
```

### CSS Classes (Tailwind Mapping)
```css
.btn {
  @apply inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn--sm {
  @apply px-3 py-2 text-sm h-8;
}

.btn--md {
  @apply px-4 py-2 text-base h-10;
}

.btn--lg {
  @apply px-6 py-3 text-lg h-12;
}

.btn--primary {
  @apply bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500;
}

.btn--secondary {
  @apply bg-neutral-100 text-neutral-900 hover:bg-neutral-200 focus:ring-neutral-500;
}

.btn--ghost {
  @apply bg-transparent text-primary-500 hover:bg-primary-50 focus:ring-primary-500;
}

.btn--outline {
  @apply border border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-primary-500;
}
```

### ARIA Roles
- `button` (default)
- `aria-label` for screen readers
- `aria-pressed` for toggle buttons
- `aria-expanded` for dropdown buttons

### Focus States
- 2px ring with primary color
- 2px offset from element
- Visible on keyboard navigation
- High contrast for accessibility

### RTL Rules
- Icon positioning adjusts with `dir="rtl"`
- Text alignment follows language direction
- Hover states maintain consistency

### Examples
```html
<!-- Primary CTA -->
<button class="btn btn--primary btn--lg">Add to Cart</button>

<!-- Secondary Action -->
<button class="btn btn--secondary btn--md">View Details</button>

<!-- Ghost Button -->
<button class="btn btn--ghost btn--sm">Cancel</button>

<!-- Outline Button -->
<button class="btn btn--outline btn--md">Compare</button>
```

## 2. Input Component

### HTML Structure
```html
<div class="input-group">
  <label for="email" class="input-label">Email Address</label>
  <div class="input-wrapper">
    <input 
      type="email" 
      id="email" 
      class="input" 
      placeholder="Enter your email"
      aria-describedby="email-error"
      required
    />
    <span class="input-icon" aria-hidden="true">@</span>
  </div>
  <div id="email-error" class="input-error" role="alert"></div>
</div>
```

### CSS Classes (Tailwind Mapping)
```css
.input-group {
  @apply space-y-2;
}

.input-label {
  @apply block text-sm font-medium text-neutral-700;
}

.input-wrapper {
  @apply relative;
}

.input {
  @apply w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-neutral-50 disabled:text-neutral-500;
}

.input--error {
  @apply border-error-500 focus:ring-error-500 focus:border-error-500;
}

.input--success {
  @apply border-success-500 focus:ring-success-500 focus:border-success-500;
}

.input-icon {
  @apply absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400;
}

.input-error {
  @apply text-sm text-error-500;
}

.input-help {
  @apply text-sm text-neutral-500;
}
```

### ARIA Roles
- `textbox` for text inputs
- `combobox` for select inputs
- `alert` for error messages
- `aria-describedby` linking to help text

### Focus States
- 2px ring with primary color
- Border color changes on focus
- Error states use error color
- Success states use success color

### RTL Rules
- Icon positioning adjusts with `dir="rtl"`
- Placeholder text alignment follows language
- Error messages align correctly

### Examples
```html
<!-- Text Input -->
<div class="input-group">
  <label for="name" class="input-label">Full Name</label>
  <input type="text" id="name" class="input" placeholder="Enter your name" />
</div>

<!-- Email Input with Icon -->
<div class="input-group">
  <label for="email" class="input-label">Email</label>
  <div class="input-wrapper">
    <input type="email" id="email" class="input" placeholder="Enter email" />
    <span class="input-icon">@</span>
  </div>
</div>

<!-- Input with Error -->
<div class="input-group">
  <label for="phone" class="input-label">Phone</label>
  <input type="tel" id="phone" class="input input--error" placeholder="Enter phone" />
  <div class="input-error">Invalid phone number</div>
</div>
```

## 3. Product Card Component

### HTML Structure
```html
<article class="product-card" data-product-id="123">
  <div class="product-card__image">
    <img src="laptop.jpg" alt="ASUS ROG Strix Gaming Laptop" />
    <div class="product-card__badges">
      <span class="badge badge--discount">-20%</span>
      <span class="badge badge--new">New</span>
    </div>
  </div>
  <div class="product-card__content">
    <h3 class="product-card__title">ASUS ROG Strix</h3>
    <div class="product-card__rating">
      <span class="stars">★★★★☆</span>
      <span class="rating-text">(4.2)</span>
    </div>
    <div class="product-card__price">
      <span class="price-current">$1,299</span>
      <span class="price-original">$1,599</span>
    </div>
    <div class="product-card__actions">
      <button class="btn btn--primary btn--sm">Add to Cart</button>
      <button class="btn btn--ghost btn--sm">View Details</button>
    </div>
  </div>
</article>
```

### CSS Classes (Tailwind Mapping)
```css
.product-card {
  @apply bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-1;
}

.product-card__image {
  @apply relative aspect-square overflow-hidden;
}

.product-card__image img {
  @apply w-full h-full object-cover;
}

.product-card__badges {
  @apply absolute top-2 left-2 flex flex-col gap-1;
}

.product-card__content {
  @apply p-4 space-y-3;
}

.product-card__title {
  @apply text-lg font-semibold text-neutral-900 line-clamp-2;
}

.product-card__rating {
  @apply flex items-center gap-1;
}

.stars {
  @apply text-warning-500 text-sm;
}

.rating-text {
  @apply text-sm text-neutral-500;
}

.product-card__price {
  @apply flex items-center gap-2;
}

.price-current {
  @apply text-xl font-bold text-primary-500;
}

.price-original {
  @apply text-sm text-neutral-400 line-through;
}

.product-card__actions {
  @apply flex gap-2;
}
```

### ARIA Roles
- `article` for product card
- `img` with descriptive alt text
- `button` for interactive elements
- `aria-label` for action buttons

### Focus States
- Card receives focus on tab navigation
- Action buttons have individual focus states
- Keyboard navigation supported

### RTL Rules
- Badge positioning adjusts with `dir="rtl"`
- Price alignment follows language direction
- Action buttons flow correctly

### Examples
```html
<!-- Basic Product Card -->
<article class="product-card">
  <div class="product-card__image">
    <img src="laptop.jpg" alt="Gaming Laptop" />
  </div>
  <div class="product-card__content">
    <h3 class="product-card__title">Gaming Laptop</h3>
    <div class="product-card__price">
      <span class="price-current">$999</span>
    </div>
    <button class="btn btn--primary btn--sm">Add to Cart</button>
  </div>
</article>

<!-- Product Card with Badges -->
<article class="product-card">
  <div class="product-card__image">
    <img src="laptop.jpg" alt="Premium Laptop" />
    <div class="product-card__badges">
      <span class="badge badge--discount">-15%</span>
    </div>
  </div>
  <div class="product-card__content">
    <h3 class="product-card__title">Premium Laptop</h3>
    <div class="product-card__rating">
      <span class="stars">★★★★★</span>
      <span class="rating-text">(4.8)</span>
    </div>
    <div class="product-card__price">
      <span class="price-current">$1,499</span>
      <span class="price-original">$1,799</span>
    </div>
  </div>
</article>
```

## 4. Header Component

### HTML Structure
```html
<header class="header" role="banner">
  <div class="header__container">
    <div class="header__logo">
      <a href="/" class="logo">
        <img src="logo.svg" alt="H.N Laptop Store" />
        <span class="logo__text">H.N Store</span>
      </a>
    </div>
    
    <nav class="header__nav" aria-label="Main navigation">
      <ul class="nav-list">
        <li class="nav-item">
          <a href="/" class="nav-link">Home</a>
        </li>
        <li class="nav-item">
          <a href="/products" class="nav-link">Products</a>
        </li>
        <li class="nav-item">
          <a href="/brands" class="nav-link">Brands</a>
        </li>
      </ul>
    </nav>
    
    <div class="header__actions">
      <button class="header__search" aria-label="Search">
        <span class="icon-search"></span>
      </button>
      <a href="/cart" class="header__cart" aria-label="Shopping cart">
        <span class="icon-cart"></span>
        <span class="cart-badge">3</span>
      </a>
      <div class="header__language">
        <button class="language-switcher" aria-label="Change language">
          <span class="flag">🇺🇸</span>
          <span class="language-text">EN</span>
        </button>
      </div>
    </div>
  </div>
</header>
```

### CSS Classes (Tailwind Mapping)
```css
.header {
  @apply sticky top-0 z-50 bg-white border-b border-neutral-200 shadow-sm;
}

.header__container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

.header__logo {
  @apply flex-shrink-0;
}

.logo {
  @apply flex items-center gap-2;
}

.logo__text {
  @apply text-xl font-bold text-primary-500;
}

.header__nav {
  @apply hidden md:flex md:space-x-8;
}

.nav-list {
  @apply flex space-x-8;
}

.nav-item {
  @apply relative;
}

.nav-link {
  @apply text-neutral-700 hover:text-primary-500 px-3 py-2 text-sm font-medium transition-colors;
}

.header__actions {
  @apply flex items-center space-x-4;
}

.header__search {
  @apply p-2 text-neutral-400 hover:text-neutral-500;
}

.header__cart {
  @apply relative p-2 text-neutral-400 hover:text-neutral-500;
}

.cart-badge {
  @apply absolute -top-1 -right-1 h-5 w-5 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center;
}

.language-switcher {
  @apply flex items-center gap-1 p-2 text-neutral-700 hover:text-primary-500;
}
```

### ARIA Roles
- `banner` for header
- `navigation` for nav
- `button` for interactive elements
- `aria-label` for screen readers

### Focus States
- All interactive elements have focus indicators
- Keyboard navigation supported
- Skip links for accessibility

### RTL Rules
- Logo positioning adjusts
- Navigation flow follows language direction
- Language switcher adapts

### Examples
```html
<!-- Mobile Header -->
<header class="header">
  <div class="header__container">
    <div class="header__logo">
      <a href="/" class="logo">
        <img src="logo.svg" alt="H.N Store" />
      </a>
    </div>
    <button class="header__menu" aria-label="Open menu">
      <span class="icon-menu"></span>
    </button>
  </div>
</header>

<!-- Desktop Header -->
<header class="header">
  <div class="header__container">
    <div class="header__logo">
      <a href="/" class="logo">
        <img src="logo.svg" alt="H.N Store" />
        <span class="logo__text">H.N Store</span>
      </a>
    </div>
    <nav class="header__nav">
      <ul class="nav-list">
        <li class="nav-item">
          <a href="/" class="nav-link">Home</a>
        </li>
        <li class="nav-item">
          <a href="/products" class="nav-link">Products</a>
        </li>
      </ul>
    </nav>
    <div class="header__actions">
      <button class="header__search">Search</button>
      <a href="/cart" class="header__cart">Cart</a>
    </div>
  </div>
</header>
```

## 5. Modal Component

### HTML Structure
```html
<div class="modal" role="dialog" aria-labelledby="modal-title" aria-modal="true">
  <div class="modal__backdrop"></div>
  <div class="modal__container">
    <div class="modal__content">
      <div class="modal__header">
        <h2 id="modal-title" class="modal__title">Product Details</h2>
        <button class="modal__close" aria-label="Close modal">
          <span class="icon-close"></span>
        </button>
      </div>
      <div class="modal__body">
        <p>Modal content goes here...</p>
      </div>
      <div class="modal__footer">
        <button class="btn btn--secondary">Cancel</button>
        <button class="btn btn--primary">Confirm</button>
      </div>
    </div>
  </div>
</div>
```

### CSS Classes (Tailwind Mapping)
```css
.modal {
  @apply fixed inset-0 z-50 flex items-center justify-center p-4;
}

.modal__backdrop {
  @apply absolute inset-0 bg-black bg-opacity-50;
}

.modal__container {
  @apply relative bg-white rounded-lg shadow-xl max-w-md w-full;
}

.modal__content {
  @apply p-6;
}

.modal__header {
  @apply flex items-center justify-between mb-4;
}

.modal__title {
  @apply text-lg font-semibold text-neutral-900;
}

.modal__close {
  @apply p-2 text-neutral-400 hover:text-neutral-500;
}

.modal__body {
  @apply mb-6;
}

.modal__footer {
  @apply flex justify-end space-x-3;
}
```

### ARIA Roles
- `dialog` for modal
- `aria-labelledby` linking to title
- `aria-modal="true"` for screen readers
- `aria-label` for close button

### Focus States
- Focus trapped within modal
- Close button receives focus on open
- Escape key closes modal
- Tab navigation cycles through elements

### RTL Rules
- Modal positioning adjusts
- Close button positioning follows language
- Content alignment adapts

### Examples
```html
<!-- Basic Modal -->
<div class="modal">
  <div class="modal__backdrop"></div>
  <div class="modal__container">
    <div class="modal__content">
      <div class="modal__header">
        <h2 class="modal__title">Confirm Action</h2>
        <button class="modal__close">×</button>
      </div>
      <div class="modal__body">
        <p>Are you sure you want to continue?</p>
      </div>
      <div class="modal__footer">
        <button class="btn btn--secondary">Cancel</button>
        <button class="btn btn--primary">Confirm</button>
      </div>
    </div>
  </div>
</div>

<!-- Fullscreen Modal -->
<div class="modal modal--fullscreen">
  <div class="modal__backdrop"></div>
  <div class="modal__container modal__container--fullscreen">
    <div class="modal__content">
      <div class="modal__header">
        <h2 class="modal__title">Product Configuration</h2>
        <button class="modal__close">×</button>
      </div>
      <div class="modal__body">
        <!-- Full content here -->
      </div>
    </div>
  </div>
</div>
```

## 6. Toast Component

### HTML Structure
```html
<div class="toast toast--success" role="alert" aria-live="polite">
  <div class="toast__icon">
    <span class="icon-check"></span>
  </div>
  <div class="toast__content">
    <div class="toast__title">Success!</div>
    <div class="toast__message">Product added to cart</div>
  </div>
  <button class="toast__close" aria-label="Close notification">
    <span class="icon-close"></span>
  </button>
</div>
```

### CSS Classes (Tailwind Mapping)
```css
.toast {
  @apply fixed top-4 right-4 z-50 max-w-sm w-full bg-white rounded-lg shadow-lg border-l-4 p-4 flex items-start space-x-3;
}

.toast--success {
  @apply border-l-success-500;
}

.toast--error {
  @apply border-l-error-500;
}

.toast--warning {
  @apply border-l-warning-500;
}

.toast--info {
  @apply border-l-primary-500;
}

.toast__icon {
  @apply flex-shrink-0;
}

.toast__content {
  @apply flex-1;
}

.toast__title {
  @apply text-sm font-semibold text-neutral-900;
}

.toast__message {
  @apply text-sm text-neutral-600 mt-1;
}

.toast__close {
  @apply flex-shrink-0 p-1 text-neutral-400 hover:text-neutral-500;
}
```

### ARIA Roles
- `alert` for toast
- `aria-live="polite"` for screen readers
- `aria-label` for close button

### Focus States
- Toast appears without stealing focus
- Close button focusable
- Auto-dismiss after timeout

### RTL Rules
- Toast positioning adjusts
- Icon and close button positioning adapts
- Content alignment follows language

### Examples
```html
<!-- Success Toast -->
<div class="toast toast--success">
  <div class="toast__icon">
    <span class="icon-check"></span>
  </div>
  <div class="toast__content">
    <div class="toast__title">Success!</div>
    <div class="toast__message">Product added to cart</div>
  </div>
  <button class="toast__close">×</button>
</div>

<!-- Error Toast -->
<div class="toast toast--error">
  <div class="toast__icon">
    <span class="icon-error"></span>
  </div>
  <div class="toast__content">
    <div class="toast__title">Error</div>
    <div class="toast__message">Failed to add product</div>
  </div>
  <button class="toast__close">×</button>
</div>
```

## 7. Skeleton Component

### HTML Structure
```html
<div class="skeleton" aria-label="Loading content">
  <div class="skeleton__header">
    <div class="skeleton__avatar"></div>
    <div class="skeleton__text skeleton__text--title"></div>
  </div>
  <div class="skeleton__body">
    <div class="skeleton__text"></div>
    <div class="skeleton__text"></div>
    <div class="skeleton__text skeleton__text--short"></div>
  </div>
</div>
```

### CSS Classes (Tailwind Mapping)
```css
.skeleton {
  @apply animate-pulse;
}

.skeleton__header {
  @apply flex items-center space-x-3 mb-4;
}

.skeleton__avatar {
  @apply w-10 h-10 bg-neutral-200 rounded-full;
}

.skeleton__text {
  @apply h-4 bg-neutral-200 rounded;
}

.skeleton__text--title {
  @apply h-6 w-3/4;
}

.skeleton__text--short {
  @apply w-1/2;
}

.skeleton__button {
  @apply h-10 bg-neutral-200 rounded w-24;
}

.skeleton__image {
  @apply w-full h-48 bg-neutral-200 rounded;
}
```

### ARIA Roles
- `aria-label` for loading state
- `aria-live="polite"` for screen readers
- No interactive elements during loading

### Focus States
- No focus during skeleton state
- Content appears when loaded
- Smooth transition to real content

### RTL Rules
- Skeleton layout adapts to language direction
- Avatar and text positioning adjusts
- Animation direction follows language

### Examples
```html
<!-- Product Card Skeleton -->
<div class="skeleton">
  <div class="skeleton__image"></div>
  <div class="skeleton__body">
    <div class="skeleton__text skeleton__text--title"></div>
    <div class="skeleton__text"></div>
    <div class="skeleton__text skeleton__text--short"></div>
    <div class="skeleton__button"></div>
  </div>
</div>

<!-- List Skeleton -->
<div class="skeleton">
  <div class="skeleton__header">
    <div class="skeleton__avatar"></div>
    <div class="skeleton__text skeleton__text--title"></div>
  </div>
  <div class="skeleton__body">
    <div class="skeleton__text"></div>
    <div class="skeleton__text"></div>
  </div>
</div>
```

## 8. Language Switcher Component

### HTML Structure
```html
<div class="language-switcher">
  <button class="language-switcher__button" aria-expanded="false" aria-haspopup="true">
    <span class="language-switcher__flag">🇺🇸</span>
    <span class="language-switcher__text">English</span>
    <span class="language-switcher__arrow">▼</span>
  </button>
  <div class="language-switcher__dropdown" role="menu">
    <button class="language-switcher__option" role="menuitem" data-lang="en">
      <span class="language-switcher__flag">🇺🇸</span>
      <span class="language-switcher__text">English</span>
    </button>
    <button class="language-switcher__option" role="menuitem" data-lang="ar">
      <span class="language-switcher__flag">🇪🇬</span>
      <span class="language-switcher__text">العربية</span>
    </button>
  </div>
</div>
```

### CSS Classes (Tailwind Mapping)
```css
.language-switcher {
  @apply relative;
}

.language-switcher__button {
  @apply flex items-center space-x-2 px-3 py-2 text-sm font-medium text-neutral-700 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500;
}

.language-switcher__flag {
  @apply text-lg;
}

.language-switcher__text {
  @apply hidden sm:block;
}

.language-switcher__arrow {
  @apply text-xs;
}

.language-switcher__dropdown {
  @apply absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none hidden;
}

.language-switcher__dropdown--open {
  @apply block;
}

.language-switcher__option {
  @apply flex items-center space-x-3 w-full px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:bg-neutral-100;
}

.language-switcher__option--active {
  @apply bg-primary-50 text-primary-700;
}
```

### ARIA Roles
- `button` for switcher
- `menu` for dropdown
- `menuitem` for options
- `aria-expanded` for state
- `aria-haspopup` for dropdown

### Focus States
- Button receives focus on tab
- Dropdown opens on click/enter
- Arrow keys navigate options
- Escape closes dropdown

### RTL Rules
- Dropdown positioning adjusts
- Flag and text alignment adapts
- Arrow direction changes
- Language names follow native script

### Examples
```html
<!-- Basic Language Switcher -->
<div class="language-switcher">
  <button class="language-switcher__button">
    <span class="language-switcher__flag">🇺🇸</span>
    <span class="language-switcher__text">English</span>
  </button>
</div>

<!-- Full Language Switcher -->
<div class="language-switcher">
  <button class="language-switcher__button" aria-expanded="false">
    <span class="language-switcher__flag">🇺🇸</span>
    <span class="language-switcher__text">English</span>
    <span class="language-switcher__arrow">▼</span>
  </button>
  <div class="language-switcher__dropdown">
    <button class="language-switcher__option" data-lang="en">
      <span class="language-switcher__flag">🇺🇸</span>
      <span class="language-switcher__text">English</span>
    </button>
    <button class="language-switcher__option" data-lang="ar">
      <span class="language-switcher__flag">🇪🇬</span>
      <span class="language-switcher__text">العربية</span>
    </button>
  </div>
</div>
```

## 9. Consent Manager Component

### HTML Structure
```html
<div class="consent-manager" role="dialog" aria-labelledby="consent-title" aria-modal="true">
  <div class="consent-manager__backdrop"></div>
  <div class="consent-manager__container">
    <div class="consent-manager__content">
      <div class="consent-manager__header">
        <h2 id="consent-title" class="consent-manager__title">Privacy Preferences</h2>
        <p class="consent-manager__description">Manage your privacy settings</p>
      </div>
      <div class="consent-manager__body">
        <div class="consent-manager__section">
          <div class="consent-manager__toggle">
            <label class="toggle-switch">
              <input type="checkbox" id="analytics" checked>
              <span class="toggle-slider"></span>
            </label>
            <div class="consent-manager__info">
              <h3 class="consent-manager__label">Analytics</h3>
              <p class="consent-manager__help">Help us improve our service</p>
            </div>
          </div>
        </div>
        <div class="consent-manager__section">
          <div class="consent-manager__toggle">
            <label class="toggle-switch">
              <input type="checkbox" id="personalization" checked>
              <span class="toggle-slider"></span>
            </label>
            <div class="consent-manager__info">
              <h3 class="consent-manager__label">Personalization</h3>
              <p class="consent-manager__help">Show relevant content and offers</p>
            </div>
          </div>
        </div>
      </div>
      <div class="consent-manager__footer">
        <button class="btn btn--secondary">Reject All</button>
        <button class="btn btn--primary">Save Preferences</button>
      </div>
    </div>
  </div>
</div>
```

### CSS Classes (Tailwind Mapping)
```css
.consent-manager {
  @apply fixed inset-0 z-50 flex items-center justify-center p-4;
}

.consent-manager__backdrop {
  @apply absolute inset-0 bg-black bg-opacity-50;
}

.consent-manager__container {
  @apply relative bg-white rounded-lg shadow-xl max-w-md w-full;
}

.consent-manager__content {
  @apply p-6;
}

.consent-manager__header {
  @apply mb-6;
}

.consent-manager__title {
  @apply text-lg font-semibold text-neutral-900 mb-2;
}

.consent-manager__description {
  @apply text-sm text-neutral-600;
}

.consent-manager__body {
  @apply space-y-4 mb-6;
}

.consent-manager__section {
  @apply border border-neutral-200 rounded-lg p-4;
}

.consent-manager__toggle {
  @apply flex items-start space-x-3;
}

.toggle-switch {
  @apply relative inline-block w-11 h-6;
}

.toggle-switch input {
  @apply opacity-0 w-0 h-0;
}

.toggle-slider {
  @apply absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-neutral-300 rounded-full transition-all duration-200;
}

.toggle-slider:before {
  @apply absolute content-[''] h-5 w-5 left-0.5 bottom-0.5 bg-white rounded-full transition-all duration-200;
}

input:checked + .toggle-slider {
  @apply bg-primary-500;
}

input:checked + .toggle-slider:before {
  @apply transform translate-x-5;
}

.consent-manager__info {
  @apply flex-1;
}

.consent-manager__label {
  @apply text-sm font-medium text-neutral-900 mb-1;
}

.consent-manager__help {
  @apply text-xs text-neutral-500;
}

.consent-manager__footer {
  @apply flex justify-end space-x-3;
}
```

### ARIA Roles
- `dialog` for consent manager
- `aria-labelledby` linking to title
- `aria-modal="true"` for screen readers
- `label` for toggle switches

### Focus States
- Focus trapped within modal
- Toggle switches focusable
- Button focus states clear
- Keyboard navigation supported

### RTL Rules
- Modal positioning adjusts
- Toggle switch direction adapts
- Content alignment follows language
- Button order maintains usability

### Examples
```html
<!-- Basic Consent Manager -->
<div class="consent-manager">
  <div class="consent-manager__backdrop"></div>
  <div class="consent-manager__container">
    <div class="consent-manager__content">
      <div class="consent-manager__header">
        <h2 class="consent-manager__title">Privacy Preferences</h2>
        <p class="consent-manager__description">Manage your privacy settings</p>
      </div>
      <div class="consent-manager__body">
        <div class="consent-manager__section">
          <div class="consent-manager__toggle">
            <label class="toggle-switch">
              <input type="checkbox" id="analytics" checked>
              <span class="toggle-slider"></span>
            </label>
            <div class="consent-manager__info">
              <h3 class="consent-manager__label">Analytics</h3>
              <p class="consent-manager__help">Help us improve our service</p>
            </div>
          </div>
        </div>
      </div>
      <div class="consent-manager__footer">
        <button class="btn btn--secondary">Reject All</button>
        <button class="btn btn--primary">Save Preferences</button>
      </div>
    </div>
  </div>
</div>
```

## 10. Implementation Guidelines

### Accessibility Checklist
- [ ] All interactive elements have proper ARIA roles
- [ ] Focus states are clearly visible
- [ ] Color contrast meets WCAG AA standards
- [ ] Keyboard navigation is fully supported
- [ ] Screen reader announcements are appropriate
- [ ] Form labels are properly associated
- [ ] Error messages are announced to screen readers

### RTL Implementation
- [ ] Layout adjusts for right-to-left languages
- [ ] Icons and images are mirrored appropriately
- [ ] Text alignment follows language direction
- [ ] Navigation flow adapts to language
- [ ] Form layouts adjust for RTL

### Performance Considerations
- [ ] CSS animations use transform and opacity
- [ ] Images are optimized and lazy-loaded
- [ ] JavaScript is minimal and event-driven
- [ ] Components are modular and reusable
- [ ] Bundle size is optimized

### Testing Requirements
- [ ] Cross-browser compatibility
- [ ] Mobile responsiveness
- [ ] Accessibility testing with screen readers
- [ ] Keyboard navigation testing
- [ ] RTL language testing
- [ ] Performance testing
