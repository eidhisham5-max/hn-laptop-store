# Micro-Patterns for NeuroBehavioral Design

## 1. Perceptual Layer Patterns

### Pattern A: Price-First Card
**Objective**: Make price and value immediately visible to reduce cognitive load
**Implementation**:
```html
<div class="product-card">
  <div class="price-badge">$1,299</div>
  <div class="discount-chip">-20%</div>
  <img src="laptop.jpg" alt="Gaming Laptop">
  <h3>ASUS ROG Strix</h3>
  <div class="rating">★★★★☆ (4.2)</div>
  <button class="cta-button">Add to Cart</button>
</div>
```

**CSS**:
```css
.product-card {
  position: relative;
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.price-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: #0B6DF3;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 1.125rem;
}

.discount-chip {
  position: absolute;
  top: 12px;
  right: 12px;
  background: #FFC107;
  color: #000;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}
```

**KPI**: Time-to-first-CTA reduced by 25%
**Measurement**: Track `time_to_first_cta` event

### Pattern B: Trust Strip
**Objective**: Build immediate credibility through social proof
**Implementation**:
```html
<div class="trust-strip">
  <div class="trust-item">
    <span class="icon">⭐</span>
    <span>4.9/5 Rating</span>
  </div>
  <div class="trust-item">
    <span class="icon">🔄</span>
    <span>30 Day Return</span>
  </div>
  <div class="trust-item">
    <span class="icon">🚚</span>
    <span>Free Delivery</span>
  </div>
</div>
```

**CSS**:
```css
.trust-strip {
  display: flex;
  justify-content: space-around;
  padding: 12px 0;
  border-bottom: 1px solid #E2E8F0;
  margin-bottom: 16px;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.875rem;
  color: #374151;
}

.trust-item .icon {
  font-size: 1rem;
}
```

**KPI**: Trust score composite +10%
**Measurement**: NPS, return rate, average review score

## 2. Cognitive Layer Patterns

### Pattern A: Collapsible Specs
**Objective**: Reduce cognitive overload through progressive disclosure
**Implementation**:
```html
<div class="specs-section">
  <h4>Specifications</h4>
  <div class="specs-list">
    <div class="spec-item">Intel Core i7-12700H</div>
    <div class="spec-item">16GB DDR4 RAM</div>
    <div class="spec-item">512GB SSD Storage</div>
  </div>
  <button class="expand-button" aria-expanded="false" aria-controls="full-specs">
    View Full Specifications
  </button>
  <div id="full-specs" class="full-specs" hidden>
    <div class="spec-item">NVIDIA RTX 3070</div>
    <div class="spec-item">15.6" 144Hz Display</div>
    <div class="spec-item">Windows 11 Pro</div>
  </div>
</div>
```

**CSS**:
```css
.specs-section {
  margin: 16px 0;
}

.specs-list {
  margin: 8px 0;
}

.spec-item {
  padding: 4px 0;
  font-size: 0.875rem;
  color: #374151;
}

.expand-button {
  background: none;
  border: none;
  color: #0B6DF3;
  font-size: 0.875rem;
  cursor: pointer;
  text-decoration: underline;
}

.full-specs {
  margin-top: 8px;
}
```

**KPI**: Task success rate ≥ 90%
**Measurement**: Usability testing for spec finding task

### Pattern B: Progressive Add-to-Cart
**Objective**: Simplify complex product configuration
**Implementation**:
```html
<div class="config-modal">
  <h3>Configure Your Laptop</h3>
  <div class="config-step">
    <h4>Choose Color</h4>
    <div class="color-options">
      <button class="color-option active" data-color="black">Black</button>
      <button class="color-option" data-color="silver">Silver</button>
    </div>
  </div>
  <div class="config-step">
    <h4>Choose RAM</h4>
    <div class="ram-options">
      <button class="ram-option" data-ram="8">8GB (+$0)</button>
      <button class="ram-option active" data-ram="16">16GB (+$200)</button>
      <button class="ram-option" data-ram="32">32GB (+$500)</button>
    </div>
  </div>
  <div class="config-summary">
    <div class="total-price">$1,499</div>
    <button class="add-to-cart">Add to Cart</button>
  </div>
</div>
```

**CSS**:
```css
.config-modal {
  background: white;
  border-radius: 8px;
  padding: 24px;
  max-width: 400px;
}

.config-step {
  margin: 16px 0;
}

.color-options, .ram-options {
  display: flex;
  gap: 8px;
  margin: 8px 0;
}

.color-option, .ram-option {
  padding: 8px 16px;
  border: 2px solid #E2E8F0;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  transition: all 200ms;
}

.color-option.active, .ram-option.active {
  border-color: #0B6DF3;
  background: #EFF6FF;
}

.config-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #E2E8F0;
}

.total-price {
  font-size: 1.25rem;
  font-weight: 600;
  color: #0F1724;
}
```

**KPI**: Configuration completion rate ≥ 85%
**Measurement**: Track step completion and abandonment

## 3. Affective Layer Patterns

### Pattern A: Testimonial Carousel
**Objective**: Build emotional connection through social proof
**Implementation**:
```html
<div class="testimonial-carousel">
  <div class="testimonial active">
    <div class="testimonial-content">
      "Amazing laptop! Perfect for my gaming needs. Delivery was super fast."
    </div>
    <div class="testimonial-author">
      <img src="user1.jpg" alt="Ahmed" class="author-photo">
      <div class="author-info">
        <div class="author-name">Ahmed Hassan</div>
        <div class="author-location">Cairo, Egypt</div>
        <div class="author-rating">★★★★★</div>
      </div>
    </div>
  </div>
  <div class="carousel-controls">
    <button class="prev-btn">‹</button>
    <button class="next-btn">›</button>
  </div>
</div>
```

**CSS**:
```css
.testimonial-carousel {
  position: relative;
  background: #F8FAFC;
  border-radius: 8px;
  padding: 24px;
  margin: 16px 0;
}

.testimonial-content {
  font-size: 1.125rem;
  font-style: italic;
  color: #374151;
  margin-bottom: 16px;
  line-height: 1.6;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author-photo {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.author-name {
  font-weight: 600;
  color: #0F1724;
}

.author-location {
  font-size: 0.875rem;
  color: #64748B;
}

.author-rating {
  color: #FFC107;
  font-size: 1rem;
}

.carousel-controls {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  gap: 8px;
}

.prev-btn, .next-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

**KPI**: Trust score composite +10%
**Measurement**: NPS, return rate, average review score

### Pattern B: Warranty Badge
**Objective**: Reduce purchase anxiety through guarantee messaging
**Implementation**:
```html
<div class="warranty-badge">
  <div class="warranty-icon">✓</div>
  <div class="warranty-text">
    <div class="warranty-title">14-Day Replacement Guarantee</div>
    <div class="warranty-subtitle">No questions asked</div>
  </div>
</div>
```

**CSS**:
```css
.warranty-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #F0FDF4;
  border: 1px solid #20C997;
  border-radius: 6px;
  padding: 8px 12px;
  margin: 8px 0;
}

.warranty-icon {
  width: 20px;
  height: 20px;
  background: #20C997;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
}

.warranty-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #15803D;
}

.warranty-subtitle {
  font-size: 0.75rem;
  color: #16A34A;
}
```

**KPI**: Purchase confidence +15%
**Measurement**: Survey question "How confident are you in this purchase?"

## 4. Behavioral Layer Patterns

### Pattern A: Persistent Checkout CTA
**Objective**: Maintain purchase momentum with always-visible checkout option
**Implementation**:
```html
<div class="persistent-checkout">
  <div class="checkout-info">
    <div class="cart-count">3 items</div>
    <div class="cart-total">$3,897</div>
  </div>
  <button class="checkout-cta">Proceed to Checkout</button>
</div>
```

**CSS**:
```css
.persistent-checkout {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #E2E8F0;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 -2px 8px rgba(0,0,0,0.1);
  z-index: 1000;
}

.checkout-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.cart-count {
  font-size: 0.875rem;
  color: #64748B;
}

.cart-total {
  font-size: 1.125rem;
  font-weight: 600;
  color: #0F1724;
}

.checkout-cta {
  background: #0B6DF3;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  font-weight: 600;
  cursor: pointer;
  transition: background 200ms;
}

.checkout-cta:hover {
  background: #054FB3;
}
```

**KPI**: Checkout conversion rate +20%
**Measurement**: Track cart-to-checkout conversion

### Pattern B: Quick-Add Overlay
**Objective**: Enable rapid product addition without leaving listing
**Implementation**:
```html
<div class="product-card">
  <img src="laptop.jpg" alt="Gaming Laptop">
  <h3>ASUS ROG Strix</h3>
  <div class="price">$1,299</div>
  <div class="quick-add-overlay">
    <div class="quantity-selector">
      <button class="qty-btn minus">-</button>
      <span class="qty-value">1</span>
      <button class="qty-btn plus">+</button>
    </div>
    <button class="quick-add-btn">Add to Cart</button>
  </div>
</div>
```

**CSS**:
```css
.product-card {
  position: relative;
  background: white;
  border-radius: 8px;
  padding: 16px;
  transition: all 200ms;
}

.product-card:hover .quick-add-overlay {
  opacity: 1;
  visibility: visible;
}

.quick-add-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  opacity: 0;
  visibility: hidden;
  transition: all 200ms;
  border-radius: 8px;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 8px;
  background: white;
  border-radius: 6px;
  padding: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.qty-btn {
  width: 24px;
  height: 24px;
  border: none;
  background: #F1F5F9;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.qty-value {
  min-width: 20px;
  text-align: center;
  font-weight: 600;
}

.quick-add-btn {
  background: #0B6DF3;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-weight: 600;
  cursor: pointer;
}
```

**KPI**: Add-to-cart rate +30%
**Measurement**: Track quick-add vs regular add-to-cart

## 5. Ethical Layer Patterns

### Pattern A: Personalization Toggle
**Objective**: Provide transparent control over personalization
**Implementation**:
```html
<div class="personalization-control">
  <div class="control-header">
    <h4>Personalized Recommendations</h4>
    <button class="why-link" data-tooltip="We show recommendations based on your browsing history and preferences">Why?</button>
  </div>
  <div class="control-toggle">
    <label class="toggle-switch">
      <input type="checkbox" id="personalization" checked>
      <span class="slider"></span>
    </label>
    <span class="toggle-label">Enable personalized content</span>
  </div>
  <div class="explanation" id="personalization-explanation">
    <p>We use your browsing history and preferences to show you relevant products. You can change this anytime in your settings.</p>
  </div>
</div>
```

**CSS**:
```css
.personalization-control {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
}

.control-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.why-link {
  background: none;
  border: none;
  color: #0B6DF3;
  text-decoration: underline;
  cursor: pointer;
  font-size: 0.875rem;
}

.control-toggle {
  display: flex;
  align-items: center;
  gap: 12px;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #D1D5DB;
  transition: 200ms;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 200ms;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #0B6DF3;
}

input:checked + .slider:before {
  transform: translateX(20px);
}

.toggle-label {
  font-size: 0.875rem;
  color: #374151;
}

.explanation {
  margin-top: 12px;
  padding: 12px;
  background: white;
  border-radius: 6px;
  font-size: 0.875rem;
  color: #64748B;
  display: none;
}

.explanation.show {
  display: block;
}
```

**KPI**: Consent rate for personalization ≥ 20%
**Measurement**: Track toggle usage and consent rates

### Pattern B: Fee Transparency Bar
**Objective**: Build trust through transparent pricing
**Implementation**:
```html
<div class="fee-transparency">
  <h4>Price Breakdown</h4>
  <div class="fee-item">
    <span class="fee-label">Product Price</span>
    <span class="fee-value">$1,299.00</span>
  </div>
  <div class="fee-item">
    <span class="fee-label">Shipping</span>
    <span class="fee-value">Free</span>
  </div>
  <div class="fee-item">
    <span class="fee-label">Tax (14%)</span>
    <span class="fee-value">$181.86</span>
  </div>
  <div class="fee-item total">
    <span class="fee-label">Total</span>
    <span class="fee-value">$1,480.86</span>
  </div>
  <div class="fee-note">
    <span class="info-icon">ℹ️</span>
    <span>All prices include applicable taxes. No hidden fees.</span>
  </div>
</div>
```

**CSS**:
```css
.fee-transparency {
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
}

.fee-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #E2E8F0;
}

.fee-item.total {
  border-bottom: none;
  border-top: 2px solid #0F1724;
  margin-top: 8px;
  padding-top: 12px;
  font-weight: 600;
}

.fee-label {
  font-size: 0.875rem;
  color: #374151;
}

.fee-value {
  font-size: 0.875rem;
  color: #0F1724;
  font-weight: 500;
}

.fee-note {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  padding: 8px;
  background: #EFF6FF;
  border-radius: 6px;
  font-size: 0.75rem;
  color: #1E40AF;
}

.info-icon {
  font-size: 1rem;
}
```

**KPI**: Trust score composite +10%
**Measurement**: Survey question "How transparent do you find our pricing?"

## 6. Implementation Guidelines

### JavaScript Integration
```javascript
// Example: Personalization toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('personalization');
  const explanation = document.getElementById('personalization-explanation');
  const whyLink = document.querySelector('.why-link');
  
  whyLink.addEventListener('click', function() {
    explanation.classList.toggle('show');
  });
  
  toggle.addEventListener('change', function() {
    // Track consent decision
    analytics.track('personalization_consent', {
      enabled: this.checked,
      timestamp: new Date().toISOString()
    });
  });
});
```

### Accessibility Considerations
- All interactive elements have proper ARIA labels
- Focus states are clearly visible
- Color contrast meets WCAG AA standards
- Keyboard navigation is fully supported
- Screen reader announcements for dynamic content

### Performance Optimization
- CSS animations use transform and opacity for smooth performance
- Images are optimized and lazy-loaded
- JavaScript is minimal and event-driven
- Components are modular and reusable
